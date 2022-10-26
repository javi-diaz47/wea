import { Tag } from "../Tag";

const TagList = ({ tags }) => {
  return (
    <ul className="flex flex-wrap w-full gap-2">
      {tags?.map((tag, i) => (
        <li key={`${tag}_${i}`} className="list-none">
          <Tag name={tag} />
        </li>
      ))}
    </ul>
  );
};

export { TagList };
