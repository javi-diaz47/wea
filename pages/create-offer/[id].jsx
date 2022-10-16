import { useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { saveOffer } from '../../utils/offers';
import { CreateOfferForm } from '../../components/CreateOfferForm';
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import { ProfileUserWithStar } from '../../components/ProfileUserWithStar';
import { supabase } from '../../utils/supabaseClient';

export default function createOfferPrivate({ profile_id, worker }) {
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
      <ProfileUserWithStar
        href={worker.id}
        name={worker.name}
        last_name={worker.last_name}
        star={worker.calification}
      />
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

export async function getServerSideProps({ req, res, params }) {
  const token = getCookie('token', { req, res });
  const { data: worker, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .limit(1)
    .single();
  return {
    props: {
      profile_id: jwt.decode(token).sub,
      worker: worker,
    },
  };
}

export async function getServerSidePaths() {
  const { data: workers, error } = await supabase.from('profiles').select('id');

  return {
    paths: workers.map((worker) => ({
      params: {
        id: `${worker.id}`,
      },
    })),
    fallback: false,
  };
}
