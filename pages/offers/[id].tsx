import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { getDateFormat } from "@/utils/getDateFormat";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import { TagList } from "@/components/TagList";
import { supabase } from "@/utils/supabaseClient";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getOfferById } from "Persistence/OfferDAO";

export default function Offer({ queryKey }) {
  const { data: offer } = useQuery(queryKey, getOfferById);

  return (
    <div className="p-8">
      <div className="flex gap-4 my-4">
        <ProfilePhoto
          href={`${process.env.NEXT_PUBLIC_ROOT_URL}/profile/${offer?.owner_id}`}
        />
        <div className="flex flex-col">
          <span>
            <strong>{offer.profile.name}</strong> {offer.profile.last_name}
          </span>
          <span className="capitalize">{getDateFormat(offer?.created_at)}</span>
        </div>
      </div>
      {/* <ReactMarkdown children={`# ${name}  \n---`} /> */}
      <div className="flex flex-col gap-2">
        <h2 className="text-5xl font-semibold">{offer?.name}</h2>
        <TagList tags={offer?.tags} />
        <hr />
        <div className="offer">
          <ReactMarkdown
            children={offer?.description}
            remarkPlugins={[remarkGfm]}
          />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const queryClient = new QueryClient();

  const queryKey = ["offer", { id }];

  await queryClient.prefetchQuery(queryKey, getOfferById);

  return {
    props: {
      queryKey,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export async function getStaticPaths() {
  const { data: offers, error } = await supabase.from("offers").select("id");

  return {
    paths: offers.map((offer) => ({
      params: {
        id: offer.id,
      },
    })),
    fallback: false,
  };
}
