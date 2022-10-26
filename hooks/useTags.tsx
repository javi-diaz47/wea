import { useEffect, useReducer } from "react";
import {
  tagsReducer,
  tagsReducerState,
  TAGS_INITIAL_STATE,
} from "../reducers/TagReducer";

const MIN_TAG_LENGTH = 3;

export interface TagsHandler {
  tags: Array<string>;
  onHandleTags: (tags: Array<string>) => void;
}

const useTags = ({ tags, onHandleTags }: TagsHandler) => {
  const [state, dispatch] = useReducer(tagsReducer, {
    ...TAGS_INITIAL_STATE,
    tags,
  });
  const onHandleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "on-change",
      payload: ev.target.value,
    });
  };

  useEffect(() => {
    onHandleTags(state.tags);
  }, [state.tags]);

  const onAddTag = () => {
    if (state.inputTag.length >= MIN_TAG_LENGTH) {
      dispatch({
        type: "add-tags",
      });
    }
  };

  const onRemoveTag = (payload) => {
    dispatch({
      type: "remove-tags",
      payload,
    });
  };
  return {
    state: state,
    onHandleChange,
    onAddTag,
    onRemoveTag,
  };
};

export { useTags };
