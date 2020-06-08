import { SWITCH_LANGUAGE, CHANGE_LANGUAGE } from "../constants/action-types"
import { ACTION_LANGUAGE } from "../constants/languages"

const switchLanguageSuccess = (data) => ({
  type: SWITCH_LANGUAGE.SUCCESS,
  payload: data
})
const switchLanguageError = (message) => ({
  type: SWITCH_LANGUAGE.ERROR,
  message: message
})
const changeLanguageSuccess = (data) => ({
  type: CHANGE_LANGUAGE.SUCCESS,
  payload: data
})
const changeLanguageError = (message) => ({
  type: CHANGE_LANGUAGE.ERROR,
  message: message
})
export const switchLanguage = (from, to, action) => {
  return dispatch => {
    if (action === ACTION_LANGUAGE.SWITCH)
      dispatch(switchLanguageSuccess({ from: to, to: from }))
    if (action === ACTION_LANGUAGE.CHANGE)
    {
      dispatch(changeLanguageSuccess({ from: from, to: to }))
    }
  }
}