import Link from "next/link";

interface Props {
  href: string;
  children?: JSX.Element | JSX.Element[];
}

const NavbarLink = ({ href, children }: Props) => {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_ROOT_URL}/${href}`}>
      <a>{children}</a>
    </Link>
  );
};

export { NavbarLink };
