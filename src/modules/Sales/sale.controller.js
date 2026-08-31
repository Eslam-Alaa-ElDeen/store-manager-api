const express=require("express")
const {Router}=require("express")
const { db } = require("../../database/connectDB.js")
const { getProductByID, addProduct } = require("../Products/product.service.js")
const { getAllSales, getSaleForProduct, totalQuantityForEachProduct, getAllSalesIncludeProductName } = require("./sale.service.js")
const saleRouter=Router()

saleRouter.use(express.json())

saleRouter.post("/",addProduct)

saleRouter.get("/",getAllSales)

saleRouter.get("/AllSalesIncludeName",getAllSalesIncludeProductName)

saleRouter.get("/totalQuantity",totalQuantityForEachProduct)

saleRouter.get("/:productID",getSaleForProduct)

module.exports={
    saleRouter
}