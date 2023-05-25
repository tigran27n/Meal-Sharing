const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const knex = require("knex");

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Database connection
const db = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
});

// Define routes
const mealsRouter = require("./api/meals");
const reservationsRouter = require("./api/reservations");

router.use("/meals", mealsRouter);
router.use("/reservations", reservationsRouter);

router.get("/all-meals", async (req, res) => {
  try {
    const allMeals = await db("meals").select("*").orderBy("id", "desc");
    res.json(allMeals);
  } catch (error) {
    throw error;
  }
});

// Add more routes here...

// Use the router
app.use(process.env.API_PATH, router);

// Serve the client
const buildPath = path.join(__dirname, "../../dist");
app.use(express.static(buildPath));
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

// Start the server
const port = process.env.API_PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
