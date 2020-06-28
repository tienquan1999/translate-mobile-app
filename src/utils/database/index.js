import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import {Asset} from "expo-asset";
const {querySQLite} = require("./query");

async function connectToDatabase(dbName) {
    const internalDbName = dbName; // Call whatever you want
    const sqlDir = FileSystem.documentDirectory + "SQLite/";
    if(dbName === "viToEn.db"){
        await FileSystem.deleteAsync(sqlDir + internalDbName, {idempotent: true});
    }
    let db = await FileSystem.getInfoAsync(sqlDir + internalDbName);
    if (!db.exists && (dbName === "enToVi.db" || dbName === "viToEn.db")) {
        console.log("load file ");
        await FileSystem.makeDirectoryAsync(sqlDir, {intermediates: true});
        let module = dbName === "enToVi.db" ? require("../../assets/databases/enToVi.db") : require("../../assets/databases/viToEn.db");
        console.log(module);
        const asset = Asset.fromModule(module);
        await FileSystem.downloadAsync(asset.uri, sqlDir + internalDbName);
    }else if(!db.exists){
        console.log("init");
        let db = await SQLite.openDatabase(internalDbName);
        let query = "create table if not exists audio (id integer primary key AUTOINCREMENT, word text, path text);"
        await createTable({db, query})
        query = "create table if not exists historyTranslate (id integer primary key AUTOINCREMENT, word text, fromLanguage text, toLanguage text, result text, time_update text);"
        await createTable({db, query});
        query = "create table if not exists favoriteWord (id integer primary key AUTOINCREMENT, word text);"
        await createTable({db, query});
        query = "create index audioIndex on audio(word); create index historyIndex on historyTranslate(word);create index wordIndex on favoriteWord(word);"
        await querySQLite({
            db, query, params: []
        })
        // db._db.close();
        console.log("here");
    }
    return await SQLite.openDatabase(internalDbName);
}

function createTable({db, query}){
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
              tx.executeSql(query, null, () => {
                resolve();
              });
            },
            (e) => {
                console.log(e);
                reject(e);
            });
    })
}

export {
    connectToDatabase
};