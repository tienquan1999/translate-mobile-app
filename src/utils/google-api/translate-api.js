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
        return result.data.data.translations;
    }
    catch(e){
        throw e;
    }
}

module.exports = {
    translateWithGoogleApi
}
