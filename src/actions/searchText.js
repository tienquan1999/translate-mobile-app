import {SEARCH_TEXT} from "../constants/action-types"
import { translateText } from "../utils/controller"

const searchTextSuccess = (data) => ({
  type: SEARCH_TEXT.SUCCESS,
  payload: data
})
const searchTextError = (message) => ({
  type: SEARCH_TEXT.ERROR,
  message: message
})

export const searchText = (from, to, word) => {
  return async dispatch => {
    const result = await translateText({
      from: from,
      to: to,
      word: word
    })
    console.log("result: ", result)
    dispatch(searchTextSuccess(result))
  }
}