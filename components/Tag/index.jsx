const Tag = ({ name }) => {
  return (
    <div className=" w-fit py-1 px-3  font-semibold rounded-full bg-tag-bg hover:bg-[#F4F4F580] duration-200 text-primary shadow-sm cursor-default">
      <span># {name}</span>
    </div>
  );
};

export { Tag };
