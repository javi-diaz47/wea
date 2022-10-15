const Collabs = ({ icon, title, desc, onClick }) => {
  return (
    <article className="border-b-2 border-separator mb-6 py-4">
      <button
        className="flex text-lg gap-2 align-center"
        onClick={onClick ? onClick : null}
      >
        {icon}
        {title}
      </button>
      <div className="hidden">{desc}</div>
    </article>
  );
};

export { Collabs };
