import { CardTemplate } from '../components/Cards/CardTemplate';
import { OfferCard } from '../components/Cards/OfferCard';
import { supabase } from '../utils/supabaseClient';

function RecievedOffers({ recievedOffers }) {
  return (
    <div className="flex flex-wrap gap-8 m-8">
      <h2 className="text-4xl font-semibold">Ofertas recibidas</h2>
      <ul className=" flex flex-col gap-12">
        {recievedOffers.map(({ id, offers, origin_id }) => (
          <li key={id}>
            <OfferCard offer={offers} profile={origin_id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecievedOffers;

export async function getStaticProps() {
  const { data: recievedOffers, error } = await supabase
    .from('notifications')
    .select(
      `id, offers (id, name, resume, created_at), origin_id (id, name, last_name, picture)`
    )
    .eq('viewed', false);

  console.log(recievedOffers);
  return {
    props: {
      recievedOffers,
    },
  };
}
