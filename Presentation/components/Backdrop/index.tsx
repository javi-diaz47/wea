import { motion } from "framer-motion";

interface Props {
  children: JSX.Element;
  onClick: () => void;
}

const Backdrop = ({ children, onClick }: Props) => {
  return (
    <motion.div
      className="z-10 flex justify-center items-center fixed top-0 left-0 bottom-0 w-full h-screen bg-[#00000070]"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export { Backdrop };
