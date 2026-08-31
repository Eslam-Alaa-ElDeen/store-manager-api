const mysql=require("mysql2/promise")

let db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "store_db",
  queueLimit: 0,
  waitForConnections: true,
  connectionLimit: 4,
});

async function connectDB(app,port) {
  try {
    const [data] = await db.execute(`select 1+1 as res`);
    app.listen(port, () => {
      console.log(`server is runnig at port ${port}`);
    });
    console.log("connect to DB succ");
  } catch (error) {
    console.log("fail to connect to DB");
  }
}

module.exports = {
  connectDB,
  db,
};
