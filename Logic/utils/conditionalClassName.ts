interface Props {
  state: boolean;
  className: string;
  classNameAlt: string;
}

const conditionalClassName = ({ state, className, classNameAlt }: Props) => {
  return `${state ? className : classNameAlt}`;
};

export { conditionalClassName };
