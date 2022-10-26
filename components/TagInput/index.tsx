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
    <div className="">
      <InputWithCounter
        label="Etiquetas"
        list="job-types"
        currentLength={Number(tags.length)}
        maxLength={Number(MAX_OFFER_TAGS_LENGTH)}
        placeholder="Agrega hasta 4 etiquetas"
        className="p-4 disabled:bg-gray-500 rounded-lg shadow-md"
        value={inputTag}
        onChange={onHandleChange}
      />
      <datalist id="job-types">
        <option value="web">web</option>
        <option value="electronica">Electronica</option>
        <option value="backend">Backend</option>
      </datalist>
      <button
        onClick={onAddTag}
        type="button"
        className="text-sm px-4 py-2 border-2 text-primary border-primary rounded-lg hover:border-love hover:text-love duration-200 "
      >
        Agregar Etiqueta
      </button>

      <ul className="flex gap-2 flex-wrap duration-250 transition-all">
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
