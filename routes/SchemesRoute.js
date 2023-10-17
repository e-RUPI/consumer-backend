const express = require("express");
const mongoose = require("mongoose");
const Schemes = require("../models/Schemes");

const router = express.Router();

// GET all schemes with optional filters
router.get("/", async (req, res) => {
  try {
    const filter = {};

    if (req.query.mcc) {
      filter.mcc = req.query.mcc;
    }

    const schemes = await Schemes.find(filter);
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching schemes" });
  }
});

// POST a new scheme
router.post("/insert", async (req, res) => {
  try {
    const newScheme = new Schemes(req.body);
    const savedScheme = await newScheme.save();
    res.status(201).json(savedScheme);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while saving the scheme" });
  }
});

// DELETE a scheme by SchemeId
router.delete("/delete/:schemeId", async (req, res) => {
  try {
    const { schemeId } = req.params;
    const deletedScheme = await Schemes.findOneAndDelete({ schemeId });

    if (!deletedScheme) {
      return res.status(404).json({ error: "Scheme not found" });
    }

    res.json({ message: "Scheme deleted successfully", deletedScheme });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the scheme" });
  }
});

module.exports = router;
