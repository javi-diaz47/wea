import { Wea } from "../Icons/Wea";
const Footer = () => {
  return (
    <footer className="bg-black flex w-full absolute -bottom-16 translate-y-[100%] ">
      <ul className="text-white md:w-1/2 mx-3 my-3 text-xl space-y-3">
        <li className=" pt-4">
          <Wea fill="#fff" className="" />
        </li>
        <li className="">Acerca de nosotros</li>
        <li className="">Contactanos</li>
        <li className="">Ayuda</li>
        <li className="">Creado con &hearts; desde Colombia</li>
        <div className="flex flex-row space-x-10 py-2">
          <li>
            <img
              src="https://i.postimg.cc/CLDhnyGK/icons8-facebook-f-42.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="https://i.postimg.cc/Y9y9RpVc/icons8-twitter-42.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="https://i.postimg.cc/0QgZQwPj/icons8-instagram-42.png"
              alt=""
            />
          </li>
        </div>
      </ul>
    </footer>
  );
};

export { Footer };
