interface Props {
  label: string;
  children: JSX.Element;
  className?: string;
}

const InputWithLabel = ({ label, className, children }: Props) => {
  return (
    <div className={className ? className : " grid gap-2 w-full"}>
      <label>{label}</label>
      {children}
    </div>
  );
};

export { InputWithLabel };
