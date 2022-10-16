import { getCookie } from 'cookies-next';
import { useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { FormElement } from '../components/FormElement';
import { TagsInput } from '../components/TagInput';
import { MAX_OFFER_DESC_LENGTH } from '../utils/constants';
import { saveOffer } from '../utils/offers';
import jwt from 'jsonwebtoken';
import { supabase } from '../utils/supabaseClient';
import { CreateOfferForm } from '../components/CreateOfferForm';

export default function createOffer({ profile_id }) {
  const [title, setTitle] = useState('Creacion pagina web');
  const [desc, setDesc] = useState(`## Desarrollador web frontend\n
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
    console.log(profile_id);
    const htmlFormData = new FormData(ev.target);
    const inputObject = Object.fromEntries(htmlFormData);
    inputObject['owner_id'] = profile_id;
    const res = saveOffer(inputObject);
    console.log(res);
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
      {!!preview && (
        <div className="offer">
          <ReactMarkdown children={`# ${title}  \n---`} />
          <ReactMarkdown children={desc} remarkPlugins={[remarkGfm]} />
        </div>
      )}
      {!preview && (
        <CreateOfferForm
          title={title}
          setTitle={setTitle}
          desc={desc}
          setDesc={setDesc}
          onSubmit={onSave}
        />
      )}
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  // const token = getCookie('token', { req, res });

  // return { props: { profile_id: jwt.decode(token).sub } };

  return { props: { profile_id: '843edb12-63fa-4351-a549-d39d21b45199' } };
}
