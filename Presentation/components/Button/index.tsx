interface Props {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: Props) => {
  return (
    <button
      className=" active:scale-95 active:shadow-lg text-white p-2 hover:bg-blue-500 bg-blue-600 bold duration-300 transition-all rounded-lg  mx-auto w-fit px-7 my-5 shadow-md"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { Button };
