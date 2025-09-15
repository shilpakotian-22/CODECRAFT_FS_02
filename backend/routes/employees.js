const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Employee = require('../models/Employee');

// Create employee
// POST /api/employees
router.post('/', auth, async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all employees
// GET /api/employees
router.get('/', auth, async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single employee
// GET /api/employees/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ msg: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Employee not found' });
    res.status(500).send('Server error');
  }
});

// Update employee
// PUT /api/employees/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!emp) return res.status(404).json({ msg: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete employee
// DELETE /api/employees/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) return res.status(404).json({ msg: 'Employee not found' });
    res.json({ msg: 'Employee removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
