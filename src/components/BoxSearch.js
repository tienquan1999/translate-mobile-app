import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableHighlight, TouchableWithoutFeedback, View, Modal, Text, Button, TouchableOpacity } from "react-native"
import { Icon, Item, Input, Header } from "native-base"
import { connect } from "react-redux";
import { translateText } from "../utils/controller"

import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Audio } from "expo-av";
import * as Permissions from 'expo-permissions';
import * as FileSystem from "expo-file-system";
const { apiKey } = require("../../key.json");
const axios = require("axios");
import { useFocusEffect } from '@react-navigation/native';
import { LANGUAGE, TYPE_NOTICE_LANGUAGE } from "../constants/languages"

const recordingOptions = {
  android: {
    extension: '.m4a',
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

function BoxSearch(props) {

  const [textSearch, setText] = useState("");
  let { from, to } = props.languages;
  const [modalVisible, setModalVisible] = useState(false);
  const [recording, updateRecording] = useState(null);
  const [isRecording, updateIsRecording] = useState(false);
  const [textSound, setTextSound] = useState("")
  const [curLan, setCurLan] = useState("")
  const [notice, setNotice] = useState("")

  const getLanguageCurrent = () => {
    let tmp = LANGUAGE.find(e => e.value === from)
    let tmpNotice = TYPE_NOTICE_LANGUAGE.find(e => e.value === from)
    setNotice(tmpNotice.label);
    setCurLan(tmp.label);
  }
  const goToWord = async () => {
    const result = await translateText({
      from: from,
      to: to,
      word: textSearch
    })

    if (result.type === "offline")
      props.navigation.navigate("Word", { wordMeaning: result });
    else {
      props.navigation.navigate("SearchOnline", { wordMeaning: result })
    }

  }
  const goToWordUseVoice = async (textSearch) => {
    setTextSound("");
    const result = await translateText({
      from: from,
      to: to,
      word: textSearch
    })

    if (result.type === "offline")
      props.navigation.navigate("Word", { wordMeaning: result });
    else {
      props.navigation.navigate("SearchOnline", { wordMeaning: result })
    }

  }
  const handleClear = () => {
    setText("")
  }
  const showModal = () => {
    setModalVisible(true);
  }
  const hideModal = () => {
    setModalVisible(false);
  }

  async function startRecording() {
    console.log("Start recording");
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') return;

    //await updateIsRecording(true);

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

  async function stopRecording() {
    console.log("Stop recording");
    await updateIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
  }

  async function getTranscription() {
    // this.setState({ isFetching: true });
    try {
      console.log("Get transcription")
      const info = await FileSystem.getInfoAsync(recording.getURI());
      const uri = info.uri;

      const soundObject = new Audio.Sound();
      await soundObject.loadAsync({
        uri: uri
      });
      await soundObject.setVolumeAsync(1.0)
      await soundObject.playAsync();
      console.log("play audio done")

      let base64_file = await FileSystem.readAsStringAsync(uri, {
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
      let word = response.data.results[0].alternatives[0].transcript;
      setTextSound(word)
      hideModal();
      goToWordUseVoice(word);
    } catch (error) {
      console.log('There was an error reading file', error);
      // this.stopRecording();
      // this.resetRecording();
    }
    // this.setState({ isFetching: false });
  }
  useFocusEffect(
    React.useCallback(() => {


      return () => {
        handleClear();
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  useEffect(() => {
    getLanguageCurrent();
  }, [from])
  async function handleOnPressIn() {
    await startRecording();
  }

  async function handleOnPressOut() {
    await stopRecording();
    await getTranscription();
  }

  return (
    <Header searchBar rounded style={styles.header}>
      <Item style={styles.boxSearch}>
        <Ionicons name="md-search" size={25} color="gray" style={{ paddingLeft: 10 }} />
        <Input autoFocus={false} placeholder="Nhập từ cần tra " value={textSearch} onChangeText={(text) => setText(text)} onSubmitEditing={goToWord} />
        {textSearch !== "" && <Ionicons name="md-close-circle-outline" size={30} style={styles.iconClose} onPress={handleClear} />}
      </Item>
      <FontAwesome5 name="microphone" size={25} style={styles.iconMic} onPress={showModal}></FontAwesome5>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Ionicons name="md-close-circle-outline" size={30} color="#bfbfbf" onPress={hideModal} />
            </View>
            <View style={styles.modalBody}>
              <TouchableOpacity onPressIn={handleOnPressIn} onPressOut={handleOnPressOut}>
                <FontAwesome5 name="microphone" size={100} color="#0077b3"></FontAwesome5>
              </TouchableOpacity>
              <Text style={styles.structure}>{notice}</Text>
              {
                textSound !== "" ? <Text style={styles.textSound}>{textSound}</Text> : null
              }
            </View>
            <View style={styles.modalFooter}>
              <Text style={styles.titleLanguage}>{curLan}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </Header>
  )
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0077b3",
    alignItems: "center",
    justifyContent: "space-around"
  },
  boxSearch: {
    borderColor: '#0077b3',
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  iconMic: {
    color: "#ffffff",
    paddingLeft: 10
  },
  iconClose: {
    color: "#0077b3",
    paddingRight: 15
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    elevation: 2
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,

    height: 250,
    width: 250,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalHeader: {
    padding: 5,
    height: 40,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  modalBody: {
    position: "absolute",
    top: 40,
    right: 0,
    left: 0,
    bottom: 20,
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  structure: {
    flexWrap: "wrap",
    marginVertical: 10,
    textAlign: "center",
  },
  titleLanguage: {
    fontSize: 12,
    color: "#bfbfbf",
    paddingBottom: 10
  },
  modalFooter: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  textSound: {
    fontSize: 18
  }
})

const mapStateToProps = (state) => {
  return {
    languages: state.languages,
  }
}
const mapDispatchToProps = (dispatch) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(BoxSearch)