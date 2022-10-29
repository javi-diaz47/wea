import { getAllOffersType } from "@/types/types";
import { useEffect, useState } from "react";
import { useBooleanState } from "./useBooleanState";

const useSearchBar = (data: getAllOffersType) => {
  const {
    bool: isJobOffer,
    onTrue: onJobOffer,
    onFalse: onServiceOffer,
  } = useBooleanState(true);

  const isOnOfferType = () => {
    return isJobOffer ? "offers" : "services";
  };

  const [offers, setOffers] = useState(data);

  const onFilterOffers = (str: string) => {
    str = str.toLowerCase();
    if (str === "") {
      const newOffers = {
        ...data,
      };
      setOffers(newOffers);
      return;
    }
    const newOffers = offers[isOnOfferType()].filter(
      (offer) =>
        offer.name.toLowerCase().includes(str) ||
        offer.tags.some((tag) => tag.toLowerCase().includes(str))
    );

    setOffers({ ...data, [isOnOfferType()]: newOffers });
  };

  const [input, setInput] = useState("");
  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInput(ev.target.value);
  };

  useEffect(() => {
    onFilterOffers(input);
  }, [input]);

  useEffect(() => {
    setInput("");
  }, [isJobOffer]);

  return {
    isJobOffer,
    onJobOffer,
    onServiceOffer,
    isOnOfferType,
    offers,
    input,
    onChange,
  };
};

export { useSearchBar };
