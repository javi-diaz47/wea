import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { PostulationCard } from "@/components/Cards/PostulationCard";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getAllNotifications } from "@/Persistence/NotificationDAO";

function RecievedPostulations({ queryKey }) {
  const { data } = useQuery(queryKey, getAllNotifications);

  console.log(data);

  return (
    <div className="flex flex-wrap gap-8 m-8">
      <h2 className="text-4xl font-semibold">Postulaciones recibidas</h2>
      <ul className=" flex flex-col gap-12">
        {data.map(({ id, offer, origin_id }) => (
          <li key={id}>
            <PostulationCard offer={offer} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecievedPostulations;

export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });
  const id = jwt.decode(token).sub;

  const queryClient = new QueryClient();

  const queryCondition = {
    column: "type",
    value: "postulation",
  };

  const queryKey = [
    "recieved-postulations",
    { destination_id: id, queryCondition },
  ];

  await queryClient.prefetchQuery(queryKey, getAllNotifications);

  return {
    props: {
      queryKey,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
