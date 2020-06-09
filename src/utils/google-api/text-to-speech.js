import {apiKey} from "../../../key.json";
import axios from 'axios';
// var RNFS = require('react-native-fs');

async function textToSpeechWithApiGoogle(text){
    try{
        let url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
        let body = {
          "input":{
            "text":"Android"
          },
          "voice":{
            "languageCode":"en-US",
            // "name":"en-GB-Standard-A",
            // "ssmlGender":"FEMALE"
          },
          "audioConfig":{
            "audioEncoding":"MP3"
          }
        }
        let result = await axios.post(url, body); 
        console.log(">>>>>>>>>>>>>>>>")
        var path = RNFS.DocumentDirectoryPath + '/test.mp3';
        // await RNFS.writeFile(path, result.data.audioContent, "base64");
        console.log("done");
    }
    catch(e){
        console.warn(e.message)
    }
}


module.exports = {
    textToSpeechWithApiGoogle
}