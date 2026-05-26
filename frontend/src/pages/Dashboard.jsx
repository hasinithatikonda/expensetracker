import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { 
  DollarSign, 
  TrendingUp, 
  Receipt, 
  Wallet,
  Calendar,
  Edit2
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];

function Dashboard() {
  const { user, updateBudget } = useAuth();
  const [summary, setSummary] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBudget, setEditingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(user?.monthlyBudget || 0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [summaryRes, categoryRes, expensesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/analytics/summary`),
        axios.get(`${import.meta.env.VITE_API_URL}/analytics/category`),
        axios.get(`${import.meta.env.VITE_API_URL}/expenses?limit=5`)
      ]);

      setSummary(summaryRes.data.summary);
      setCategoryData(categoryRes.data.categoryData);
      setRecentExpenses(expensesRes.data.expenses.slice(0, 5));
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBudget = async () => {
    try {
      await updateBudget(parseFloat(newBudget));
      toast.success('Budget updated successfully');
      setEditingBudget(false);
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to update budget');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  const budgetPercentage = summary?.budgetPercentage || 0;
  const isOverBudget = budgetPercentage > 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                ${summary?.monthlyTotal?.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">
                ${summary?.allTimeTotal?.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-gray-900">
                {summary?.monthlyCount || 0}
              </p>
            </div>
            <div className="bg-pink-100 p-3 rounded-full">
              <Receipt className="w-6 h-6 text-pink-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Budget</p>
              {editingBudget ? (
                <div className="flex items-center space-x-2 mt-1">
                  <input
                    type="number"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-24 px-2 py-1 border rounded"
                  />
                  <button
                    onClick={handleUpdateBudget}
                    className="text-green-600 hover:text-green-700"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => setEditingBudget(false)}
                    className="text-red-600 hover:text-red-700"
                  >
                    ✗
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-gray-900">
                    ${user?.monthlyBudget?.toFixed(2) || '0.00'}
                  </p>
                  <button
                    onClick={() => setEditingBudget(true)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Budget Progress */}
      {user?.monthlyBudget > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                ${summary?.monthlyTotal?.toFixed(2)} of ${user?.monthlyBudget?.toFixed(2)}
              </span>
              <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                {budgetPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  isOverBudget ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
              />
            </div>
            {isOverBudget && (
              <p className="text-sm text-red-600 mt-2">
                ⚠️ You've exceeded your budget by ${(summary?.monthlyTotal - user?.monthlyBudget).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h2>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">No expense data available</p>
          )}
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Expenses</h2>
          {recentExpenses.length > 0 ? (
            <div className="space-y-3">
              {recentExpenses.map((expense) => (
                <div key={expense._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-100 p-2 rounded-full">
                      <Receipt className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {expense.merchant || expense.category}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${expense.amount.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{expense.category}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No recent expenses</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
