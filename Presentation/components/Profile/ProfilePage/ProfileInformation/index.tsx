import { Collabs } from "Presentation/components/Collabs";
import { cloneElement, useState } from "react";
import {
  UserIcon,
  ClipboardListIcon,
  PhoneIcon,
} from "@heroicons/react/outline";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useBooleanState } from "@/hooks/useBooleanState";
import Link from "next/link";
import { AnchorButton } from "@/components/AnchorButton";

interface Props {
  who_am_i: string;
  resume: string;
  contact_me: string;
  children?: JSX.Element;
  services: Array<any>;
  offers: Array<any>;
}

const ProfileInformation = ({
  who_am_i,
  resume,
  contact_me,
  services,
  offers,
  children,
}: Props) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <section className="flex flex-col gap-8 ">
      <Collabs
        handleOpen={handleOpen}
        id={1}
        open={open}
        title={"¿Quién soy?"}
        icon={<UserIcon className="w-8 h-8 text-primary" />}
        desc={who_am_i}
      />
      <Collabs
        handleOpen={handleOpen}
        id={2}
        open={open}
        title={"Mis Servicios"}
        icon={<ClipboardListIcon className="w-8 h-8 text-primary" />}
        desc={
          <div className="flex flex-col">
            {services.length !== 0 &&
              services.map(({ id, name }) => (
                <div
                  key={`profile-services-${id}`}
                  className="text-xl flex justify-between"
                >
                  {name}
                  <Link href={`/services/${id}`}>
                    <a className="text-primary border-primary hover:bg-primary bg-transparent rounded-full">
                      ver oferta
                    </a>
                  </Link>
                </div>
              ))}
          </div>
        }
      />
      <Collabs
        handleOpen={handleOpen}
        id={3}
        open={open}
        title={"Trabajos que he ofrecido"}
        icon={<ClipboardListIcon className="w-8 h-8 text-primary" />}
        desc={
          <div className="flex flex-col">
            {offers.length !== 0 &&
              offers.map(({ id, name }) => (
                <div
                  key={`profile-offers-${id}`}
                  className="text-xl flex justify-between"
                >
                  {name}
                  <Link href={`/offers/${id}`}>
                    <a className="text-primary border-primary hover:bg-primary bg-transparent rounded-full">
                      ver oferta
                    </a>
                  </Link>
                </div>
              ))}
          </div>
        }
      />

      {children}
    </section>
  );
};
export { ProfileInformation };
