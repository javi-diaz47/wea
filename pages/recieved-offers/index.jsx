import { OfferCard } from '../../components/Cards/OfferCard';
import { supabase } from '../../utils/supabaseClient';

function RecievedOffers({ recievedOffers }) {
  const onAcceptOffer = () => {
    console.log('accepted');
  };

  const onDenyOffer = () => {
    console.log('Denied');
  };

  return (
    <div className="flex flex-wrap gap-8 m-8">
      <h2 className="text-4xl font-semibold">Ofertas recibidas</h2>
      <ul className=" flex flex-col gap-12">
        {recievedOffers.map(({ id, offers, origin_id }) => (
          <li key={id}>
            <OfferCard offer={offers} profile={origin_id}>
              <div className="flex justify-center gap-8 ">
                <button
                  onClick={onAcceptOffer}
                  className="text-primary border-primary bg-transparent border-2 font-semibold py-1 px-2 rounded-full"
                >
                  Aceptar
                </button>
                <button
                  onClick={onDenyOffer}
                  className="text-love border-love border-2 rounded-full font-semibold py-1 px-2"
                >
                  Rechazar
                </button>
              </div>
            </OfferCard>
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
    .eq('type', 'offer');

  console.log(recievedOffers);
  return {
    props: {
      recievedOffers,
    },
  };
}
