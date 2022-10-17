import Link from 'next/link';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { getDateFormat } from '../../utils/getDateFormat';
import { supabase } from '../../utils/supabaseClient';

// function RecievedOffersId({ offer, originProfile }) {
function RecievedOffersId({ recievedOffer }) {
  return (
    <div>{recievedOffer.id}</div>
    // <div className="offer">
    //   <div className="flex gap-4">
    //     <Link href={`../profile/${originProfile.id}`}>
    //       <a>
    //         <div className="w-12 h-12 rounded-full bg-slate-300"></div>
    //       </a>
    //     </Link>
    //     <div className="flex flex-col">
    //       <span>
    //         <strong>{originProfile?.name}</strong> {originProfile?.last_name}
    //       </span>
    //       <span className="capitalize">{getDateFormat(offer.created_at)}</span>
    //     </div>
    //   </div>
    //   <ReactMarkdown children={`# ${offer.name}  \n---`} />
    //   <p>{offer.resume}</p>
    //   <ReactMarkdown children={offer.description} remarkPlugins={[remarkGfm]} />
    // </div>
  );
}

export default RecievedOffersId;

export async function getStaticProps({ params }) {
  console.log('from getStaticProps');
  console.log(params);
  const { data: recievedOffer, error } = await supabase
    .from('notifications')
    .select(`id, offer_id (id, name, resume, description), origin_id (id)`)
    .eq('id', params.id)
    .limit(1)
    .single();

  console.log(recievedOffer);

  return {
    props: {
      recievedOffer,
      // offer: recievedOffer.offers,
      // originProfile: recievedOffer.origin_id,
    },
  };
}

export async function getStaticPaths() {
  const { data: recievedOffers, error } = await supabase
    .from('notifications')
    .select('id')
    .eq('type', 'offer');

  console.log(recievedOffers);

  return {
    paths: recievedOffers.map((recievedOffer) => ({
      params: {
        id: recievedOffer.id,
      },
    })),
    fallback: false,
  };
}
