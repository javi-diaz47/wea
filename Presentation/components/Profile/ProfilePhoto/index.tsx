import Image from "next/image";
import Link from "next/link";
import user from "@/public/user.jpg";

interface Props {
  href: string;
  width?: string | number;
  height?: string | number;
}

const ProfilePhoto = ({ href, width, height }: Props) => {
  return (
    <>
      <Link href={`${href}`}>
        <a>
          <figure
            className={`
              ${width || "w-12"}
              ${height || "h-12"}
              rounded-full bg-slate-300 relative overflow-hidden 
            `}
          >
            <Image
              src={user}
              alt="foto de perfil"
              layout="fill"
              objectFit="cover"
            />
          </figure>
        </a>
      </Link>
    </>
  );
};

export { ProfilePhoto };
