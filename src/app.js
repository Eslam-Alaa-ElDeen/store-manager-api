const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2/promise");
const { connectDB,db } = require("./database/connectDB.js");
const { productRouter } = require("./modules/Products/product.controller.js");
const { supplierRouter } = require("./modules/Suppliers/supplier.controller.js");
const { saleRouter } = require("./modules/Sales/sale.controller.js");
const { dbRouter } = require("./modules/DataBase/database.controller.js");
const { insertSupplier, insertProducts, insertSale } = require("./scripts/seed.js");
const { run } = require("./scripts/create-store-manager.sql.js");


function bootstrap(){

    app.use(express.json())
    connectDB(app,port)
    app.use("/supplier",supplierRouter)
    app.use("/product",productRouter)
    app.use("/sale",saleRouter)
    app.use("/database",dbRouter)
    
    insertSupplier()
    insertProducts()
    insertSale()
    // run()      //uncommint to run {revoke-grant-createUser}

    app.get('/',async(req,res)=>{
        try {
        const query=`select 1+1 as res`;
        const[data]=await db.execute(query)
        if (data) {
            return res.status(200).json({msg:"welcome to my server by (eslam 3laa 🫡)"})
        }
        } catch (error) {
            return res.status(404).json(error.message)
        }

    })

    app.all("{/*dummy}",(req,res)=>{
        return res.status(404).json({
            msg:`the url:${req.originalUrl} not matched with eny endpoint with method :${req.method}`,
            status:404
        })
    })
}

module.exports={
    bootstrap
}
