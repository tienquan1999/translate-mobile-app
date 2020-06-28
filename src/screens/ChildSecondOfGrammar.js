import React, { useEffect, useState } from "react"
import Axios from "axios"
import {HOST} from "../constants/host_port"
import { WebView } from 'react-native-webview';

export default function ChildSecondOfGrammar(props) {
  const { id_sentence, id_sentence_child } = props.route.params;
  const [html, setHtml] = useState("")

  useEffect(() => {
    const API = id_sentence_child ? `http://${HOST}:3000/grammar/?id_sentence=${id_sentence}&id_sentence_child=${id_sentence_child}`
      : `http://${HOST}:3000/grammar/?id_sentence=${id_sentence}`;

    Axios.get(API)
      .then(
        res => {
          setHtml(res.data.data.grammar.content);
        }
      )
      .catch(err => console.log("err: ", err))
  }, [])
  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: html }}
    />
  )
}