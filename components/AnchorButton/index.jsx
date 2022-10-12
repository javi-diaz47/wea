import Link from 'next/link';

const AnchorButton = ({ text, href }) => {
  return (
    <Link href={href}>
      <a className=" border border-primary text-primary h-fit py-1 px-3 rounded-full shadow-sm hover:bg-primary hover:text-white duration-200">
        {text}
      </a>
    </Link>
  );
};

export { AnchorButton };
