const express = require("express");
const mongoose = require("mongoose");
const Vouchers = require("../models/Vouchers");

const router = express.Router();

// GET all vouchers with optional filters and sorting
router.get("/", async (req, res) => {
  try {
    // Initialize an empty filter object
    const filter = {};

    // Apply filters based on query parameters
    if (req.query.mcc) {
      filter.mcc = req.query.mcc;
    }

    if (req.query.status) {
      filter.status = req.query.status; // Apply a status filter
    }

    if (req.query.eRupiId) {
      filter.eRupiId = req.query.eRupiId; // Apply eRupiId filter
    }

    if (req.query.redemptionDate) {
      filter.redemptionDate = req.query.redemptionDate; // Apply redemptionDate filter
    }

    // Apply sorting
    const sort = {};

    if (req.query.sortBy) {
      // Sort by a field (e.g., createdAt) in ascending or descending order
      sort[req.query.sortBy] = req.query.sortOrder === "desc" ? -1 : 1;
    }

    // Query the database with filters and sorting
    const vouchers = await Vouchers.find(filter).sort(sort).exec();

    res.json(vouchers);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching vouchers" });
  }
});

// POST a new voucher
router.post("/insert", async (req, res) => {
  try {
    const newVoucher = new Vouchers(req.body);
    const savedVoucher = await newVoucher.save();
    res.status(201).json(savedVoucher);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while saving the Voucher" });
  }
});

// DELETE a Voucher by VoucherId
router.delete("/delete/:voucherId", async (req, res) => {
  try {
    const { voucherId } = req.params;
    const deletedVoucher = await Vouchers.findOneAndDelete({ voucherId });

    if (!deletedVoucher) {
      return res.status(404).json({ error: "Voucher not found" });
    }

    res.json({ message: "Voucher deleted successfully", deletedVoucher });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the Voucher" });
  }
});

// Update the usedAmount of a voucher by eRupiId
router.put("/usedAmount/:id", async (req, res) => {
  const eRupiId = req.params.id;
  const { usedAmount } = req.body;

  try {
    const voucher = await Vouchers.findOne({ eRupiId });

    if (!voucher) {
      return res.status(404).json({ error: "Voucher not found" });
    }

    voucher.usedAmount = usedAmount;
    await voucher.save();

    res.json(voucher);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating usedAmount" });
  }
});

// Update the status of a voucher
router.put("/status/:id", async (req, res) => {
  const eRupiId = req.params.id;
  const { status } = req.body;

  try {
    const voucher = await Vouchers.findOne({ eRupiId });

    if (!voucher) {
      return res.status(404).json({ error: "Voucher not found" });
    }

    voucher.status = status;
    await voucher.save();

    res.json(voucher);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while updating status" });
  }
});

module.exports = router;
