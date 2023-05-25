const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await knex.select("*").from("reservations");
    res.json(reservations);
  } catch (error) {
    throw error;
  }
});

// GET reservation by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await knex
      .select("*")
      .from("reservations")
      .where("id", id)
      .first();
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    throw error;
  }
});

// POST a new reservation
router.post("/", async (req, res) => {
  try {
    const newReservation = await knex("reservations").insert(req.body);
    res.status(201).json({ message: "Reservation created", reservationId: newReservation[0] });
  } catch (error) {
    throw error;
  }
});

// PUT (update) reservation by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedReservation = await knex("reservations")
      .where("id", id)
      .update(req.body);
    if (updatedReservation) {
      res.json({ message: "Reservation updated" });
    } else {
      res.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    throw error;
  }
});

// DELETE reservation by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReservation = await knex("reservations")
      .where("id", id)
      .del();
    if (deletedReservation) {
      res.json({ message: "Reservation deleted" });
    } else {
      res.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
