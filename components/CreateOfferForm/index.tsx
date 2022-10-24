import { FormElement } from "../FormElement";
import { TagsInput } from "../TagInput";
import { MAX_OFFER_DESC_LENGTH } from "../../utils/constants";
import { input_offer_type } from "../../types/types";
import { tagsReducerState } from "../../reducers/TagReducer";

interface Props extends input_offer_type {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
  onHandleChange: (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onHandleTags: (tags: Array<string>) => void;
}

const CreateOfferForm = ({
  name,
  resume,
  description,
  price,
  tags,
  onSubmit,
  onHandleChange,
  onHandleTags,
}: Props) => {
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <h2 className="text-4xl font-semibold">Crear oferta de trabajo</h2>
      <div className="grid">
        <FormElement
          label="Titulo"
          name="name"
          value={name}
          onChange={onHandleChange}
          className="text-2xl font-bold p-4"
          placeholder="Escribe aqui el titulo de tu oferta..."
          required={true}
          autoFocus={true}
        />
      </div>

      <TagsInput tags={tags} onHandleTags={onHandleTags} />

      <div className="grid">
        <FormElement label="Descripcion" name="description">
          <textarea
            className="text-lg p-4"
            name="description"
            value={description}
            placeholder="Escribe aqui la descripciond de tu oferta..."
            onChange={onHandleChange}
            maxLength={Number(MAX_OFFER_DESC_LENGTH)}
            required
          />
        </FormElement>
        <span>
          {description?.length}/{MAX_OFFER_DESC_LENGTH}
        </span>
      </div>
      <button
        className="text-white hover:bg-white hover:text-blue-600 m-w-24 p-2 font-bold bg-blue-600 rounded-lg"
        type="submit"
      >
        Crear oferta
      </button>
    </form>
  );
};

export { CreateOfferForm };
