import Link from 'next/link';

const Navbar = ({ render }) => {
  return (
    <nav className="flex gap-8 bold text-lg">
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/protected">
        <a>Protected</a>
      </Link>
      <Link href="/offers">
        <a>Offers</a>
      </Link>

      {render()}
    </nav>
  );
};

export { Navbar };
