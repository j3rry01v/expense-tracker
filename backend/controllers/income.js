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