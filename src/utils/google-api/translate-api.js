const {projectId, apiKey} = require("../../../key.json");
import axios from 'axios';


async function translateWithGoogleApi({from, to, word}){
    try{
        let result = await axios.post('https://translation.googleapis.com/language/translate/v2', null, {
            params: {
                q: word,
                target: to,
                source: from,
                key: apiKey
            }
        })
        console.log("return data");
        return {
            mean: result.data.data.translations[0].translatedText,
            word: word,
            from: from,
            to: to
        };
    }
    catch(e){
        throw e;
    }
}

module.exports =  {
    translateWithGoogleApi
}
