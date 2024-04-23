const incomeSchema = require("../models/incomeModel")



exports.addIncome= async(req,res) =>
{
    console.log(req.body)
    const {title,amount,category,description,date}=req.body

    const income=incomeSchema(
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
        await income.save()
        res.status(200).json({message:"Income added "})
    } catch (error) {
        res.status(400).json({message:"Server error"})
    }
    console.log(income)
}

exports.getIncomes = async (req,res) =>
{
    try {
        const incomes=await incomeSchema.find().sort({createdAt:-1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message:"Server error while getting income"})
    }
}

exports.deleteIncome = async (req,res) =>
{
    const {id}= req.params;
    console.log(req.params)
    incomeSchema.findByIdAndDelete(id)
    .then((income) => {
        res.status(200).json({message:"Deleted"})
    })
    .catch((error)=>
    {
        res.status(500).json({message:"Server error Unable to delete"})
    })
}