import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { getDateFormat } from "Logic/utils/getDateFormat";
import { TagList } from "Presentation/components/Tag/TagList";
import { supabase } from "Logic/utils/supabaseClient";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getOfferById } from "Persistence/OfferDAO";
import { ProfilePhoto } from "Presentation/components/Profile/ProfilePhoto";
import { Button } from "Presentation/components/Button";
import { handleOnPostulation } from "Logic/utils/handleOnPostulation";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { getServiceById } from "@/Persistence/ServiceDAO";
import { handleOnServiceOffer } from "Logic/utils/handleOnServiceOffer";
import Link from "next/link";
import { AnchorButton } from "Presentation/components/AnchorButton";

export default function Offer({ profileId, queryKey }) {
  const { data: offer } = useQuery(queryKey, getServiceById);

  return (
    <div className="p-8">
      <div className="flex gap-4 my-4">
        <ProfilePhoto href={`/profile/${offer?.owner_id}`} />
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
          <AnchorButton
            href={`/create-offer/${offer.owner_id}`}
            text="Ofrecer trabajo"
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

  const queryKey = ["services", { id }];

  await queryClient.prefetchQuery(queryKey, getServiceById);

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
  const { data: offers, error } = await supabase.from("services").select("id");

  return {
    paths: offers.map((offer) => ({
      params: {
        id: offer.id,
      },
    })),
    fallback: false,
  };
}
