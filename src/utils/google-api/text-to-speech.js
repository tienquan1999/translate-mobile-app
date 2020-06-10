import {apiKey} from "../../../key.json";
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
// const Sound = require('react-native-sound')


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
        let audioDir = FileSystem.documentDirectory + "audio/";
        let folder = await FileSystem.getInfoAsync(audioDir);
        if(!folder.exists){
          await FileSystem.makeDirectoryAsync(audioDir, {intermediates: true});
        }
        var path = audioDir + 'test.mp3';
        await FileSystem.writeAsStringAsync(path, result.data.audioContent, {
          encoding: FileSystem.EncodingType.Base64,

        });
        // let hello = new Sound(path, Sound.MAIN_BUNDLE, (error) => {
        //   if (error) {
        //     console.log(error)
        //   }
        // })

        // hello.play((success) => {
        //   if (!success) {
        //     console.log('Sound did not play')
        //   }
        // })
    }
    catch(e){
        console.warn(e.message)
    }
}


module.exports = {
    textToSpeechWithApiGoogle
}