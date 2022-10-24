import Link from "next/link";
import { useRouter } from "next/router";
import { cloneElement } from "react";

const NavbarIcon = ({ href, title, icon, onClick }) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        onClick={onClick}
        className={`
         w-24 flex flex-col justify-center align-center place-items-center text-center
        ${router.pathname === href ? "text-primary" : ""}
      `}
      >
        {!!icon && cloneElement(icon, { className: "w-8 h-8" })}
        {title}
      </a>
    </Link>
  );
};

export { NavbarIcon };
