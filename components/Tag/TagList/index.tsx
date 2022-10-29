import { Tag } from "..";

const TagList = ({ tags }: { tags: Array<string> }) => {
  return (
    <ul className="flex flex-wrap w-full gap-2">
      {tags.map((tag, i) => (
        <li key={`${tag}_${i}`} className="list-none">
          <Tag name={tag} />
        </li>
      ))}
    </ul>
  );
};

export { TagList };
