interface Props {
  text: string;
  onClick: () => void;
  disabled: boolean;
}

const Button = ({ text, onClick, disabled }: Props) => {
  console.log(disabled);
  return (
    <button
      className={
        !disabled
          ? "active:scale-95 active:shadow-lg text-white p-2 hover:bg-blue-500 bg-blue-600 bold duration-300 transition-all rounded-lg  mx-auto w-fit px-7 my-5 shadow-md"
          : "text-white p-2 bg-slate-500 bold duration-300 transition-all rounded-lg  mx-auto w-fit px-7 my-5 shadow-md"
      }
      onClick={onClick}
      disabled={disabled || false}
    >
      {text}
    </button>
  );
};

export { Button };
