import {apiKey} from "../../../key.json";
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
const {connectToDatabase} = require("../database/index");
const {querySQLite} = require("../database/query");
const voiceData = require("../../assets/voices.json");

async function textToSpeechWithApiGoogle(text, languageCode, gender){
    try{
      console.log(text, languageCode)
      let path = "";
      let db = await connectToDatabase("translate.db");
      let query = "select * from audio where word = ?;"
      let result = await querySQLite({db, query, params: [text]});
      result = JSON.parse(result);
      if(result.length == 0){
        let voice = voiceData.voices.find((e) => {
          return e.languageCodes[0].split("-")[0] === languageCode;
        })
        let url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
        let body = {
          "input":{
            "text": text
          },
          "voice": {
            "languageCode": voice.languageCodes[0],
            "name": voice.name,
            "ssmlGender": voice.ssmlGender
          },
          "audioConfig":{
            "audioEncoding":"MP3"
          }
        }
        let response;
        try{
          response = await axios.post(url, body); 
          console.log("down load audio done")
        }
        catch(e){
          console.log(e);
        }
        let audioDir = FileSystem.documentDirectory + "audio/";
        let folder = await FileSystem.getInfoAsync(audioDir);
        if(!folder.exists){
          await FileSystem.makeDirectoryAsync(audioDir, {intermediates: true});
        }
        if(response !== undefined){
          path = audioDir + Math.random().toString(36).substring(8) + ".mp3";
          await FileSystem.writeAsStringAsync(path, response.data.audioContent, {
            encoding: FileSystem.EncodingType.Base64,
          });
          query = "insert into audio(word, path) values(?, ?);";
          await querySQLite({
            db,
            query,
            params: [text, path]
          })
        }
      }else{
        path = result._array[0].path;
      }
      if(path){
        const soundObject = new Audio.Sound();
        try {
          await soundObject.loadAsync({
            uri: path
          });
          await soundObject.setVolumeAsync(1);
          await soundObject.playAsync();
          console.log("play audio done")
        } catch (error) {
          console.log("err  play soud ", error.message);
        }
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