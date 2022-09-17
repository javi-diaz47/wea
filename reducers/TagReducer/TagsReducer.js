export const TAGS_INITIAL_STATE = {
  tags: [],
  inputTag: '',
};

export const TAGS_ACTION_TYPES = {
  ON_WRITE: 'ON_WRITE',
  ADD_TAGS: 'ADD_TAGS',
  REMOVE_TAGS: 'REMOVE_TAGS',
};

// Reducer Object
export const reducerObject = (state, payload) => ({
  [TAGS_ACTION_TYPES.ADD_TAGS]: {
    ...state,
    tags: payload,
    inputTag: '',
  },
  [TAGS_ACTION_TYPES.REMOVE_TAGS]: {
    ...state,
    tags: payload,
  },
  [TAGS_ACTION_TYPES.ON_WRITE]: {
    ...state,
    inputTag: payload,
  },
});

// Reducer
export const tagsReducer = (state, action) =>
  reducerObject(state, action.payload)[action.type] || state;
