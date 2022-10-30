import { TagsInput } from "Presentation/components/Tag/TagInput";
import {
  MAX_OFFER_DESC_LENGTH,
  MAX_OFFER_RESUME_LENGTH,
} from "Logic/utils/constants";
import { input_offer_type } from "@/types/types";
import { InputWithLabel } from "../InputWithLabel";
import { FormElementWithCounter } from "../FormElementWithCounter";

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
    <form onSubmit={onSubmit} className="grid gap-8 text-xl ">
      <InputWithLabel label="Titulo de la oferta">
        <input
          name="name"
          value={name}
          onChange={onHandleChange}
          className="text-xl font-bold w-full p-2 rounded-lg shadow-md"
          placeholder="Escribe aqui el titulo de tu oferta..."
          required={true}
          autoFocus={true}
        />
      </InputWithLabel>

      <FormElementWithCounter
        currentLength={resume?.length}
        maxLength={Number(MAX_OFFER_RESUME_LENGTH)}
      >
        <InputWithLabel label="Resumen">
          <textarea
            className="text-lg p-4 rounded-lg shadow-md"
            rows={4}
            name="resume"
            value={resume}
            placeholder="Escribe aqui la descripciond de tu oferta..."
            onChange={onHandleChange}
            maxLength={Number(MAX_OFFER_DESC_LENGTH)}
            required
          />
        </InputWithLabel>
      </FormElementWithCounter>

      <InputWithLabel label="Precio base">
        <input
          name="price"
          value={price}
          type="number"
          min="1"
          step="any"
          onChange={onHandleChange}
          className="text-lg w-full p-2 rounded-lg shadow-md"
          placeholder="Costo base de la oferta"
          required={true}
        />
      </InputWithLabel>

      <TagsInput tags={tags} onHandleTags={onHandleTags} />

      <FormElementWithCounter
        currentLength={description?.length}
        maxLength={Number(MAX_OFFER_DESC_LENGTH)}
      >
        <InputWithLabel label="Descripcion">
          <textarea
            className="text-lg p-4 rounded-lg shadow-md"
            rows={10}
            name="description"
            value={description}
            placeholder="Escribe aqui la descripciond de tu oferta..."
            onChange={onHandleChange}
            maxLength={Number(MAX_OFFER_DESC_LENGTH)}
            required
          />
        </InputWithLabel>
      </FormElementWithCounter>

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
