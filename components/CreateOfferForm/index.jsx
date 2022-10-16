import { FormElement } from '../FormElement';
import { TagsInput } from '../TagInput';
import { MAX_OFFER_DESC_LENGTH } from '../../utils/constants';

const CreateOfferForm = ({ title, setTitle, desc, setDesc, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <h2>Crear oferta de trabajo</h2>
      <div className="grid">
        <FormElement
          label="Titulo"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          className="text-2xl font-bold p-4"
          name="title"
          placeholder="Escribe aqui el titulo de tu oferta..."
          required={true}
          autoFocus={true}
        />
      </div>
      <div className="grid">
        <FormElement label="Descripcion" name="description">
          <textarea
            className="text-lg p-4"
            name="description"
            value={desc}
            placeholder="Escribe aqui la descripciond de tu oferta..."
            onChange={(ev) => setDesc(ev.target.value)}
            maxLength={MAX_OFFER_DESC_LENGTH}
            required
          />
        </FormElement>
        <span>
          {desc.length}/{MAX_OFFER_DESC_LENGTH}
        </span>
        <TagsInput />
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
