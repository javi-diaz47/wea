import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getDateFormat } from "@/utils/getDateFormat";
import { supabase } from "@/utils/supabaseClient";

// function RecievedOffersId({ offer, originProfile }) {
function RecievedOffersId({ recievedPostulation }) {
  return (
    <div>{recievedPostulation.id}</div>
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
  console.log("from getStaticProps");
  console.log(params);
  const { data: recievedPostulation, error } = await supabase
    .from("notifications")
    .select(`id, offer_id (id, name, resume, description), origin_id (id)`)
    .eq("id", params.id)
    .limit(1)
    .single();

  console.log(recievedPostulation);

  return {
    props: {
      recievedPostulation,
      // offer: recievedPostulations.offers,
      // originProfile: recievedPostulations.origin_id,
    },
  };
}

export async function getStaticPaths() {
  const { data: recievedPostulations, error } = await supabase
    .from("notifications")
    .select("id")
    .eq("type", "postulation");

  console.log(recievedPostulations);

  return {
    paths: recievedPostulations.map((recievedPostulation) => ({
      params: {
        id: recievedPostulation.id,
      },
    })),
    fallback: false,
  };
}
