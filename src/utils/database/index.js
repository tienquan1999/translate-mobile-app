import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import {Asset} from "expo-asset";

async function connectToDatabase(dbName) {
    const internalDbName = dbName; // Call whatever you want
    const sqlDir = FileSystem.documentDirectory + "SQLite/";
    if (!(await FileSystem.getInfoAsync(sqlDir + internalDbName)).exists) {
        await FileSystem.makeDirectoryAsync(sqlDir, {intermediates: true});
        let module = dbName === "enToVi.db" ? require("../../assets/databases/enToVi.db") : require("../../assets/databases/viToEn.db");
        const asset = Asset.fromModule(module);
        await FileSystem.downloadAsync(asset.uri, sqlDir + internalDbName);
    }
    console.log("connect success")
    return SQLite.openDatabase(internalDbName);
}

module.exports = {
    connectToDatabase
};