const expenseSchema = require("../models/expenseModel")



exports.addExpense= async(req,res) =>
{
    console.log(req.body)
    const {title,amount,category,description,date}=req.body

    const expense=expenseSchema(
        {
            title,
            amount,
            category,
            description,
            date
        }
       
    )

    try {
        if (!title || !category || !amount || !description || !date){
            return res.status(400).json({message:"All felids are required"})
        }
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0){
            return res.status(400).json({message:"Amount must be a positive number"})
        }
        await expense.save()
        res.status(200).json({message:"Expense added "})
    } catch (error) {
        res.status(400).json({message:"Server error"})
    }
    console.log(expense)
}

exports.getExpenses = async (req,res) =>
{
    try {
        const expense=await expenseSchema.find().sort({createdAt:-1})
        res.status(200).json(expense)
    } catch (error) {
        res.status(500).json({message:"Server error while getting expense"})
    }
}

exports.deleteExpense = async (req,res) =>
{
    const {id}= req.params;
    console.log(req.params)
    expenseSchema.findByIdAndDelete(id)
    .then(() => {
        res.status(200).json({message:"Deleted expense"})
    })
    .catch((error)=>
    {
        // res.status(500).json({message:,error+ "Server error Unable to delete expense"})
        console.error("Error while deleting expense:", error); // Log the error to the console.
        res.status(500).json({message: "Server error Unable to delete expense", error: error.message});

    })
}