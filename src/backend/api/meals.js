const express = require("express");
const router = express.Router();
const knex = require("knex");

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

// Old Meals Endpoints

// GET /api/meals
router.get("/meals", async (req, res) => {
  try {
    const allMeals = await db("meals").select("*").orderBy("id", "desc");
    res.json(allMeals);
  } catch (error) {
    throw error;
  }
});

// New Meals Endpoints

// GET /api/meals/:id
router.get("/meals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await db("meals").where("id", id).first();
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.json(meal);
  } catch (error) {
    throw error;
  }
});

// POST /api/meals
router.post("/meals", async (req, res) => {
  try {
    const { title, description, location, meal_date, max_reservations, price, created_date } = req.body;
    const meal = await db("meals").insert({
      title,
      description,
      location,
      meal_date,
      max_reservations,
      price,
      created_date,
    });
    res.json(meal);
  } catch (error) {
    throw error;
  }
});

// PUT /api/meals/:id
router.put("/meals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, meal_date, max_reservations, price, created_date } = req.body;
    const meal = await db("meals").where("id", id).update({
      title,
      description,
      location,
      meal_date,
      max_reservations,
      price,
      created_date,
    });
    res.json(meal);
  } catch (error) {
    throw error;
  }
});

// DELETE /api/meals/:id
router.delete("/meals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db("meals").where("id", id).del();
    res.sendStatus(204);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
