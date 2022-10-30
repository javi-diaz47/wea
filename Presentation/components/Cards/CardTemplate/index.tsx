import { Card } from "../Card";
import { TagList } from "Presentation/components/Tag/TagList";
import { Offer } from "@/types/BusinessEntities/Offer";

interface Props {
  name: string;
  resume: string;
  tags: Array<string>;
  children?: JSX.Element | JSX.Element[];
}

const CardTemplate = ({ name, resume, tags, children }: Props) => {
  return (
    <Card>
      <h2 className="text-3xl font-semibold text-title hover:underline">
        {name}
      </h2>

      <p className="ellipsis-2">{resume}</p>
      {tags.length !== 0 && <TagList tags={tags} />}

      {children}
    </Card>
  );
};

export { CardTemplate };
