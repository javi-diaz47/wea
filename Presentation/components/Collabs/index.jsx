import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";

// interface Props {
//   icon: JSX.Element;
//   title: string;
//   desc: string;
//   onClick: (openNumber: number) => void;
// }

const Collabs = ({ id, icon, title, desc, handleOpen, open }) => {
  return (
    <article className="border-b-2 border-separator ">
      <Accordion
        open={open === id}
        className="flex flex-col justify-start text-lg  align-center"
      >
        <AccordionHeader
          className="flex justify-start gap-2 font-normal"
          onClick={() => handleOpen(id)}
        >
          {icon}
          {title}
        </AccordionHeader>
        <AccordionBody className="h-full">{desc}</AccordionBody>
      </Accordion>
    </article>
  );
};

export { Collabs };
