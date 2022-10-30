import { supabase } from "@/utils/supabaseClient";
import { getCookie } from "cookies-next";
import { OfferCard } from "@/Cards/OfferCard";
import jwt from "jsonwebtoken";
import { Empty } from "@/components/Empty";
import { dehydrate, QueryClient, useQuery } from "react-query";
import {
  getOffers,
  mapOfferFromOfferCard,
  setOffer,
} from "@/Persistence/OfferDAO";
import { handleEndJobOffer } from "@/utils/handleEndJobOffer";
import Link from "next/link";

function JobInProgress({ queryKey }) {
  const { data: offers } = useQuery(queryKey, getOffers);
  // console.log({ offers });
  return (
    <div className="flex flex-col gap-8 p-8">
      <h2 className="text-4xl font-semibold">Trabajo en progreso</h2>
      <ul className="flex flex-col gap-12">
        {offers.length === 0 ? (
          <Empty text="Todavia no tienes ningun trabajo en progreso" />
        ) : (
          offers.map((offer) => (
            <li key={`job-in-progress-${offer}-${offer.id}`}>
              <OfferCard
                offer={offer}
                profile={offer.profile}
                href={`offers/${offer.id}`}
              >
                <Link href={`end-offer/${offer.id}`}>
                  <a className="flex justify-center border-2 border-love text-love px-2 py-1 rounded-full hover:bg-love hover:text-white duration-300 transition-all shadow-md font-semibold">
                    Finalizar oferta
                  </a>
                </Link>
              </OfferCard>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default JobInProgress;

export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });
  const id = jwt.decode(token).sub;

  const queryClient = new QueryClient();

  const queryKey = ["job-in-progress", { id }];

  await queryClient.prefetchQuery(queryKey, getOffers);

  return {
    props: {
      queryKey,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
