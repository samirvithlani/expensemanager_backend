const router = require('express').Router();
const expenseCategoryController = require('../controllers/ExpenseCategoryController');
router.get('/expense-category', expenseCategoryController.getAllExpensesCategory);
module.exports = router;