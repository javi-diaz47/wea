import Image from "next/image";
import user from "@/public/user.jpg";
import { ProfilePhoto } from "../../ProfilePhoto";
import { useEffect, useRef, useState } from "react";

const ProfilePagePhoto = ({ name, last_name, picture }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [uploadData, setUploadData] = useState(null);

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent: ProgressEvent<FileReader>) => {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  return (
    <div className="flex items-center flex-col relative">
      {/* <ProfilePhoto href="./" width="w-24" height="h-24" /> */}
      <div className="group text-white w-40 aspect-square relative rounded-full overflow-hidden">
        <Image
          src={imageSrc || user}
          alt="foto de perfil"
          layout="fill"
          objectFit="cover"
        />
        <div className="group-hover:bg-[#ffffff70] group-hover:text-black font-medium text-transparent w-40 h-11 flex justify-center items-start absolute -bottom-2 left-1/2 -translate-x-1/2  duration-300">
          <input
            className="absolute hidden"
            value=""
            onChange={handleOnChange}
            type="file"
            id="file"
          />
          <label htmlFor="file">Cambiar foto</label>
        </div>
      </div>
      <div className="text-2xl w-48 text-center">
        <strong>{name || ""}</strong> {last_name || ""}
      </div>
    </div>
  );
};

export { ProfilePagePhoto };
