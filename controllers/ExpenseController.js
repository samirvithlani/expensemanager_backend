const expenseModel = require("../models/ExpenseModel");
const userModel = require("../models/UserModel");

const mailUtil = require("../utils/MailUtil");

const createExpense = async (req, res) => {
  const user = await userModel.findById(req.body.user);
  console.log(user);
  mailUtil.sendMail(
    user.email,
    "Expense Created",
    "title = " +
      req.body.title +
      " amount = " +
      req.body.amount +
      " category = " +
      req.body.category +
      " mode = " +
      req.body.mode
  );

  console.log(req.body);
  try {
    const savedExpense = await expenseModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: savedExpense,
      flag: 1,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
      flag: -1,
    });
  }
};

const getAllExpensesByUserId = async (req, res) => {
  try {
    //const expenses  = await expenseModel.find({status: true}).populate('category').populate('user');
    const expenses = await expenseModel
      .find({ user: req.params.id })
      .populate("category")
      .populate("user");
    if (expenses) {
      res.status(200).json({
        status: "success",
        data: expenses,
        flag: 1,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "No expense found",
        flag: -1,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
      flag: -1,
    });
  }
};
module.exports = {
  createExpense,
  getAllExpensesByUserId,
};
