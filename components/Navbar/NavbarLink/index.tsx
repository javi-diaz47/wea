import Link from "next/link";

interface Props {
  href: string;
  children?: JSX.Element | JSX.Element[];
}

const NavbarLink = ({ href, children }: Props) => {
  return (
    <Link href={`${href}`}>
      <a>{children}</a>
    </Link>
  );
};

export { NavbarLink };
