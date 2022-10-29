interface EmptyType {
  text: string;
}

const Empty = ({ text }) => {
  return (
    <div className="flex flex-col items-center gap-4 text-center text-2xl text-primary ">
      <div className="w-32 h-32 bg-primary"></div>
      {text}
    </div>
  );
};

export { Empty };
