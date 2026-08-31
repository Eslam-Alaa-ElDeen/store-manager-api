const express = require("express");
const { Router } = require("express");
const { db } = require("../../database/connectDB.js");
const { addSupplier, getAllSuppliers, updateSupplier, deleteSupplier, getAllDataStartsWithChar } = require("./supplier.service.js");
const supplierRouter = Router();

supplierRouter.use(express.json());

supplierRouter.post("/", addSupplier);

supplierRouter.get("/", getAllSuppliers);

supplierRouter.patch("/:id",updateSupplier );

supplierRouter.delete("/:id",deleteSupplier)

supplierRouter.get("/searchByChar/:char",getAllDataStartsWithChar)

module.exports = {
  supplierRouter,
};
