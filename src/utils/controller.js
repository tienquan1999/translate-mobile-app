const {connectToDatabase} = require("./database/index");
const {querySQLite} = require("./database/query");
const {translateWithGoogleApi} = require("./google-api/translate-api");
const formatResult = require("./format-result-translate");

async function translateText({from, to, word}){
    try{
        let db = await connectToDatabase("translate.db");
        word = word.replace(/\s\s+/g, ' ');
        let result = {};
        let query = "select * from historyTranslate where word = ? and fromLanguage = ? and toLanguage = ?;";
        result = await querySQLite({
            db,
            query,
            params: [word, from, to]
        })
        // db._db.close();
        result = JSON.parse(result);
        if(result._array.length === 0 ){
            if(from === "en" && to === "vi" && word.split(" ").length <= 2){
                result = await translateEnToVi(word);
            } else if(from === "vi" && to === "en" && word.split(" ").length <= 2){
                console.log("vi to en");
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
            if(JSON.parse(countData)._array[0].countWord >= 50){
                query = "DELETE FROM historyTranslate where id in (select id from historyTranslate ORDER BY time_update ASC limit 25);";
                await querySQLite({
                    db,
                    query,
                    params: []
                })
            }
            query = "select * from favoriteWord where word = ?;";
            let favoriteWords = await querySQLite({
                db,
                query,
                params: [word]
            })
            if(JSON.parse(favoriteWords)._array.length === 0){
                result.liked = false;
            }else{
                result.liked = true;
            }
        }else {
            query = "select * from favoriteWord where word = ?;";
            let favoriteWords = await querySQLite({
                db,
                query,
                params: [word]
            })
            if(JSON.parse(favoriteWords)._array.length === 0){
                result.liked = false;
            }else{
                result.liked = true;
            }
            query = "update historyTranslate set time_update = ?, result = ? where id = ?;";
            await querySQLite({
                db,
                query,
                params: [Date.now(), JSON.stringify(result), result._array[0].id]
            })
            result = JSON.parse(result._array[0].result);
        }
        return result;
    }
    catch(e){
        console.log(e);
        return {
            success: false,
            message: e.message
        }
    }
}
async function translateEnToVi(word){    
    try{
        let db = await connectToDatabase("enToVi.db");
        let query = "select * from word where word = ?;";
        let result = await querySQLite({db, query, params: [word]});
        result = JSON.parse(result);
        // db._db.close();
        // db._running = false;
        return result;
    }
    catch(e){
        console.log(e);
        return {
            success: false,
            message: e.message
        }
    }
}

async function translateViToEn(word){
    try{
        let db = await connectToDatabase("viToEn.db");
        let query = "select * from word where word = ? or word_ko_dau = ?";
        let result = await querySQLite({db, query, params: [word]});
        result = JSON.parse(result);
        // db._db.close();
        return result;
    }
    catch(e){
        console.log(e);
        return {
            success: false,
            message: e.message
        }
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
        result = JSON.parse(result)._array;
        result = result.map(e => {
            e.result = JSON.parse(e.result);
            e.result.id = parseInt(e.result.id);
            return e;
        });
        //db._db.close();
        return result;
    }
    catch(e){
        console.log(e);
        return {
            success: false,
            message: e.message
        }
    }
}

async function getFavoriteWord(){
    try{
        console.log("getFavoriteWord");
        let db = await connectToDatabase("translate.db");
        let query = "select * from favoriteWord order by id DESC;"
        let result = await querySQLite({
            db,
            query,
            params: []
        })
        result = JSON.parse(result)._array;
        // result = result.map(e => {
        //     e.result = JSON.parse(e.result);
        //     e.result.id = parseInt(e.result.id);
        //     return e;
        // });
        // db._db.close();
        return result;
    }   
    catch(e){
        console.log(e);
        return {
            success: false,
            message: e.message
        }
    }
}

async function addWordToFavoriteList(word){
    try{
        let db = await connectToDatabase("translate.db");
        let query = "insert into favoriteWord(word) values(?);"
        await querySQLite({
            db,
            query,
            params: [word]
        })

        // db._db.close();
    }
    catch(e){
        console.log(e);
        return {
            success: false,
            message: e.message
        }
    }
}

async function deleteWordFromFavoriteList(word){
    try{
        console.log("deleteWordFromFavoriteList", word)
        let db = await connectToDatabase("translate.db");
        let query = "delete from favoriteWord where word = ?;"
        await querySQLite({
            db,
            query,
            params: [word]
        })
        // db._db.close();
        console.log("deleteWordFromFavoriteList done");
    }
    catch(e){
        console.log(e);
        return {
            success: false,
            message: e.message
        }
    }
}

export {
    translateText,
    getHistoryTranslate,
    getFavoriteWord,
    addWordToFavoriteList,
    deleteWordFromFavoriteList
};