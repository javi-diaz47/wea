import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { getDateFormat } from "@/utils/getDateFormat";
import { TagList } from "@/Tag/TagList";
import { supabase } from "@/utils/supabaseClient";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getOfferById } from "Persistence/OfferDAO";
import { ProfilePhoto } from "@/components/Profile/ProfilePhoto";
import { Button } from "@/components/Button";
import { handleOnPostulation } from "@/utils/handleOnPostulation";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export default function Offer({ profileId, queryKey }) {
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
      <div className="flex flex-col gap-2">
        <h2 className="text-5xl font-semibold">{offer?.name}</h2>
        <TagList tags={offer?.tags} />
        <hr />
        <div className="offer h-fit">
          <ReactMarkdown
            children={offer?.description}
            remarkPlugins={[remarkGfm]}
          />
        </div>
      </div>
      {profileId !== offer.owner_id ? (
        <div className="mt-8 flex justify-center">
          <Button
            text="Postularme a la oferta de trabajo"
            onClick={() =>
              handleOnPostulation({
                offer_id: offer.id,
                destination_id: offer.owner_id,
                origin_id: profileId,
              })
            }
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export async function getServerSideProps({ params, req, res }) {
  const { id } = params;
  const queryClient = new QueryClient();

  const queryKey = ["offer", { id }];

  await queryClient.prefetchQuery(queryKey, getOfferById);

  const token = getCookie("token", { req, res });
  const profileId = jwt.decode(token).sub;

  return {
    props: {
      profileId,
      queryKey,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export async function getServerSidePaths() {
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
