import { SEARCH_TEXT } from "../constants/action-types"
const initialState = {
    wordMeaning: ""
}
export const searchTextReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_TEXT.SUCCESS:
            return { ...state, wordMeaning: action.payload }
        case SEARCH_TEXT.ERROR:
            return { ...state, wordMeaning: "No result!", errorMessage }
        default:
            return state;
    }
}