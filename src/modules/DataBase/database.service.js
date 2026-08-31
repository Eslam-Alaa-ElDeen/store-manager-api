const { db } = require("../../database/connectDB.js");


const addConstraint=async(req,res)=>{
        try {
        const {type,constraint}=req.body;
        const query=`alter table products modify column productName ${type}  ${constraint}`
        console.log(query);
        await db.execute(query);
        res.status(200).json({msg:`the constraint: ${constraint} add to table products on column product name`})
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

const addCategory=async(req,res)=>{
    try {
        const{addCategory}=req.params
        const {type}=req.body
        const query=`alter table products add ${addCategory} ${type}`
        const [returnData]=await db.execute(query)
        return res.status(200).json({msg:"col added successfuly"})
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

const removeCategory=async(req,res)=>{
    try {
        const{removeCategory}=req.params
        const query=`alter table products drop column ${removeCategory}`
        const [returnData]=await db.execute(query)
        res.status(200).json({msg:"col deleted successfuly"})
    } catch (error) {
        return res.status(404).json(error.message)
    }

}

const changeTypeOfContactNum=async(req,res)=>{
    try {
        const {type}=req.body;
        const query=`alter table suppliers modify column contactNumber ${type} `
        await db.execute(query);
        res.status(200).json({msg:"type of contact number has beed changed"})
    } catch (error) {
        return res.status(404).json(error.message)
    }
    
}

module.exports={
    addConstraint,
    addCategory,
    removeCategory,
    changeTypeOfContactNum
}

