const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const client = new textToSpeech.TextToSpeechClient();

async function textToSpeechWithApiGoogle(text, language) {

    const request = {
        input: {text: text},
        // Select the language and SSML voice gender (optional)
        voice: {languageCode: language, ssmlGender: 'NEUTRAL'},
        // select the type of audio encoding
        audioConfig: {audioEncoding: 'MP3'},
    };
    let path = `../../assets/audio/${language}/` + Math.random().toString(36).substring(8) + ".mp3";
    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(path, response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
    return path;
}

module.exports = {
    textToSpeechWithApiGoogle
}