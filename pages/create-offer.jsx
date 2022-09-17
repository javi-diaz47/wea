import { useState } from 'react';
import { FormElement } from '../components/FormElement';
import { TagsInput } from '../components/TagInput';
import { MAX_OFFER_DESC_LENGTH } from '../utils/constants';
import { supabase } from '../utils/supabaseClient';

export default function createOffer(user) {
  const [textDesc, setTextDesc] = useState('');
  return (
    <div>
      <form className="grid gap-4">
        <h2>Crear oferta de trabajo</h2>
        <div className="grid">
          <FormElement
            label="Titulo"
            className="text-2xl font-bold p-4"
            name="title"
            required
            autoFocus
          />
        </div>
        <div className="grid">
          <FormElement label="Descripcion" name="description">
            <textarea
              className="text-lg p-4"
              name="description"
              value={textDesc}
              onChange={(ev) => setTextDesc(ev.target.value)}
              maxLength={MAX_OFFER_DESC_LENGTH}
              required
            />
          </FormElement>
          <span>
            {textDesc.length}/{MAX_OFFER_DESC_LENGTH}
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
    </div>
  );
}

export async function getServerSideProps({ req }) {
  //Check if there an authenticated user cookie
  const { user } = await supabase.auth.api.getUserByCookie(req);

  //if not redirect the user to the login
  if (!user) {
    return { props: {}, redirect: { destination: '/login' } };
  }

  return { props: user };
}
