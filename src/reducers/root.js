import {combineReducers} from "redux";
import {switchLanguageReducer} from "./switchLanguageReducer"

export const rootReducer = combineReducers({
    languages: switchLanguageReducer
})