const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function connectToDatabase(dbName){
    const dbPath = path.resolve(__dirname, dbName)
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(dbPath, (err) => {
            if(err){
                reject(err)
            }
            resolve(db);
        })
    })
}


module.exports = {
    connectToDatabase
};