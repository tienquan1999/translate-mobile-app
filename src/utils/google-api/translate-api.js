const {projectId, apiKey} = require("../../../key.json");
const {Translate} = require("@google-cloud/translate").v2;

async function translateWithGoogleApi({from, to, word}){
    try{
        const translate = new Translate({projectId, key: apiKey});
        const result = await translate.translate(word, to);
        return result;
    }
    catch(e){
        throw e;
    }
}

module.exports = {
    translateWithGoogleApi
}
