import Link from 'next/link';
import { EndJobCard } from '../../components/Cards/EndJobCard';
import { OfferCard } from '../../components/Cards/OfferCard';
import { PostulationCard } from '../../components/Cards/PostulationCard';
import { supabase } from '../../utils/supabaseClient';
import { PlusIcon } from '@heroicons/react/outline';
import { NavbarIcon } from '../../components/NavbarIcon';

export default function Offers({ offers }) {
  const onHandleClick = () => {
    const session = supabase.auth.session();
    console.log(session);
  };
  return (
    <div className="">
      <h2 className="text-2xl font-bold ">This is the Offers Page</h2>
      <Link href="create-offer">
        <a className="text-white hover:bg-white hover:text-blue-600 m-w-24 p-2 font-bold bg-blue-600 rounded-lg">
          Crear oferta de trabajo
        </a>
      </Link>
      <button className="fixed right-10 bottom-[10%] flex justify-center align-center w-14 h-14 bg-primary rounded-full text-white shadow-xl">
        <NavbarIcon href="create-offer" icon={<PlusIcon />} />
      </button>

      <button onClick={onHandleClick}>get session</button>
      <ul className="m-4 flex flex-col gap-12">
        {offers.map((offer) => (
          <li key={offer.id}>
            <OfferCard offer={offer} profile={offer.owner_id} />
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
  //   owner_id (name, last_name, picture)
  // `);

  const offers = [
    {
      id: '4b2477b9-0588-4b2b-a39e-f730d51d9b0a',
      created_at: '2022-10-16T21:02:42.529845+00:00',
      name: 'Fullstack',
      resume:
        ' Se necesita desarrollador web para la digitalizacion de mi portafolio de servicios',
      description:
        '## Desarrollador web frontend\n' +
        '\n' +
        '  Se necesita desarrollador web para la digitalizacion de mi portafolio de servicios\n' +
        '  La pagina debe estar construida en las siguientes tecnologias:\n' +
        '  - HTML5\n' +
        '  - CSS\n' +
        '  - Javascript\n' +
        '\n' +
        '  | Tecnologia | Uso |\n' +
        '  |--|--|\n' +
        '  |HTML| Para la maquetacion del sitio|\n' +
        '  |CSS| Para darle estilos a la web |\n' +
        '  |JS| Para hacer la pagina ingeractiva|\n' +
        '  ",843edb12-63fa-4351-a549-d39d21b45199,2022-10-01 16:46:17.549719+00,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia at solem qui revent ceux je ne dos pas"\n' +
        '6,A promise of hope is enough to feel free,"## Desarrollador web frontend\n' +
        '\n' +
        '  Se necesita desarrollador web para la digitalizacion de mi portafolio de servicios\n' +
        '  La pagina debe estar construida en las siguientes tecnologias:\n' +
        '  - HTML5\n' +
        '  - CSS\n' +
        '  - Javascript\n' +
        '\n' +
        '  | Tecnologia | Uso |\n' +
        '  |--|--|\n' +
        '  |HTML| Para la maquetacion del sitio|\n' +
        '  |CSS| Para darle estilos a la web |\n' +
        '  |JS| Para hacer la pagina ingeractiva|',
      price: '300.000',
      tags: null,
      calification: null,
      owner_id: { name: 'Javi Inc', last_name: null, picture: null },
      worker_id: null,
      offer_type: 'public',
    },
    {
      id: 'a502cab4-873e-438d-917d-c512fdc6dd45',
      created_at: '2022-10-16T21:07:38.17149+00:00',
      name: 'Desarrollo de página web para mi negocio',
      resume: 'Pagina web basica',
      description: null,
      price: '400.000',
      tags: null,
      calification: null,
      owner_id: { name: 'Javi Inc', last_name: null, picture: null },
      worker_id: '843edb12-63fa-4351-a549-d39d21b45199',
      offer_type: 'private',
    },
  ];
  return { props: { offers } };
}
