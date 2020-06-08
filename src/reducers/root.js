import {combineReducers} from "redux";
import {searchTextReducer} from "./searchTextReducer"
import {switchLanguageReducer} from "./switchLanguageReducer"

export const rootReducer = combineReducers({
    words: searchTextReducer,
    languages: switchLanguageReducer
})