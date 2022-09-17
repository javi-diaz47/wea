import { MAX_OFFER_TAGS_LENGTH } from '../../utils/constants';
import { TAGS_ACTION_TYPES } from './TagsReducer';

export const onWrite = ({ dispatch, value }) =>
  dispatch({ type: TAGS_ACTION_TYPES.ON_WRITE, payload: value.trim() });

export const onAddTag = ({ dispatch, tags, value }) => {
  const newTags = [...tags];
  newTags.push(value.slice(0, -1));
  dispatch({ type: TAGS_ACTION_TYPES.ADD_TAGS, payload: newTags });
};

export const onRemoveTag = ({ dispatch, tags, value }) => {
  const newTags = tags.filter((v) => v !== value);
  dispatch({ type: TAGS_ACTION_TYPES.REMOVE_TAGS, payload: newTags });
};

export const onChangeTag = ({ ev, tags, dispatch }) => {
  const {
    target: { value },
  } = ev;
  if (
    value.includes(' ') &&
    value.length > 1 &&
    tags.length < MAX_OFFER_TAGS_LENGTH
  ) {
    onAddTag({ dispatch, tags, value });
  } else {
    onWrite({ dispatch, value });
  }
};
