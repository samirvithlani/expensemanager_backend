const router = require('express').Router();
const expenseController = require('../controllers/ExpenseController');

router.post('/expense', expenseController.createExpense);
router.get('/expense', expenseController.getAllExpenses);
module.exports = router;