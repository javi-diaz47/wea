import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { TagList } from "Presentation/components/Tag/TagList";

interface Props {
  name: string;
  price: string;
  tags: Array<string>;
  description: string;
  children?: JSX.Element;
}

const OfferMd = ({ name, price, tags, description, children }: Props) => {
  return (
    <div className="grid gap-4 ">
      {!!children && children}
      <h2 className="text-5xl font-semibold">{name}</h2>
      <div>
        {price ? (
          <>
            <strong>Precio: </strong> ${price}
          </>
        ) : (
          ""
        )}
      </div>
      <TagList tags={tags} />
      <hr />
      <div className="offer">
        <ReactMarkdown children={description} remarkPlugins={[remarkGfm]} />
      </div>
    </div>
  );
};

export { OfferMd };
