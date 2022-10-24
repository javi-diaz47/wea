interface Props {
  name: string;
  className?: string;
  children?: JSX.Element;
}
const Tag = ({ name, className, children }: Props) => {
  return (
    <div
      className={`${className}
      w-fit py-1 px-3  font-semibold rounded-full bg-tag-bg hover:bg-[#F4F4F580] duration-200 text-primary shadow-md cursor-default
    `}
    >
      {!!children && children}
      <span>#{name}</span>
    </div>
  );
};

export { Tag };
