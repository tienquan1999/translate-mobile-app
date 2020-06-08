import {SWITCH_LANGUAGE, CHANGE_LANGUAGE} from "../constants/action-types"

const initialState={
    from: "en",
    to:"vi"
}
export const switchLanguageReducer = (state = initialState, action) =>{
    switch(action.type){
        case SWITCH_LANGUAGE.SUCCESS:
            return {...state, from: action.payload.from, to: action.payload.to}
        case SWITCH_LANGUAGE.ERROR:
            return {...state, message: action.message}
        case CHANGE_LANGUAGE.SUCCESS:
            return {...state, from: action.payload.from, to: action.payload.to}
        default:
            return state;
    }
}
