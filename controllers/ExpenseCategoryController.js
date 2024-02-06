
const expenseCategoryModel = require('../models/ExpenseCategoryModel');
const getAllExpensesCategory = async (req, res) => 
{


    try{
        const expenseCategory = await expenseCategoryModel.find();
        res.status(200).json({
            status: "success",
            data: expenseCategory,
        })
    }catch(err){

        res.status(500).json({
            status: "fail",
            message: err.message,
        })

    }



}
module.exports = {
    getAllExpensesCategory
}