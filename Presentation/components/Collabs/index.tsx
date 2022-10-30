interface Props {
  icon: JSX.Element;
  title: string;
  desc: string;
  onClick?: () => void;
}

const Collabs = ({ icon, title, desc, onClick }: Props) => {
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
