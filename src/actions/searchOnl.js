import {SEARCH_ONL} from "../constants/action-types"
import { translateWithGoogleApi } from "../utils/google-api/translate-api"

const searchOnlSuccess = (data) => ({
  type: SEARCH_ONL.SUCCESS,
  payload: data
})
const searchOnlError = (message) => ({
  type: SEARCH_ONL.ERROR,
  message: message
})

export const searchOnl = (from, to, word) => {
  return async dispatch => {
    const result = await translateWithGoogleApi({
      from: from,
      to: to,
      word: word
    })
    dispatch(searchOnlSuccess(result))
  }
}