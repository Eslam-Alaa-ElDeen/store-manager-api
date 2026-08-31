const { db } = require("../../database/connectDB.js");


const addProduct=async(req,res)=>{
    try {
        const{name,price,stockQuantity,supplierID}=req.body;
        const queryAdd=`insert into products(productName,price,stockQuantity,supplierID) values(?,?,?,?)`;
        const [data]=await db.execute(queryAdd,[name,price,stockQuantity,supplierID])
        if (data?.affectedRows==0) {
            return res.status(200).json({mag:"error happend on insert"})
        }
        return res.status(200).json({msg:"product added successfuly"})
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

const getAllProduct=async(req,res)=>{
    try {
        const queryGet=`select * from products`
        const [data]=await db.execute(queryGet)
        if (data?.length==0) {
            return res.status(404).json({msg:"no products founded"})
        }
        return res.status(200).json({products:data})
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

const getProductByID=async(req,res)=>{
    try {
        const {id}=req.params;
        const queryGet=`select * from products where productID=?`
        const [data]=await db.execute(queryGet,[id])
        if (data?.length==0) {
            return res.status(404).json({msg:"no products founded"})
        }
        return res.status(200).json({product:data})
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

const updateProduct=async(req,res)=>{
    try {
        const{id}=req.params;
        const {productName,price,stockQuantity,supplierID}=req.body;
        
        const querySearchForSupplier=`select * from suppliers where supplierID=?`
        const[dataSupplier]=await db.execute(querySearchForSupplier,[supplierID])
        if (dataSupplier?.length==0) {
            return res.status(404).json({msg:"the supplier u enterd dosn't exist"})
        }

        const queryUpdate=`update products set productName=?,price=?,stockQuantity=?,supplierID=? where productID=? `
        const [dataUpdata]=await db.execute(queryUpdate,[productName,price,stockQuantity,supplierID,id])

        if (dataUpdata?.length==0) {
            return res.status(404).json({msg:"product not updated"})
        }
        return res.status(200).json({msg:"product updated successfuly"})
    } catch (error) {
        return res.status(404).json(error.message)
    }

}

const deleteProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const queryDelete=`delete from products where productID=?`
        const [dataDelete]=await db.execute(queryDelete,[id])
        if (dataDelete?.affectedRows==0) {
            return res.status(404).json({msg:"product not deleted ---> check the id again "})
        }
        res.status(200).json({msg:"product deleted successfuly"})
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

const updateProductPrice=async(req,res)=>{
    try {
        const {productName,price}=req.body;
        
        const queryUpdate=`update products set price=? where productName=? `
        const [dataUpdata]=await db.execute(queryUpdate,[price,productName])

        if (dataUpdata?.length==0) {
        return res.status(404).json({msg:"product not updated"})
        }
        return res.status(200).json({msg:"product price updated successfuly"})
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

const deleteByNameOfProduct=async(req,res)=>{
    try {
        const {name}=req.params;
        const queryDelete=`delete from products where productName=?`
        const [dataDelete]=await db.execute(queryDelete,[name])
        if (dataDelete?.affectedRows==0) {
            return res.status(404).json({msg:"product not deleted ---> check the name again "})
        }
        res.status(200).json({msg:`product: ${name} deleted successfuly`})
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

const getMaxProductQuantitiy=async(req,res)=>{
    try {
        const query=`select stockQuantity,productName from products order by stockQuantity DESC limit 1;`
        const [data]=await db.execute(query)
        if (data?.length==0) {
            return res.status(404).json({msg:"no products founded"})
        }
        res.status(200).json({data})   
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

const getAllProductsNotSold=async(req,res)=>{
    try {
        const query=`select products.* FROM products LEFT JOIN sales on products.productID=sales.productID WHERE sales.productID is null;`
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
    addProduct,
    getAllProduct,
    getProductByID,
    updateProduct,
    deleteProduct,
    updateProductPrice,
    deleteByNameOfProduct,
    getMaxProductQuantitiy,
    getAllProductsNotSold
}