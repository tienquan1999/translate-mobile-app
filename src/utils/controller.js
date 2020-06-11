const {connectToDatabase} = require("./database/index");
const {querySQLite} = require("./database/query");
const {translateWithGoogleApi} = require("./google-api/translate-api");
const formatResult = require("./format-result-translate");

async function translateText({from, to, word}){
    try{
        word = word.replace(/\s\s+/g, ' ');
        let result = {};
        if(from === "en" && to === "vi" && word.split(" ").length <= 2){
            result = await translateEnToVi(word);
        } else if(from === "vi" && to === "en" && word.split(" ").length <= 2){
            result = await translateViToEn(word);
        }else{
            result.length = 0;
        }
        if(result.length === 0){
            result = await translateWithGoogleApi({from, to, word});
        }
        return formatResult(result);
    }
    catch(e){
        throw e;
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


export {
    translateText
};