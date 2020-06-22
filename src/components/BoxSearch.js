import React, { useState } from "react";
import { StyleSheet, TouchableHighlight, TouchableWithoutFeedback, View, Modal, Text, Button, TouchableOpacity } from "react-native"
import { Icon, Item, Input, Header } from "native-base"
import { connect } from "react-redux";
import { translateText } from "../utils/controller"
import IconClose from "react-native-vector-icons/FontAwesome";
import { Audio } from "expo-av";
import * as Permissions from 'expo-permissions';
import * as FileSystem from "expo-file-system";
const { apiKey } = require("../../key.json");
const axios = require("axios");
import { useFocusEffect } from '@react-navigation/native';


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
  const [searchFocus, setSearchFocus] = useState(false)

  const goToWord = async () => {
    const result = await translateText({
      from: from,
      to: to,
      word: textSearch
    })
    
    if (result.type === "offline")
      props.navigation.navigate("Word", { wordMeaning: result });
    else
      props.navigation.navigate("SearchOnline", { wordMeaning: result })
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
      let word = response.data.results[0].alternatives[0].transcript
      setText(word);
      goToWord();
    } catch (error) {
      console.log('There was an error reading file', error);
      // this.stopRecording();
      // this.resetRecording();
    }
    // this.setState({ isFetching: false });
  }
  useFocusEffect(
    React.useCallback(() => {

      setSearchFocus(true)
      return () => {
        handleClear();
        setSearchFocus(false)
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [searchFocus])
  );
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
        <Icon name="search" />
        <Input autoFocus={searchFocus} placeholder="Search" value={textSearch} onChangeText={(text) => setText(text)} onSubmitEditing={goToWord} />
        {textSearch !== "" && <Icon name="close" style={styles.iconClose} onPress={handleClear} />}
      </Item>
      <Icon name="mic" style={styles.iconMic} onPress={showModal}></Icon>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <IconClose name="close" size={25} color="#bfbfbf" onPress={hideModal} />
            </View>
            <View style={styles.modalBody}>
              <TouchableOpacity onPressIn={handleOnPressIn} onPressOut={handleOnPressOut}>
                <Icon name="mic" style={{ fontSize: 100 }}></Icon>
              </TouchableOpacity>
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
    padding: 10,
    height: 50,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  modalBody: {
    position: "absolute",
    top: 60,
    right: 0,
    left: 0,
    bottom: 0,
    // borderColor: "red",
    // borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
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