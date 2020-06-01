let {connectToDatabase} = require("./database/index");
let {findOne} = require("./database/query");
let {translateWithGoogleApi} = require("./google-api/translate-api");

async function translateText({from, to, word}){
    try{
        word = word.replace(/\s\s+/g, ' ');
        let result
        if(from === "en" && to === "vi"){
            result = await translateEnToVi(word);
        } else if(from === "vi" && to === "en"){
            result = await translateViToEn(word);
        }
        if(result === undefined){
            result = await translateWithGoogleApi({from, to, word});
        }
        return result;
    }
    catch(e){
        throw e;
    }
}

async function translateEnToVi(word){
    try{
        let db = await connectToDatabase("en_vi_full_json.db");
        let query = "select * from word where word = ?";
        let result = await findOne({db, query, params: [word]});
        return result;
    }
    catch(e){
        throw e;
    }
}

async function translateViToEn(word){
    try{
        let db = await connectToDatabase("vi_en_full_2.db");
        let query = "select * from word where word = ? or word_ko_dau = ?";
        db.get(query, [word, word], (err, row) => {
            if(err){
                throw err;
            }
            return row;
        });
        let result = await findOne({db, query, params: [word, word]});
        return result;
    }
    catch(e){
        throw e;
    }
}


module.exports = {
    translateText
}