import {apiKey} from "../../../key.json";
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';


async function textToSpeechWithApiGoogle(text){
    try{
        let url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
        let body = {
          "input":{
            "text":text
          },
          "voice":{
            "languageCode":"en-UK",
            // "name":"en-GB-Standard-A",
            "ssmlGender":"FEMALE"
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
        const soundObject = new Audio.Sound();
        try {
          console.log(path);
          await soundObject.loadAsync({
            uri: path
          });
          await soundObject.setVolumeAsync(1.0)
          await soundObject.playAsync();
          // Your sound is playing!
        } catch (error) {
          console.log("err  play soud ", error.message);
        }
        console.log("Done");
    }
    catch(e){
        console.warn(e.message)
    }
}


module.exports = {
    textToSpeechWithApiGoogle
}