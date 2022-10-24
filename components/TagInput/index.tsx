import React, { useReducer } from "react";
import { TagsHandler, useTags } from "../../hooks/useTags";
import { MAX_OFFER_TAGS_LENGTH } from "../../utils/constants";
import { InputWithCounter } from "../InputWithCounter";
import { TagButton } from "../TagButton";

const TagsInput = ({ tags: current_tags, onHandleTags }: TagsHandler) => {
  const {
    state: { tags, inputTag },
    onAddTag,
    onHandleChange,
    onRemoveTag,
  } = useTags({ tags: current_tags, onHandleTags });

  return (
    <div>
      <InputWithCounter
        list="job-types"
        currentLength={Number(tags.length)}
        maxLength={Number(MAX_OFFER_TAGS_LENGTH)}
        placeholder="Agrega hasta 4 etiquetas"
        className="p-4 bg-slate-800 disabled:bg-gray-500"
        value={inputTag}
        onChange={onHandleChange}
      />
      <datalist id="job-types">
        <option value="desarrollo-web">Desarrollo web</option>
        <option value="electronica">Electronica</option>
        <option value="desarrollo-backend">Desarrollo Backend</option>
      </datalist>
      <button
        onClick={onAddTag}
        className="px-4 py-2 bg-primary rounded-lg hover:bg-love duration-200 "
      >
        Agregar Etiqueta
      </button>

      <ul className="flex gap-1">
        {tags.map((name, i) => (
          <li key={`${name}-${i}`}>
            <TagButton name={name} onClick={() => onRemoveTag(name)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { TagsInput };
