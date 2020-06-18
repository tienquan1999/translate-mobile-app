const {connectToDatabase} = require("./database/index");
const {querySQLite} = require("./database/query");
const {translateWithGoogleApi} = require("./google-api/translate-api");
const formatResult = require("./format-result-translate");

async function translateText({from, to, word}){
    try{
        let start = Date.now();
        let db = await connectToDatabase("translate.db");
        word = word.replace(/\s\s+/g, ' ');
        let result = {};
        let query = "select * from historyTranslate where word = ? and fromLanguage = ? and toLanguage = ?;";
        result = await querySQLite({
            db,
            query,
            params: [word, from, to]
        })
        result = JSON.parse(result);
        if(result._array.length === 0 ){
            if(from === "en" && to === "vi" && word.split(" ").length <= 2){
                result = await translateEnToVi(word);
            } else if(from === "vi" && to === "en" && word.split(" ").length <= 2){
                result = await translateViToEn(word);
            }else{
                console.log("Online search");
                result.length = 0;
            }
            if(result.length === 0){
                result = await translateWithGoogleApi({from, to, word});
            }
            result = formatResult(result);
            query = "insert into historyTranslate(word, fromLanguage, toLanguage, result, time_update) values(?, ?, ?, ?, ?);";
            await querySQLite({
                db,
                query,
                params: [word, from, to, JSON.stringify(result), Date.now()]
            })
            query = "select count(*) as countWord from historyTranslate;"
            let countData = await querySQLite({
                db,
                query,
                params: []
            })
            console.log(JSON.parse(countData));
            if(JSON.parse(countData)._array[0].countWord >= 50){
                query = "DELETE FROM historyTranslate where id in (select id from historyTranslate ORDER BY time_update ASC limit 25);";
                await querySQLite({
                    db,
                    query,
                    params: []
                })
            }
        }else {
            result = JSON.parse(result._array[0].result);
        }
        console.log(Date.now() - start);
        return result;
    }
    catch(e){
        console.log(e);
    }
}
async function translateEnToVi(word){    
    try{
        let db = await connectToDatabase("enToVi.db");
        let query = "select * from word where word = ?;";
        let result = await querySQLite({db, query, params: [word]});
        result = JSON.parse(result);
        return result;
    }
    catch(e){
        throw e;
    }
}

async function translateViToEn(word){
    try{
        let db = await connectToDatabase("viToEn.db");
        let query = "select * from word where word = ? or word_ko_dau = ?";
        let result = await querySQLite({db, query, params: [word]});
        result = JSON.parse(result);
        return result;
    }
    catch(e){
        throw e;
    }
}

async function getHistoryTranslate(){
    try{
        let db = await connectToDatabase("translate.db");
        let query = "select * from historyTranslate order by time_update DESC limit 5;"
        let result = await querySQLite({
            db,
            query,
            params: []
        }) 
        console.log(JSON.parse(result));
    }
    catch(e){
        console.log(e);
    }
}


export {
    translateText,
    getHistoryTranslate
};