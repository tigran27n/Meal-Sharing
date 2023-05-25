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

// GET /api/reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await db("reviews").select("*");
    res.json(reviews);
  } catch (error) {
    throw error;
  }
});

// GET /api/meals/:meal_id/reviews
router.get("/:meal_id", async (req, res) => {
  try {
    const { meal_id } = req.params;
    const reviews = await db("reviews").where("meal_id", meal_id).select("*");
    res.json(reviews);
  } catch (error) {
    throw error;
  }
});

// POST /api/reviews
router.post("/", async (req, res) => {
  try {
    const { meal_id, content } = req.body;
    const review = await db("reviews").insert({ meal_id, content });
    res.json(review);
  } catch (error) {
    throw error;
  }
});

// GET /api/reviews/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const review = await db("reviews").where("id", id).first();
    res.json(review);
  } catch (error) {
    throw error;
  }
});

// PUT /api/reviews/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const review = await db("reviews").where("id", id).update({ content });
    res.json(review);
  } catch (error) {
    throw error;
  }
});

// DELETE /api/reviews/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db("reviews").where("id", id).del();
    res.sendStatus(204);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
