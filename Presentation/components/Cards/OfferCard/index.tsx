import { ProfileUserWithDate } from "@/components/Profile/ProfileUserWithDate";
import { AnchorButton } from "@/components/AnchorButton";
import { CardTemplate } from "../CardTemplate";
import { Offer } from "@/types/BusinessEntities/Offer";
import { profileCard } from "@/types/types";
import Link from "next/link";

interface Props {
  offer: Offer;
  href?: String;
  profile: profileCard;
  children?: JSX.Element;
  isOnJobOffer?: string;
}

const OfferCard = ({ offer, href, profile, children, isOnJobOffer }: Props) => {
  return (
    <CardTemplate name={offer.name} tags={offer.tags} resume={offer.resume}>
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <ProfileUserWithDate
            name={profile.name}
            last_name={profile?.last_name}
            href={`profile/${offer.owner_id}`}
            date={offer.created_at}
          />
        </div>
        <div className="flex items-center">
          <AnchorButton
            href={href ? href : `/${isOnJobOffer}/${offer.id}`}
            text="Ver oferta"
          />
        </div>
      </div>

      {children}
    </CardTemplate>
  );
};

export { OfferCard };
