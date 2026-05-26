const express = require('express');
const { body, validationResult } = require('express-validator');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const upload = require('../config/multer');
const { extractExpenseFromReceipt } = require('../services/groqService');

const router = express.Router();

// Get all expenses for user with filtering
router.get('/', auth, async (req, res) => {
  try {
    const { category, startDate, endDate, minAmount, maxAmount } = req.query;
    
    // Build query
    const query = { user: req.userId };
    
    if (category) {
      query.category = category;
    }
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = parseFloat(minAmount);
      if (maxAmount) query.amount.$lte = parseFloat(maxAmount);
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    
    res.json({ expenses });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single expense
router.get('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ expense });
  } catch (error) {
    console.error('Get expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create expense manually
router.post('/', [
  auth,
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('category').notEmpty().withMessage('Category is required'),
  body('date').optional().isISO8601().withMessage('Invalid date format')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, category, merchant, description, date, paymentMethod } = req.body;

    const expense = new Expense({
      user: req.userId,
      amount,
      category,
      merchant,
      description,
      date: date || new Date(),
      paymentMethod: paymentMethod || 'Cash',
      isAIExtracted: false
    });

    await expense.save();

    res.status(201).json({
      message: 'Expense created successfully',
      expense
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload receipt and extract expense using AI
router.post('/upload', auth, upload.single('receipt'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Extract expense details using Groq AI
    const extractedData = await extractExpenseFromReceipt(req.file.path);

    // Create expense with extracted data
    const expense = new Expense({
      user: req.userId,
      amount: extractedData.amount,
      category: extractedData.category,
      merchant: extractedData.merchant,
      description: extractedData.description,
      date: new Date(extractedData.date),
      paymentMethod: extractedData.paymentMethod,
      receiptImage: req.file.filename,
      isAIExtracted: true
    });

    await expense.save();

    res.status(201).json({
      message: 'Receipt processed successfully',
      expense,
      extractedData
    });
  } catch (error) {
    console.error('Upload receipt error:', error);
    res.status(500).json({ 
      message: 'Failed to process receipt', 
      error: error.message 
    });
  }
});

// Update expense
router.put('/:id', [
  auth,
  body('amount').optional().isFloat({ min: 0 }).withMessage('Amount must be positive'),
  body('date').optional().isISO8601().withMessage('Invalid date format')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, category, merchant, description, date, paymentMethod } = req.body;

    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      {
        amount,
        category,
        merchant,
        description,
        date,
        paymentMethod
      },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({
      message: 'Expense updated successfully',
      expense
    });
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete expense
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
