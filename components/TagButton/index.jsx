import { Tag } from "../Tag";
import { XIcon } from "@heroicons/react/outline";

const TagButton = ({ name, onClick }) => {
  return (
    <>
      <Tag name={name} className="bg-white flex  gap-2 flex-row-reverse">
        <button
          type="button"
          onClick={onClick}
          className="font-bold text-rose-700 hover:text-gold"
        >
          <XIcon className="w-6 text-rose-700" />
        </button>
      </Tag>
    </>
  );
};

export { TagButton };
