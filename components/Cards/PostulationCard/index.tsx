import { ProfilePhoto } from "@/components/Profile/ProfilePhoto";
import { Offer } from "@/types/BusinessEntities/Offer";
import { CardTemplate } from "../CardTemplate";

const PostulationCard = ({ offer }: { offer: Offer }) => {
  return (
    <CardTemplate offer={offer}>
      <div className="flex justify-between gap-4">
        <ProfilePhoto href={offer.worker_id} />
        <button className=" border border-primary text-primary h-fit py-1 px-3 rounded-lg shadow-sm hover:bg-primary hover:text-white duration-200">
          Ver postulaciones
        </button>
      </div>
    </CardTemplate>
  );
};

export { PostulationCard };
