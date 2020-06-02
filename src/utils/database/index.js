import * as SQLite from 'expo-sqlite';

function connectToDatabase(dbName){
    return new Promise((resolve, reject) => {
        let db = SQLite.openDatabase(dbName);
        resolve(db);
    })
}

let data = connectToDatabase("en_vi_full_json.db");
console.log(data);

module.exports = {
    connectToDatabase
};