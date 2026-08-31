const { db } = require("../database/connectDB.js");


const createUser = `
     create user if not exists 'store_manager'@'localhost'
     identified by '12345678';
`;

const grantPermissions = `
    GRANT SELECT, INSERT, UPDATE
    ON store_db.*
    TO 'store_manager'@'localhost'
`;

const revokeUpdate = `
    REVOKE UPDATE
    ON store_db.*
    FROM 'store_manager'@'localhost'
`;

const grantDelete = `
    GRANT DELETE
    ON store_db.*
    TO 'store_manager'@'localhost'
`;

async function run() {
    try {
        await db.execute(createUser);
        await db.execute(grantPermissions);
        await db.execute(revokeUpdate);
        await db.execute(grantDelete);

        console.log("done");
    } catch (error) {
        console.log(error);
    }
}

module.exports={
     run
}