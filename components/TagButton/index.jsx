const TagButton = ({ value, onClick }) => {
  return (
    <>
      <span>{value}</span>
      <button
        type="button"
        onClick={onClick}
        className="font-bold text-rose-700 hover:text-white"
      >
        X
      </button>
    </>
  );
};

export { TagButton };
