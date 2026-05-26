# 💰 AI Expense Tracker

A full-stack expense tracking application with AI-powered receipt scanning using Groq API. Track your expenses manually or simply upload a receipt photo and let AI extract all the details automatically!

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

> **👋 New here?** Check out [START_HERE.md](START_HERE.md) for a guided introduction!

## ✨ Features

- 🤖 **AI-Powered Receipt Scanning** - Upload receipt images and extract expense details automatically using Groq Vision API
- 💰 **Manual Expense Entry** - Add expenses manually with full CRUD operations
- 📊 **Rich Analytics Dashboard** - Visualize spending with interactive pie charts, bar charts, and line graphs
- 🔐 **Secure Authentication** - JWT-based authentication with password hashing
- 📱 **Responsive Design** - Beautiful, modern UI with Tailwind CSS that works on all devices
- 🎯 **Budget Tracking** - Set monthly budgets and track spending with visual progress indicators
- 🔍 **Advanced Filtering** - Filter expenses by category, date range, merchant, and more
- 📤 **Image Upload** - Secure file upload with validation using Multer
- 📈 **Monthly Trends** - Track spending patterns over time with trend analysis
- 💳 **Payment Method Tracking** - Monitor expenses across different payment methods

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account ([Sign up free](https://www.mongodb.com/cloud/atlas))
- Groq API key ([Get free key](https://console.groq.com))

### One-Command Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd expense-tracker

# Install all dependencies (backend + frontend)
npm run install-all

# Configure environment variables (see below)

# Start both servers concurrently
npm run dev
```

### Manual Setup

#### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your credentials

npm run dev
```

**Backend `.env` configuration:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
GROQ_API_KEY=your_groq_api_key_here
NODE_ENV=development
```

#### Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env
# Edit .env with API URL

npm run dev
```

**Frontend `.env` configuration:**
```env
VITE_API_URL=http://localhost:5000/api
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Charting library for data visualization
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Groq SDK** - AI vision API integration
- **Express Validator** - Input validation

### AI & Cloud Services
- **Groq Vision API** - Receipt text extraction and parsing
- **MongoDB Atlas** - Cloud database hosting
- **Vercel** - Frontend deployment
- **Render/Railway** - Backend deployment

## 📸 Screenshots

### Dashboard
![Dashboard with budget tracking, recent expenses, and category breakdown]

### AI Receipt Upload
![Upload receipt and AI automatically extracts expense details]

### Analytics
![Interactive charts showing spending trends and patterns]

### Expense Management
![Filter and manage all your expenses in one place]

## 📖 Documentation

- **[SETUP.md](SETUP.md)** - Detailed local development setup guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment instructions for production
- **[FEATURES.md](FEATURES.md)** - Comprehensive feature documentation
- **[TESTING.md](TESTING.md)** - Testing guidelines and checklist
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/budget` - Update monthly budget

### Expenses
- `GET /api/expenses` - Get all expenses (with filtering)
- `GET /api/expenses/:id` - Get single expense
- `POST /api/expenses` - Create expense manually
- `POST /api/expenses/upload` - Upload receipt for AI extraction
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Analytics
- `GET /api/analytics/summary` - Get expense summary and budget status
- `GET /api/analytics/category` - Get spending by category
- `GET /api/analytics/monthly` - Get monthly spending trends (6 months)
- `GET /api/analytics/payment-methods` - Get payment method breakdown

## 🎯 Usage Examples

### Manual Expense Entry
1. Navigate to "Add Expense"
2. Select "Manual Entry" tab
3. Fill in amount, category, merchant, date, and payment method
4. Click "Save Expense"

### AI Receipt Scanning
1. Navigate to "Add Expense"
2. Select "Upload Receipt (AI)" tab
3. Upload a clear photo of your receipt
4. AI will automatically extract:
   - Total amount
   - Merchant name
   - Category
   - Date
   - Payment method
5. Review and save

### Budget Tracking
1. Go to Dashboard
2. Click edit icon next to Budget
3. Enter your monthly budget
4. Track spending with visual progress bar
5. Get alerts when exceeding budget

### Analytics & Reports
1. Navigate to "Analytics"
2. View spending by category (pie chart)
3. Check monthly trends (line chart)
4. Analyze payment methods
5. Review transaction counts

## 🚀 Deployment

### Quick Deploy

**Backend (Render):**
1. Connect GitHub repository
2. Select `backend` folder
3. Add environment variables
4. Deploy

**Frontend (Vercel):**
1. Import GitHub repository
2. Select `frontend` folder
3. Add `VITE_API_URL` environment variable
4. Deploy

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- File upload restrictions
- CORS configuration
- Environment variable protection

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on:
- Code of conduct
- Development workflow
- Coding standards
- Pull request process

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Groq](https://groq.com) for the amazing AI vision API
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Vercel](https://vercel.com) for frontend hosting
- [Render](https://render.com) for backend hosting
- All contributors and users of this project

## 📧 Support

- 📖 Check the [documentation](SETUP.md)
- 🐛 Report bugs via [GitHub Issues](https://github.com/yourusername/expense-tracker/issues)
- 💬 Ask questions in [GitHub Discussions](https://github.com/yourusername/expense-tracker/discussions)
- ⭐ Star the repo if you find it helpful!

## 🗺️ Roadmap

- [ ] Export data to CSV/PDF
- [ ] Recurring expenses
- [ ] Multi-currency support
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Expense sharing with family/friends
- [ ] Advanced budget categories
- [ ] Receipt OCR improvements
- [ ] Bank integration
- [ ] Tax calculation features

---

**Made with ❤️ using React, Node.js, MongoDB, and Groq AI**
