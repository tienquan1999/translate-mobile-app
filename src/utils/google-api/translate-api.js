const {projectId, apiKey} = require("../../../key.json");
import axios from 'axios';


async function translateWithGoogleApi({from, to, word}){
    try{
        let params = {
                q: word,
                target: to,
                source: from,
                key: apiKey
            }
        let url = 'https://translation.googleapis.com/language/translate/v2';
        console.log("oke");
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        // let result = await axios.post('https://translation.googleapis.com/language/translate/v2', null, {
        //     params: {
        //         q: word,
        //         target: to,
        //         source: from,
        //         key: apiKey
        //     }
        // })
        let result = await fetch(url, {
            method: "POST",
        })
        console.log(result);
        return result.data.data.translations;
    }
    catch(e){
        throw e;
    }
}

module.exports =  {
    translateWithGoogleApi
}
