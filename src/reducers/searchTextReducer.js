import { SEARCH_TEXT } from "../constants/action-types"
const initialState = {
    data:[]
}
export const searchTextReducer = (state=initialState, action) => {
    switch (action.type) {
        case SEARCH_TEXT.SUCCESS:
            return {...state, data: action.payload._array}
        case SEARCH_TEXT.ERROR:
            return {...state, data: action.message}
        default:
            return state;
    }
}