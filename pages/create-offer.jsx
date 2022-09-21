import { useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { FormElement } from '../components/FormElement';
import { TagsInput } from '../components/TagInput';
import { MAX_OFFER_DESC_LENGTH } from '../utils/constants';
import { supabase } from '../utils/supabaseClient';

export default function createOffer(user) {
  const [title, setTitle] = useState('Creacion pagina web');
  const [desc, setDesc] = useState(`## Desarrollador web frontend\n
  ---
  Se necesita desarrollador web para la digitalizacion de mi portafolio de servicios
  La pagina debe estar construida en las siguientes tecnologias:
  - HTML5
  - CSS
  - Javascript

  | Tecnologia | Uso |
  |--|--|
  |HTML| Para la maquetacion del sitio|
  |CSS| Para darle estilos a la web |
  |JS| Para hacer la pagina ingeractiva|
  `);
  const [preview, setPreview] = useState(false);
  const onPreview = () => {
    setPreview(true);
  };
  const onEdit = () => {
    setPreview(false);
  };

  const onSave = async (ev) => {
    ev.preventDefault();
    // console.log(owner_id);
    const htmlFormData = new FormData(ev.target);
    const inputObject = Object.fromEntries(htmlFormData);
    inputObject['owner_id'] = user.id;
    console.log(inputObject);
    const { data, error } = await supabase.from('offer').insert([inputObject]);
    console.log(data);
    console.log(error);
  };

  const onPublish = () => {
    // Set public on supabase
  };

  const condTextColor = (state, color) => {
    return `${state ? color : ''}`;
  };

  return (
    <div>
      <div className="flex gap-8">
        <button
          className={condTextColor(!preview, 'text-rose-500')}
          onClick={onEdit}
        >
          Editar
        </button>
        <button
          className={condTextColor(preview, 'text-rose-500')}
          onClick={onPreview}
        >
          Vista previa
        </button>
      </div>
      {}
      {!!preview && (
        <div className="offer">
          <ReactMarkdown children={`# ${title} --- `} />
          <ReactMarkdown children={desc} remarkPlugins={[remarkGfm]} />
        </div>
      )}
      {!preview && (
        <form onSubmit={onSave} className="grid gap-4">
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
      )}
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
