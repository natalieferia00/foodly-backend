const mongoose = require('mongoose');

const PlanDiaSchema = new mongoose.Schema({
  desayuno: { type: String, default: "" },
  almuerzo: { type: String, default: "" },
  merienda: { type: String, default: "" },
  cena: { type: String, default: "" }
});

const MealPlanSchema = new mongoose.Schema({
  // Guardaremos un solo documento que contenga todos los días
  Lunes: PlanDiaSchema,
  Martes: PlanDiaSchema,
  Miércoles: PlanDiaSchema,
  Jueves: PlanDiaSchema,
  Viernes: PlanDiaSchema,
  Sábado: PlanDiaSchema,
  Domingo: PlanDiaSchema
}, { timestamps: true });

module.exports = mongoose.model('MealPlan', MealPlanSchema);