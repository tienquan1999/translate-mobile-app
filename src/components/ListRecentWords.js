import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Button, Text} from "react-native";

import IconEarth from 'react-native-vector-icons/MaterialCommunityIcons'

import CardWord from "./CardWord";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Audio} from "expo-av";
import * as Permissions from 'expo-permissions';
import * as FileSystem from "expo-file-system";
const {apiKey} = require("../../key.json");
const axios = require("axios");
import {getHistoryTranslate} from "../utils/controller"

const recordingOptions = {
  // android not currently in use. Not getting results from speech to text with .m4a
  // but parameters are required
  android: {
    extension: '.mp3',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
      extension: '.wav',
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
  },
};

export default function ListRecentWords(props) {
  const [recentWords, setRecentWords] = useState([
    // { word: "cat", proper: "danh tu", mean: "mèo", id: "2" },
    // { word: "dog", proper: "danh tu", mean: "chó", id: "3" },
    // { word: "dog", proper: "danh tu", mean: "chó", id: "4" },
  ]
  );
  const [textFromSpeech, updateTextFromSpeech] = useState("");
  const [recording, updateRecording] = useState(null);
  const [isRecording, updateIsRecording] = useState(false);
  const [isFetching, updateIsFetching] = useState(false);
  useEffect(() => {
    async function getRecentWords(){
      let words = await getHistoryTranslate();
      setRecentWords(words);
    }
    getRecentWords();
  }, [])
  async function startRecording(){
    console.log("Start recording");
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        if (status !== 'granted') return;

        await updateIsRecording(true);

        await Audio.setAudioModeAsync({
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
        });
        const data = new Audio.Recording();
        try {
            await data.prepareToRecordAsync(recordingOptions);
            await data.startAsync();
        } catch (error) {
            console.log(error);
            this.stopRecording();
        }
        await updateRecording(data);
  }

  async function stopRecording(){
    console.log("Stop recording");
    await updateIsRecording(false);
    try {
        await recording.stopAndUnloadAsync();
    } catch (error) {
        // Do nothing -- we are already unloaded.
    }
  }

  async function getTranscription(){
    // this.setState({ isFetching: true });
    try {
        console.log("Get transcription")
        const info = await FileSystem.getInfoAsync(recording.getURI());
        const uri = info.uri;
        let base64_file = await  FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64
        });;
        let url = `https://speech.googleapis.com/v1p1beta1/speech:recognize?key=${apiKey}`;
        let body = {
          audio: {
            content: base64_file
          },
          config: {
            "encoding": "MP3",
            "sampleRateHertz": 16000,
            "languageCode": "vi-VN",
            "alternativeLanguageCodes": ['es-ES', 'en-US'],
          }
        }
        let response = await axios.post(url, body);
        console.log(response.data.results);
        updateTextFromSpeech(response.data.results[0].alternatives[0].transcript || "Something when wrong.")
    } catch(error) {
        console.log('There was an error reading file', error);
        // this.stopRecording();
        // this.resetRecording();
    }
    // this.setState({ isFetching: false });
}

  async function handleOnPressIn(){
    //await startRecording();
  }

  async function handleOnPressOut(){
    //await stopRecording();
    //await getTranscription();
  }

  return (
    <View style={styles.body}>
      <Text style={styles.titleList}>Từ tìm kiếm gần đây</Text>
      <FlatList
        horizontal={true}
        data={recentWords}
        renderItem={({ item }) => (
          <CardWord item={item} nav={props.navigation} key/>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Click me" onPress={async () => {
        console.log("Click me");
        await getHistoryTranslate();
      }} />
      <View style={styles.viewBtn}>
        <IconEarth.Button name="earth" color="#0088cc" backgroundColor="#ffffff" size={30}
          onPress={() => props.navigation.navigate('SearchOnline')}>
          <Text style={styles.btnText}>Dịch Online</Text>
        </IconEarth.Button>
      </View>
      <TouchableOpacity style={styles.button} onPressIn={handleOnPressIn} onPressOut={handleOnPressOut}>
        <Text>Press on and Hold to start recording</Text>
      </TouchableOpacity>

      <View>
        <Text>This is text from speech: {textFromSpeech}</Text>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  body: {
    margin: 5
  },
  titleList: {
    color: "#004466",
    fontSize: 17,
    fontWeight: "bold"
  },
  viewBtn:{
    marginVertical:5
  },
  btn:{
    backgroundColor:"#ffffff",
    textAlign:"left"
  },
  btnText: {
    fontSize: 16,
    color:"#000000"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
})
