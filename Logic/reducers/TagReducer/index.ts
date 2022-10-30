export type tagsReducerState = {
  tags: Array<string>;
  inputTag: string;
};

export type tagsReducerAction =
  | {
      type: "on-change";
      payload: string;
    }
  | {
      type: "add-tags";
    }
  | {
      type: "remove-tags";
      payload: string;
    };

export const TAGS_INITIAL_STATE: tagsReducerState = {
  tags: [],
  inputTag: "",
};

export const tagsReducer = (
  state: tagsReducerState,
  action: tagsReducerAction
): tagsReducerState => {
  switch (action.type) {
    case "on-change": {
      return {
        ...state,
        inputTag: action.payload,
      };
    }
    case "add-tags": {
      return {
        ...state,
        tags: [...state.tags, state.inputTag],
        inputTag: "",
      };
    }
    case "remove-tags": {
      const newTags = state.tags.filter((tag) => tag !== action.payload);

      return {
        tags: newTags,
        inputTag: "",
      };
    }
  }
};
