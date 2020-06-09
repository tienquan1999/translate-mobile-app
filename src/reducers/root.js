import {combineReducers} from "redux";
import {searchTextReducer} from "./searchTextReducer"
import {switchLanguageReducer} from "./switchLanguageReducer"

export const rootReducer = combineReducers({
    wordMeaning: searchTextReducer,
    languages: switchLanguageReducer
})