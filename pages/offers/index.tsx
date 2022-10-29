import { OfferCard } from "@/components/Cards/OfferCard";
import { supabase } from "@/utils/supabaseClient";
import { PlusIcon } from "@heroicons/react/outline";
import { NavbarIcon } from "@/Navbar/NavbarIcon";
import { Empty } from "@/components/Empty";
import { SearchBar } from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { input_offer_type, offerCard } from "@/types/types";
import { Offer } from "@/types/BusinessEntities/Offer";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { isQueryKey } from "react-query/types/core/utils";
import { getAllOffers, setOffer } from "@/Persistence/OfferDAO";
import { useBooleanState } from "@/hooks/useBooleanState";
import { ConditionalBar } from "@/components/ConditionalBar";
import { FilterIcon } from "@heroicons/react/solid";
import { useSearchBar } from "@/hooks/useSearchBar";

export default function Offers({ queryKey }) {
  const { data } = useQuery(queryKey, getAllOffers);

  const {
    isJobOffer,
    onJobOffer,
    onServiceOffer,
    isOnOfferType,
    offers,
    input,
    onChange,
  } = useSearchBar(data);

  return (
    <div className="flex flex-col gap-4 p-8">
      <button className="fixed right-10 bottom-[10%] flex justify-center align-center w-14 h-14 bg-primary rounded-full text-white shadow-xl">
        <NavbarIcon href="create-offer" icon={<PlusIcon />} />
      </button>
      <h2 className="text-4xl font-semibold">ofertas</h2>
      <SearchBar input={input} onChange={onChange} />
      <ConditionalBar
        state={isJobOffer}
        stateTrueText="Oferta de trabajo"
        stateFalseText="Servicio"
        onState={onJobOffer}
        onNotState={onServiceOffer}
        classNameBtnSelected="scale-95 active:shadow-lg text-white p-2 hover:bg-blue-500 bg-blue-600 bold duration-300 transition-all rounded-lg  mx-auto w-fit px-7 my-5 shadow-md"
        classNameBtn="active:scale-95 active:shadow-lg text-white p-2 hover:bg-blue-500 bg-blue-600 bold duration-300 transition-all rounded-lg  mx-auto w-fit px-7 my-5 shadow-md"
      />

      <ul className=" flex flex-col gap-12">
        {offers[isOnOfferType()].length === 0 ? (
          <Empty text="Lo sentimos, Aun no hay ofertas de trabajo.¡Animate y crea una!" />
        ) : (
          offers[isOnOfferType()].map((offer) => (
            <li key={offer.id}>
              <OfferCard offer={offer} profile={offer.profile} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  const queryKey = ["offers"];

  await queryClient.prefetchQuery(queryKey, getAllOffers);

  return {
    props: {
      queryKey,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
