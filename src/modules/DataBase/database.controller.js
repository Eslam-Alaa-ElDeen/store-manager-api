const express=require("express")
const {Router}=require("express")
const { db } = require("../../database/connectDB.js");
const { addConstraint, addCategory, removeCategory, changeTypeOfContactNum } = require("./database.service.js");
const dbRouter=Router()

dbRouter.use(express.json());

dbRouter.post("/constraint",addConstraint)

dbRouter.post("/:addCategory",addCategory)

dbRouter.delete("/:removeCategory",removeCategory)

dbRouter.patch("/contactNumber",changeTypeOfContactNum)



module.exports={
    dbRouter
}
