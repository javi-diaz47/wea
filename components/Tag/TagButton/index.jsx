import { XIcon } from "@heroicons/react/outline";
import { Tag } from "..";

const TagButton = ({ name, onClick }) => {
  return (
    <>
      <Tag name={name} className="bg-white flex gap-2 flex-row-reverse">
        <button type="button" onClick={onClick} className="font-bold  ">
          <XIcon className="w-6 text-love" />
        </button>
      </Tag>
    </>
  );
};

export { TagButton };
