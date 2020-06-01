const {textToSpeechWithApiGoogle} = require("../../utils/google-api/text-to-speech");

async function test(){
    let text = "What";
    let language = "en-UK";
    let file = await textToSpeechWithApiGoogle(text, language);
    console.log(file);
}

test();