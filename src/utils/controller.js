let {connectToDatabase} = require("./database/index");
let {findOne} = require("./database/query");

async function translate({from, to, word}){
    try{
        word = word.replace(/\s\s+/g, ' ');
        if(word.split(" ").length){
            if(from === "en" && to === "vi"){
                let result = await translateEnToVi(word);
                return result;
            } else if(from === "vi" && to === "en"){
                let result = await translateViToEn(word);
                return result;
            }else{

            }
        }
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
    translate
}