const express = require('express');
const Expense = require('../models/Expense');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get expense summary
router.get('/summary', auth, async (req, res) => {
  try {
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    // Total expenses this month
    const monthlyExpenses = await Expense.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: currentMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Total all-time expenses
    const totalExpenses = await Expense.aggregate([
      {
        $match: { user: req.user._id }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Get user budget
    const user = await User.findById(req.userId);

    const monthlyTotal = monthlyExpenses[0]?.total || 0;
    const monthlyCount = monthlyExpenses[0]?.count || 0;
    const allTimeTotal = totalExpenses[0]?.total || 0;
    const allTimeCount = totalExpenses[0]?.count || 0;

    res.json({
      summary: {
        monthlyTotal,
        monthlyCount,
        allTimeTotal,
        allTimeCount,
        budget: user.monthlyBudget,
        budgetRemaining: user.monthlyBudget - monthlyTotal,
        budgetPercentage: user.monthlyBudget > 0 
          ? ((monthlyTotal / user.monthlyBudget) * 100).toFixed(2)
          : 0
      }
    });
  } catch (error) {
    console.error('Get summary error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get category breakdown
router.get('/category', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const matchQuery = { user: req.user._id };
    
    if (startDate || endDate) {
      matchQuery.date = {};
      if (startDate) matchQuery.date.$gte = new Date(startDate);
      if (endDate) matchQuery.date.$lte = new Date(endDate);
    }

    const categoryData = await Expense.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    const formattedData = categoryData.map(item => ({
      category: item._id,
      total: item.total,
      count: item.count
    }));

    res.json({ categoryData: formattedData });
  } catch (error) {
    console.error('Get category data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get monthly trends (last 6 months)
router.get('/monthly', auth, async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const monthlyData = await Expense.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const formattedData = monthlyData.map(item => ({
      month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
      total: item.total,
      count: item.count
    }));

    res.json({ monthlyData: formattedData });
  } catch (error) {
    console.error('Get monthly data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get payment method breakdown
router.get('/payment-methods', auth, async (req, res) => {
  try {
    const paymentData = await Expense.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$paymentMethod',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    const formattedData = paymentData.map(item => ({
      method: item._id,
      total: item.total,
      count: item.count
    }));

    res.json({ paymentData: formattedData });
  } catch (error) {
    console.error('Get payment data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
