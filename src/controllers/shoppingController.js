const MealPlan = require('../models/MealPlan');

exports.getShoppingList = async (req, res) => {
  try {
    const plans = await MealPlan.find();
    const list = {};

    // Lógica para consolidar ingredientes
    plans.forEach(plan => {
      plan.ingredients.forEach(ing => {
        if (list[ing.name]) {
          list[ing.name].quantity += ` + ${ing.quantity}`;
        } else {
          list[ing.name] = { quantity: ing.quantity, isBought: ing.isBought };
        }
      });
    });

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};