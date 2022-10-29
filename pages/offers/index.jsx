import { OfferCard } from "@/components/Cards/OfferCard";
import { supabase } from "@/utils/supabaseClient";
import { PlusIcon } from "@heroicons/react/outline";
import { NavbarIcon } from "@/Navbar/NavbarIcon";
import { Empty } from "@/components/Empty";

export default function Offers({ offers }) {
  return (
    <div className="">
      <button className="fixed right-10 bottom-[10%] flex justify-center align-center w-14 h-14 bg-primary rounded-full text-white shadow-xl">
        <NavbarIcon href="create-offer" icon={<PlusIcon />} />
      </button>
      <ul className="m-4 flex flex-col gap-12">
        {offers.length === 0 ? (
          <Empty text="Lo sentimos, Aun no hay ofertas de trabajo.¡Animate y crea una!" />
        ) : (
          offers.map((offer) => (
            <li key={offer.id}>
              <OfferCard offer={offer} profile={offer.owner_id} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  // fetch all offers
  const { data: offers, error } = await supabase
    .from("offers")
    .select(` *, owner_id (id, name, last_name, picture)`)
    .eq("offer_type", "public");

  return { props: { offers } };
}
