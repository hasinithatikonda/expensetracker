# Contributing to AI Expense Tracker

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing](#testing)
8. [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior

- Be respectful and considerate
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Public or private harassment
- Publishing others' private information
- Other unethical or unprofessional conduct

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Git
- MongoDB Atlas account
- Groq API key
- Code editor (VS Code recommended)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/expense-tracker.git
cd expense-tracker
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/expense-tracker.git
```

### Setup Development Environment

1. Install dependencies:
```bash
npm run install-all
```

2. Configure environment variables:
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your credentials

# Frontend
cd ../frontend
cp .env.example .env
# Edit .env with your API URL
```

3. Start development servers:
```bash
# From root directory
npm run dev
```

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### Creating a Feature Branch

```bash
git checkout develop
git pull upstream develop
git checkout -b feature/your-feature-name
```

### Making Changes

1. Make your changes in the feature branch
2. Test your changes thoroughly
3. Commit your changes (see commit guidelines)
4. Push to your fork
5. Create a pull request

### Keeping Your Fork Updated

```bash
git checkout develop
git pull upstream develop
git push origin develop
```

## Coding Standards

### JavaScript/React

**Style Guide:**
- Use ES6+ features
- Use functional components with hooks
- Use meaningful variable names
- Keep functions small and focused
- Add comments for complex logic

**Example:**
```javascript
// Good
const calculateTotalExpenses = (expenses) => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
};

// Bad
const calc = (e) => {
  let s = 0;
  for(let i = 0; i < e.length; i++) {
    s += e[i].amount;
  }
  return s;
};
```

### File Organization

**Backend:**
```
backend/
├── config/       # Configuration files
├── middleware/   # Express middleware
├── models/       # Mongoose models
├── routes/       # API routes
├── services/     # Business logic
└── utils/        # Utility functions
```

**Frontend:**
```
frontend/src/
├── components/   # Reusable components
├── context/      # React context
├── pages/        # Page components
├── hooks/        # Custom hooks
├── utils/        # Utility functions
└── styles/       # CSS/styling
```

### Naming Conventions

**Files:**
- Components: `PascalCase.jsx` (e.g., `ExpenseCard.jsx`)
- Utilities: `camelCase.js` (e.g., `formatDate.js`)
- Constants: `UPPER_SNAKE_CASE.js` (e.g., `API_ENDPOINTS.js`)

**Variables:**
- camelCase for variables and functions
- PascalCase for components and classes
- UPPER_SNAKE_CASE for constants

**Example:**
```javascript
// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Variables
const userName = 'John Doe';
const totalAmount = 100.50;

// Functions
const calculateTotal = () => { };

// Components
const ExpenseCard = () => { };
```

### Code Formatting

Use consistent formatting:
- 2 spaces for indentation
- Single quotes for strings
- Semicolons at end of statements
- Trailing commas in objects/arrays

**Recommended:** Use Prettier for automatic formatting

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(expenses): add filter by date range"

# Bug fix
git commit -m "fix(auth): resolve token expiration issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Refactor
git commit -m "refactor(api): optimize expense queries"
```

### Commit Best Practices

- Write clear, concise commit messages
- Use present tense ("add feature" not "added feature")
- Keep commits focused on single changes
- Reference issues when applicable (#123)

## Pull Request Process

### Before Submitting

1. **Update your branch:**
```bash
git checkout develop
git pull upstream develop
git checkout your-feature-branch
git rebase develop
```

2. **Test your changes:**
- Run all tests
- Test manually in browser
- Check for console errors
- Verify responsive design

3. **Update documentation:**
- Update README if needed
- Add/update code comments
- Update API documentation

### Creating Pull Request

1. Push your branch to your fork:
```bash
git push origin feature/your-feature-name
```

2. Go to GitHub and create a pull request

3. Fill out the PR template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] All tests passing

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, PR will be merged
4. Your contribution will be credited

### After Merge

1. Delete your feature branch:
```bash
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

2. Update your local develop:
```bash
git checkout develop
git pull upstream develop
```

## Testing

### Running Tests

```bash
# Backend tests (when implemented)
cd backend
npm test

# Frontend tests (when implemented)
cd frontend
npm test
```

### Writing Tests

**Backend Example:**
```javascript
describe('Expense API', () => {
  it('should create expense with valid data', async () => {
    const expense = {
      amount: 50,
      category: 'Food & Dining',
      date: new Date()
    };
    
    const response = await request(app)
      .post('/api/expenses')
      .send(expense)
      .expect(201);
      
    expect(response.body.expense.amount).toBe(50);
  });
});
```

**Frontend Example:**
```javascript
describe('ExpenseCard', () => {
  it('should render expense details', () => {
    const expense = {
      amount: 50,
      category: 'Food & Dining',
      merchant: 'Restaurant'
    };
    
    render(<ExpenseCard expense={expense} />);
    
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(screen.getByText('Restaurant')).toBeInTheDocument();
  });
});
```

### Manual Testing

Follow the [TESTING.md](TESTING.md) checklist for manual testing.

## Documentation

### Code Comments

Add comments for:
- Complex algorithms
- Business logic
- Non-obvious code
- API endpoints
- Component props

**Example:**
```javascript
/**
 * Calculate total expenses for a given date range
 * @param {Array} expenses - Array of expense objects
 * @param {Date} startDate - Start date of range
 * @param {Date} endDate - End date of range
 * @returns {Number} Total amount
 */
const calculateTotal = (expenses, startDate, endDate) => {
  // Filter expenses within date range
  const filtered = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= startDate && expenseDate <= endDate;
  });
  
  // Sum amounts
  return filtered.reduce((sum, expense) => sum + expense.amount, 0);
};
```

### API Documentation

Document API endpoints:

```javascript
/**
 * @route   POST /api/expenses
 * @desc    Create new expense
 * @access  Private
 * @body    {amount, category, merchant, description, date, paymentMethod}
 * @returns {expense} Created expense object
 */
router.post('/', auth, async (req, res) => {
  // Implementation
});
```

### README Updates

Update README.md when:
- Adding new features
- Changing setup process
- Updating dependencies
- Modifying API endpoints

## Feature Requests

### Proposing New Features

1. Check existing issues first
2. Create a new issue with:
   - Clear description
   - Use cases
   - Proposed implementation
   - Potential challenges

3. Wait for discussion and approval
4. Implement after approval

### Feature Template

```markdown
## Feature Request

**Description:**
Clear description of the feature

**Use Case:**
Why is this feature needed?

**Proposed Solution:**
How should it work?

**Alternatives:**
Other approaches considered

**Additional Context:**
Screenshots, mockups, etc.
```

## Bug Reports

### Reporting Bugs

1. Check if bug already reported
2. Create detailed bug report:

```markdown
## Bug Report

**Description:**
What's the bug?

**Steps to Reproduce:**
1. Step one
2. Step two
3. Step three

**Expected Behavior:**
What should happen?

**Actual Behavior:**
What actually happens?

**Environment:**
- OS: Windows 11
- Browser: Chrome 120
- Node version: 18.0.0

**Screenshots:**
If applicable

**Additional Context:**
Any other relevant information
```

## Questions and Support

- **Documentation:** Check README, SETUP, and DEPLOYMENT guides
- **Issues:** Search existing issues
- **Discussions:** Use GitHub Discussions for questions
- **Email:** Contact maintainers for private matters

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Mentioned in project documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort! 🎉
