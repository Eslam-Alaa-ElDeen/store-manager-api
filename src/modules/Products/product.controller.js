const express=require("express")
const {Router}=require("express");
const { db } = require("../../database/connectDB.js");
const { addProduct, getAllProduct, getProductByID, updateProduct, deleteProduct, updateProductPrice, deleteByNameOfProduct, getMaxProductQuantitiy, getAllProductsNotSold } = require("./product.service.js");
const productRouter=Router();

productRouter.use(express.json());

productRouter.post("/",addProduct)

productRouter.get("/",getAllProduct)

productRouter.get("/allProductNotSold",getAllProductsNotSold)

productRouter.get("/maxProductQuantitiy",getMaxProductQuantitiy)

productRouter.get("/:id",getProductByID)

productRouter.patch("/updatePrice",updateProductPrice)

productRouter.patch("/:id",updateProduct)

productRouter.delete("/:id",deleteProduct)

productRouter.delete("/deleteProduct/:name",deleteByNameOfProduct)



module.exports={
    productRouter
}