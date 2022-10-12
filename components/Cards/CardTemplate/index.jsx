import { Card } from '../Card';
import { TagList } from '../../TagList';

const CardTemplate = ({ offer, children }) => {
  const { title, resume, tags } = offer;
  return (
    <Card>
      <h2 className="text-3xl font-semibold text-title hover:underline">
        {title}
      </h2>

      <p className="ellipsis-2">{resume}</p>

      <TagList tags={tags} />

      {children}
    </Card>
  );
};

export { CardTemplate };
