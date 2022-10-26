import Link from "next/link";
import { Card } from "@/components/Cards/Card";
import { TagList } from "@/components/TagList";

const NotificationList = ({
  notifications,
  onNotification,
}: {
  notifications: any;
  onNotification: () => void;
}) => {
  return (
    <ul className="min-h-full mt-12 p-8 flex flex-col gap-8 overflow-y-scroll ">
      {notifications?.map(({ id, type, offers: offer, origin_id: profile }) => (
        <li key={id} className="">
          <Link
            href={`${process.env.NEXT_PUBLIC_ROOT_URL}/${
              type === "offer" ? "recieved-offers" : "recieved-postulations"
            }/${id}`}
          >
            <a onClick={onNotification}>
              <Card>
                <h2 className="text-3xl font-semibold">{offer.name}</h2>
                <p>{offer.resume}</p>
                <TagList tags={offer.tag || ["react", "html"]} />
              </Card>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export { NotificationList };
