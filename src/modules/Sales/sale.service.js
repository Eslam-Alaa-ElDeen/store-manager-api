const { db } = require("../../database/connectDB.js");



const addSale=async(req,res)=>{
    try {
        const {productID,quantitySold}=req.body;
        const queryProductID=`select * from products where productID=?`
        const [dataProductID]=await db.execute(queryProductID,[productID])
        if (dataProductID?.length==0) {
            return res.status(404).json({msg:"the productID u enterd not founded"})
        }
        const queryAdd=`insert into sales(productID,quantitySold) values(?,?)`
        const [dataAdd]=await db.execute(queryAdd,[productID,quantitySold])
        if (dataAdd?.affectedRows==0) {
            return res.status(404).json({msg:"fail to add sale"})
        }
        res.status(200).json({msg:"sale added successfuly"})
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

const getAllSales=async(req,res)=>{
    try {
        const queryGet=`select * from sales`
        const [getData]=await db.execute(queryGet)
        if (getData?.length==0) {
            return res.status(404).status({msg:"not sales founded"})
        }
        return res.status(200).json({sales:getData})
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

const getSaleForProduct=async(req,res)=>{
    try {
        const {productID}=req.params;
        const queryProductID=`select * from products where productID=?`
        const [dataProductID]=await db.execute(queryProductID,[productID])
        if (dataProductID?.length==0) {
            return res.status(404).json({msg:"the productID u enterd not founded"})
        }

        const searchQ=`select productID as product_id,quantitySold as quantity_sold from sales where productID=?`
        const [dataSearch]=await db.execute(searchQ,[productID])
        if (dataSearch?.length==0) {
            return res.status(404).json({msg:"not found any sales"})
        }

        return res.status(200).json({data:dataSearch})
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

const totalQuantityForEachProduct=async(req,res)=>{
    try {
        const query=`select productID, sum(quantitySold) as totalQuantitySold from sales group by productID;`
        const [data]=await db.execute(query)
        if (data?.length==0) {
            return res.status(404).json({msg:"no data founded"})
        }
        res.status(200).json({data})
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

const getAllSalesIncludeProductName=async(req,res)=>{
    try {
        const query=`SELECT products.productName,sales.quantitySold,sales.saleDate from sales join products on sales.productID=products.productID;`
        const [data]=await db.execute(query)
        if (data?.length==0) {
            return res.status(404).json({msg:"no products founded"})
        }
        res.status(200).json({data})
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

module.exports={
    addSale,
    getAllSales,
    getSaleForProduct,
    totalQuantityForEachProduct,
    getAllSalesIncludeProductName
}