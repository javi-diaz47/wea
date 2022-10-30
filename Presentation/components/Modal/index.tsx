import { Backdrop } from "../Backdrop";
import { motion } from "framer-motion";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ handleClose, title, text, icon }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(ev) => ev.stopPropagation()}
        className="text-center w-3/4 h-fit px-12 py-4 flex flex-col gap-2 justify-center items-center rounded-lg  bg-white"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p>{text}</p>
        {icon ? icon : <></>}
      </motion.div>
    </Backdrop>
  );
};

export { Modal };
