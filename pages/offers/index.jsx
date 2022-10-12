import Link from 'next/link';
import { EndJobCard } from '../../components/Cards/EndJobCard';
import { OfferCard } from '../../components/Cards/OfferCard';
import { PostulationCard } from '../../components/Cards/PostulationCard';
import { supabase } from '../../utils/supabaseClient';

export default function Offers({ offers }) {
  const onHandleClick = () => {
    const session = supabase.auth.session();
    console.log(session);
  };
  return (
    <div className="bg-black mb-8">
      <h2 className="text-2xl font-bold text-white">This is the Offers Page</h2>
      <Link href="create-offer">
        <a className="text-white hover:bg-white hover:text-blue-600 m-w-24 p-2 font-bold bg-blue-600 rounded-lg">
          Crear oferta de trabajo
        </a>
      </Link>
      <button onClick={onHandleClick}>get session</button>
      <ul className="m-4 flex flex-col gap-12">
        {offers.map((offer) => (
          <li key={offer.id}>
            <OfferCard offer={offer} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  // fetch all offers
  // const { data: offers, error } = await supabase.from('offers').select(`
  //   *,
  //   profiles (name, last_name)
  // `);

  const offers = [
    {
      id: 1,
      title: 'Creacion página web',
      resume:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia at solem qui revent ceux je ne dos pas',
      description:
        '## Desarrollador web frontend\n\n  ---\n  Se necesita desarrollador web para la digitalizacion de mi portafolio de servicios\n  La pagina debe estar construida en las siguientes tecnologias:\n  - HTML5\n  - CSS\n  - Javascript\n\n  | Tecnologia | Uso |\n  |--|--|\n  |HTML| Para la maquetacion del sitio|\n  |CSS| Para darle estilos a la web |\n  |JS| Para hacer la pagina ingeractiva|\n  ',
      owner_id: '843edb12-63fa-4351-a549-d39d21b45199',
      created_at: '2022-09-21T01:57:54.183856+00:00',
      profiles: { name: 'Javier', last_name: 'Diaz' },
      tags: ['reactjs', 'javascript', 'css'],
    },
    {
      id: 2,
      title: 'Fullstack',
      resume:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia at solem qui revent ceux je ne dos pas',
      description:
        '## Desarrollador web frontend\n\n  Se necesita desarrollador web para la digitalizacion de mi portafolio de servicios\n  La pagina debe estar construida en las siguientes tecnologias:\n  - HTML5\n  - CSS\n  - Javascript\n\n  | Tecnologia | Uso |\n  |--|--|\n  |HTML| Para la maquetacion del sitio|\n  |CSS| Para darle estilos a la web |\n  |JS| Para hacer la pagina ingeractiva|\n  ',
      owner_id: '843edb12-63fa-4351-a549-d39d21b45199',
      created_at: '2022-10-01T16:46:17.549719+00:00',
      profiles: { name: 'Javier', last_name: 'Diaz' },
      tags: ['reactjs', 'mongodb'],
    },
  ];

  return { props: { offers } };
}
