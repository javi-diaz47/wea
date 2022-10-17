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
  const { data: offers, error } = await supabase.from('offers').select(`
    *,
    owner_id (id, name, last_name, picture)
  `);

  return { props: { offers } };
}
