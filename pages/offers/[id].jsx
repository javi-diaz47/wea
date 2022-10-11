import Link from 'next/link';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { getDateFormat } from '../../utils/getDateFormat';
import { supabase } from '../../utils/supabaseClient';

export default function Offer(offer) {
  const { title, resume, description, created_at, profiles } = offer;
  return (
    <div className="offer">
      <div className="flex gap-4">
        <Link href={`../profile/${offer.owner_id}`}>
          <a>
            <div className="w-12 h-12 rounded-full bg-slate-300"></div>
          </a>
        </Link>
        <div className="flex flex-col">
          <span>
            <strong>{profiles?.name}</strong> {profiles?.last_name}
          </span>
          <span className="capitalize">{getDateFormat(created_at)}</span>
        </div>
      </div>
      <ReactMarkdown children={`# ${title}  \n---`} />
      <p>{resume}</p>
      <ReactMarkdown children={description} remarkPlugins={[remarkGfm]} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  // fetch for the offer information
  const { data: offer, error } = await supabase
    .from('offers')
    .select(`*, profiles (name, last_name)`)
    .eq('id', params.id);

  return {
    props: offer[0],
  };
}

export async function getStaticPaths() {
  // Generate all the offers paths at build time
  const { data: offers, error } = await supabase.from('offers').select('id');
  console.log(offers);

  return {
    paths: offers.map((offer) => ({
      params: {
        id: `${offer.id}`,
      },
    })),
    fallback: false,
  };
}
