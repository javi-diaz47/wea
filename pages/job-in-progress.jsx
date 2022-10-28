import { supabase } from "@/utils/supabaseClient";
import { getCookie } from "cookies-next";
import { OfferCard } from "@/Cards/OfferCard";
import jwt from "jsonwebtoken";

function JobInProgress({ offers }) {
  return (
    <div>
      <h2 className="text-3xl">Job in Progress</h2>
      <section>
        {offers.map((offer) => (
          <OfferCard offer={offer} profile={offer.owner_id} />
        ))}
      </section>
    </div>
  );
}

export default JobInProgress;

export async function getServerSideProps({ req, res }) {
  // const token = getCookie("token", { req, res });
  // const user_id = jwt.decode(token).sub;

  // const { data: offers, error } = await supabase
  //   .from("offers")
  //   .select(
  //     `*, owner_id (id, name, last_name, picture), worker_id (id, name, last_name, picture)`
  //   )
  //   .or(`owner_id.eq.${user_id}, worker_id.eq.${user_id}`)
  //   .eq("in_progress", true);

  // console.log(offers);

  const offers = [
    {
      id: "d8856f29-2333-4083-b057-4e57187e03fc",
      created_at: "2022-10-20T22:36:34.510819+00:00",
      name: "Creacion de logo",
      resume:
        "Se desea un logo que utilizando los colores corporativos represente bien los valores, pensamientos y visiones que tiene tal cosa",
      description: null,
      price: "250000",
      tags: null,
      calification: null,
      owner_id: {
        id: "3b701f8a-7fdd-4a4d-ad18-e84f0ff9505e",
        name: "Javi Inc",
        last_name: null,
        picture: null,
      },
      worker_id: {
        id: "843edb12-63fa-4351-a549-d39d21b45199",
        name: "Javier",
        last_name: "Diaz",
        picture: null,
      },
      offer_type: "public",
      in_progress: true,
    },
  ];

  return {
    props: {
      offers,
    },
  };
}
