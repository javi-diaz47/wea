import { Tag } from '../Tag';

const TagList = ({ tags }) => {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags?.map((tag, i) => (
        <li key={`${tag}_${i}`}>
          <Tag name={tag} />
        </li>
      ))}
    </ul>
  );
};

export { TagList };
