
const MealPlan = require('../models/MealPlan');

exports.getPlan = async (req, res) => {
  try {
    const plan = await MealPlan.findOne().sort({ createdAt: -1 });
    res.json(plan || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePlan = async (req, res) => {
  try {

    const plan = await MealPlan.findOneAndUpdate(
      {},
      req.body,
      { upsert: true, new: true }
    );
    res.json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};