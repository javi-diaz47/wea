import Image from "next/image";
import EmptyImage from "@/public/empty.webp";

interface EmptyType {
  text: string;
}

const Empty = ({ text }: EmptyType) => {
  return (
    <div className="flex flex-col items-center gap-4 text-center text-2xl text-primary ">
      <div className="bg-slate-200 p-8 rounded-full">
        <figure
          className={`
              w-32 h-32   relative overflow-hidden 
            `}
        >
          <Image
            src={EmptyImage}
            alt="foto de perfil"
            layout="fill"
            objectFit="cover"
          />
        </figure>
      </div>
      {text}
    </div>
  );
};

export { Empty };
