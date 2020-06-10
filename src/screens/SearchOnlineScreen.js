import React, { useState } from "react";
import { StyleSheet, Text } from "react-native"
import { Content, Input, Button } from "native-base"
import BoxSwitchLanguage from "../components/BoxSwitchLanguage";
import { searchOnl } from "../actions/searchOnl"
import { connect } from "react-redux"

function SearchOnlineScreen(props) {

    const { wordMeaning } = props
    const { from, to } = props.languages;
    const { params } = props.route;

    const [textFrom, setTextFrom] = useState(params ? params.word : "");
    const [textTo, setTextTo] = useState(params ? params.mean : "");

    const translateOnline = async() => {
        await props.searchOnl(from, to, textFrom);
        setTextTo(wordMeaning.mean);
    }
    return (
        <Content padder style={styles.body}>
            <Input multiline={true} placeholder="Nhập để dịch" value={textFrom} style={styles.inputText} onChangeText={(value) => setTextFrom(value)} />
            <BoxSwitchLanguage />
            <Button style={styles.btnTranslate} onPress={translateOnline}>
                <Text style={styles.textBtn}>Dịch</Text>
            </Button>
            <Input multiline={true} value={textTo} style={styles.inputText} onChangeText={(value) => setTextTo(value)} />
        </Content>
    )
}
const styles = StyleSheet.create({
    body: {
        backgroundColor: '#ffffff'
    },
    inputText: {
        borderColor: "#0077b3",
        backgroundColor: "#ffffff",
        borderWidth: 2,
        borderRadius: 10,
        height: 50,
        marginVertical: 10,
        fontSize: 20
    },
    btnTranslate: {
        backgroundColor: "#0077b3",
        height: 50,
        width: 80,
        padding: 10,
        borderRadius: 10
    },
    textBtn: {
        color: "#ffffff",
        fontSize: 20
    }
})
const mapStateToProps = (state) => {
    return {
        wordMeaning: state.wordMeaning.data,
        languages: state.languages,
    }
}
const mapDispatchToProps = (dispatch) => ({
    searchOnl: (from, to, word) => dispatch(searchOnl(from, to, word))
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchOnlineScreen);