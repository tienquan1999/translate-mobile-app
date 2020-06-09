import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import {Asset} from "expo-asset";

async function connectToDatabase(dbName) {
    const internalDbName = dbName; // Call whatever you want
    const sqlDir = FileSystem.documentDirectory + "SQLite/";
    let db = await FileSystem.getInfoAsync(sqlDir + internalDbName);
    console.log(db);
    if (!db.exists) {
        console.log("load file ");
        await FileSystem.makeDirectoryAsync(sqlDir, {intermediates: true});
        let module = dbName === "enToVi.db" ? require("../../assets/databases/enToVi.db") : require("../../assets/databases/viToEn.db");
        const asset = Asset.fromModule(module);
        await FileSystem.downloadAsync(asset.uri, sqlDir + internalDbName);
    }
    console.log("connect success")
    return await SQLite.openDatabase(internalDbName);
}

export {
    connectToDatabase
};