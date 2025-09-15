const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: false, trim: true },
  position: { type: String, required: false, trim: true },
  department: { type: String, required: false, trim: true },
  salary: { type: Number, required: false, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
