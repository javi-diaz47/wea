import { useState } from 'react';
import { MAX_OFFER_TAGS_LENGTH } from '../../utils/constants';
import { InputWithCounter } from '../InputWithCounter';

const TagsInput = () => {
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const onChange = ({ target: { value } }) => {
    if (
      value.at(-1) === ' ' &&
      value.length > 1 &&
      tags.length < MAX_OFFER_TAGS_LENGTH
    ) {
      const newTags = [...tags];
      newTags.push(value.slice(0, -1));
      setTags(newTags);
      setInputTag('');
    } else {
      setInputTag(value);
    }
  };

  const removeTag = (value) => {
    const newTags = tags.filter((v) => v !== value);
    setTags(newTags);
  };

  return (
    <div>
      <InputWithCounter
        currentLength={tags.length}
        maxLength={MAX_OFFER_TAGS_LENGTH}
        className="p-4 bg-slate-800 disabled:bg-gray-500"
        value={inputTag}
        onChange={onChange}
      />
      <ul className="flex gap-1">
        {tags.map((value, i) => (
          <li
            key={`${value}-${i}`}
            className="flex gap-4 py-2 px-4 rounded-full bg-slate-900"
          >
            <span>{value}</span>
            <button
              type="button"
              onClick={() => removeTag(value)}
              className="font-bold text-rose-700 hover:text-white"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { TagsInput };
