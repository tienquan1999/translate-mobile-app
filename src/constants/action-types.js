const asyncActionType = (type) => ({
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`,
  });

export const SEARCH_TEXT = asyncActionType('SEARCH_TEXT');
