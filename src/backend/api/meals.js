const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET all meals
router.get("/", async (req, res) => {
  try {
    const meals = await knex.select("*").from("meals");
    res.json(meals);
  } catch (error) {
    throw error;
  }
});

// GET meal by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const meal = await knex.select("*").from("meals").where("id", id).first();
    if (meal) {
      res.json(meal);
    } else {
      res.status(404).json({ error: "Meal not found" });
    }
  } catch (error) {
    throw error;
  }
});

// POST a new meal
router.post("/", async (req, res) => {
  try {
    const newMeal = await knex("meals").insert(req.body);
    res.status(201).json({ message: "Meal created", mealId: newMeal[0] });
  } catch (error) {
    throw error;
  }
});

// PUT (update) meal by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMeal = await knex("meals")
      .where("id", id)
      .update(req.body);
    if (updatedMeal) {
      res.json({ message: "Meal updated" });
    } else {
      res.status(404).json({ error: "Meal not found" });
    }
  } catch (error) {
    throw error;
  }
});

// DELETE meal by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMeal = await knex("meals").where("id", id).del();
    if (deletedMeal) {
      res.json({ message: "Meal deleted" });
    } else {
      res.status(404).json({ error: "Meal not found" });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
