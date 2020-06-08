const asyncActionType = (type) => ({
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`,
  });

export const SEARCH_TEXT = asyncActionType('SEARCH_TEXT');
export const SWITCH_LANGUAGE = asyncActionType('SWITCH_LANGUAGE');
export const CHANGE_LANGUAGE = asyncActionType('CHANGE_lANGUAGE')