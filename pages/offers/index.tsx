import { OfferCard } from "@/components/Cards/OfferCard";
import { PlusIcon } from "@heroicons/react/outline";
import { NavbarIcon } from "@/Navbar/NavbarIcon";
import { Empty } from "@/components/Empty";
import { SearchBar } from "@/components/SearchBar";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getAllOffers } from "@/Persistence/OfferDAO";
import { ConditionalBar } from "@/components/ConditionalBar";
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
        stateTrueText="Trabajo"
        stateFalseText="Servicio"
        onState={onJobOffer}
        onNotState={onServiceOffer}
        className="flex gap-4"
        classNameBtn="w-fit h-fit px-4 py-1 text-primary bg-white shadow-lg  bold duration-300 transition-all rounded-full "
        classNameBtnSelected="w-fit h-fit px-4 py-1 text-white bg-primary shadow-lg  bold duration-300 transition-all rounded-full  "
      />

      <ul className=" flex flex-col gap-12">
        {offers[isOnOfferType()].length === 0 ? (
          <Empty
            text={
              input
                ? `Lo sentimos pero no se encontro ninguna oferta de nombre ${input}`
                : "Lo sentimos, Aun no hay ofertas de trabajo.¡Animate y crea una!"
            }
          />
        ) : (
          offers[isOnOfferType()].map((offer) => (
            <li key={offer.id}>
              <OfferCard
                offer={offer}
                profile={offer.profile}
                isOnJobOffer={isOnOfferType()}
              />
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
