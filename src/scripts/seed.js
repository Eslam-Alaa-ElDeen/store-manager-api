const { db } = require("../database/connectDB.js");

async function insertSupplier(){
    try {
        const searchQ=`select * from suppliers where supplierName="FreshFoods"`
        const [data]=await db.execute(searchQ)
        if (data?.length) {
            return
        }
        const addSupplier=`insert into suppliers(supplierName,contactNumber) values("FreshFoods","01001234567")`
        await db.execute(addSupplier)
    } catch (error) {
        console.log(error.message);
    }
}

async function insertProducts(){
    try {
        const searchQ=`select * from products where productName="Milk" and price=15.00 and stockQuantity=50 and supplierID=8`
        const [data]=await db.execute(searchQ)
        if (data?.length) {
            return
        }
        const addProduct=`insert into products(productName,price,stockQuantity,supplierID ) values
            ("Milk","15.00","50","8"),
            ("Bread","10.00","30","8"),
            ("Eggs","20.00","40","8")
        `
        await db.execute(addProduct)
    } catch (error) {
        console.log(error.message);
    }
}

async function insertSale(){
    try {
        const searchQ=`select productID from products where productName="Milk" and price=15.00 and stockQuantity=50 and supplierID=8`
        const [data]=await db.execute(searchQ)
        if (data?.length==0) {
            console.log("the productId not founded");
            return
        }
        const productID=data[0].productID
        
        const searchQQ=`select * from sales where quantitySold="2" and saleDate="2025-05-20 23:58:35" and productID =${productID}`
        const [dataReturn]=await db.execute(searchQQ)
        if (dataReturn?.length) {
            return
        }

        const insertQ=`insert into sales(quantitySold,saleDate,productID) values(2,"2025-05-20 23:58:35",${productID})`
        await db.execute(insertQ)
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={
    insertSupplier,
    insertProducts,
    insertSale
}