import { useReducer } from 'react';
import {
  onChangeTag,
  onRemoveTag,
} from '../../reducers/TagReducer/actionCreators';
import {
  tagsReducer,
  TAGS_INITIAL_STATE,
} from '../../reducers/TagReducer/TagsReducer';
import { MAX_OFFER_TAGS_LENGTH } from '../../utils/constants';
import { InputWithCounter } from '../InputWithCounter';
import { TagButton } from '../TagButton';

const TagsInput = () => {
  const [state, dispatch] = useReducer(tagsReducer, TAGS_INITIAL_STATE);
  const { tags, inputTag } = state;
  return (
    <div>
      <InputWithCounter
        currentLength={tags.length}
        maxLength={MAX_OFFER_TAGS_LENGTH}
        placeholder="Agrega hasta 4 etiquetas"
        className="p-4 bg-slate-800 disabled:bg-gray-500"
        value={inputTag}
        onChange={(ev) => onChangeTag({ ev, tags, dispatch })}
      />
      <ul className="flex gap-1">
        {tags.map((value, i) => (
          <li
            key={`${value}-${i}`}
            className="flex gap-4 py-2 px-4 rounded-full bg-slate-900"
          >
            <TagButton
              value={value}
              onClick={() => onRemoveTag({ dispatch, tags, value })}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { TagsInput };
