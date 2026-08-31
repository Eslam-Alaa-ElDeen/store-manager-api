const { db } = require("../../database/connectDB.js");

const addSupplier = async (req, res) => {
  try {
    const { name, contactNumber } = req.body;
    const searchQ = `select contactNumber from suppliers where contactNumber=?`;
    const [dataSearch] = await db.execute(searchQ, [contactNumber]);
    if (dataSearch?.length) {
      return res
        .status(404)
        .json({ msg: "the phone u enterd already in exists" });
    }
    const query = `INSERT INTO suppliers (supplierName, contactNumber) VALUES (?, ?)`;
    const [data] = await db.execute(query, [name, contactNumber]);
    res.status(201).json({ msg: "user add successfuly" });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const getAllSuppliers = async (req, res) => {
  try {
    const query = `select * from suppliers`;
    const [data] = await db.execute(query);
    if (data?.length <= 0) {
      return res.status(404).json({ msg: "no suppliers on database" });
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const updateSupplier=async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contactNumber } = req.body;

    const searchQ = `select * from suppliers where supplierID=?`;
    const [data] = await db.execute(searchQ, [id]);
    if (data?.length == 0) {
      return res
        .status(404)
        .json({ msg: "The ID you entered does not match any supplier" });
    }
    const updateQ = `update suppliers set supplierName=?,contactNumber=? where supplierID=?`;

    const [dataUpdate] = await db.execute(updateQ, [name, contactNumber, id]);

    if (dataUpdate?.affectedRows == 0) {
      return res.status(404).json({ msg: "not updated" });
    }

    return res.status(200).json({ msg: "updated successfuly" });
  } catch (error) {
    return res.status(404).json(error.message)
  }
}

const deleteSupplier=async(req,res)=>{
    try {
        const {id}=req.params;
        const searchQ = `select * from suppliers where supplierID=?`;
        const [data] = await db.execute(searchQ, [id]);
        if (data?.length == 0) {
        return res
            .status(404)
            .json({ msg: "The ID you entered does not match any supplier" });
        }

        const deleteQ=`delete from suppliers where supplierID=?`
        const [dataDelete]=await db.execute(deleteQ,[id])
        res.status(200).json({msg:"supplier deleted successfuly"})
    } catch (error) {
        return res.status(404).json(error.message)
    }
}


const getAllDataStartsWithChar=async(req,res)=>{
  try {
    const {char}=req.params;
    const query=`select * from suppliers where supplierName like ?`
    const [data]=await db.execute(query,[`${char}%`])
    if (data?.length==0) {
      return res.status(404).json({msg:"not data founded"})
    }
    res.status(200).json({data})
  } catch (error) {
    return res.status(404).json(error.message)
  }
}


module.exports = {
  addSupplier,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier,
  getAllDataStartsWithChar
};
