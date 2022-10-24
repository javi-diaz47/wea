import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { saveOffer } from "../../utils/offers";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { input_offer_type } from "../../types/types";
import { CreateOfferForm } from "../../components/CreateOfferForm";
import { TagList } from "../../components/TagList";

const INITIAL_STATE: input_offer_type = {
  name: "",
  resume: "",
  description: "",
  price: "",
  tags: [],
};

export default function createOffer({ profile_id }) {
  const [inputValues, setInputValues] = useState(INITIAL_STATE);

  const onHandleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = ev.target;
    const newInputValues = { ...inputValues, [name]: value };
    setInputValues(newInputValues);
  };

  const onHandleTags = (tags: Array<string>) => {
    const newInputValues = { ...inputValues, tags };
    setInputValues(newInputValues);
  };

  const [preview, setPreview] = useState(false);
  const onPreview = () => {
    setPreview(true);
  };
  const onEdit = () => {
    setPreview(false);
  };

  const onSave = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    // console.log(owner_id);
    // console.log(profile_id);
    // const htmlFormData = new FormData(ev.target);
    // const inputObject = Object.fromEntries(htmlFormData);
    // inputObject["owner_id"] = profile_id;
    // const res = saveOffer(inputObject);
    // console.log(res);
  };

  const onPublish = () => {
    // Set public on supabase
  };

  const condTextColor = (state, color) => {
    return `${state ? color : ""}`;
  };

  return (
    <div>
      <div className="flex gap-8 px-8">
        <button
          className={condTextColor(!preview, "text-rose-500")}
          onClick={onEdit}
        >
          Editar
        </button>
        <button
          className={condTextColor(preview, "text-rose-500")}
          onClick={onPreview}
        >
          Vista previa
        </button>
      </div>
      {!!preview && (
        <div className="grid gap-4 p-8">
          {/* <ReactMarkdown children={`# ${inputValues.name}  \n---`} /> */}
          <h2 className="text-5xl font-semibold">{inputValues.name}</h2>
          <TagList tags={inputValues.tags} />
          <hr />
          <div className="offer">
            <ReactMarkdown
              children={inputValues.description}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        </div>
      )}
      {!preview && (
        <div className=" max-w-6xl p-8">
          <CreateOfferForm
            name={inputValues.name}
            description={inputValues.description}
            resume={inputValues.resume}
            price={inputValues.price}
            tags={inputValues.tags}
            onHandleChange={onHandleChange}
            onHandleTags={onHandleTags}
            onSubmit={onSave}
          />
        </div>
      )}
    </div>
  );
}

export async function getStaticProps({ req, res }) {
  // const token = getCookie('token', { req, res });

  // return { props: { profile_id: jwt.decode(token).sub } };

  return { props: { profile_id: "843edb12-63fa-4351-a549-d39d21b45199" } };
}
