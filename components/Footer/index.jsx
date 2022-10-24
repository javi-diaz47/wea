import { Facebook } from "../Icons/Facebook";
import { Wea } from "../Icons/Wea";
const Footer = () => {
  return (
    <footer className="bg-black md:flex w-full absolute bottom-0">
      <ul className="text-white md:w-1/2 mx-3 my-3 px-2">
        <li>
          <Wea fill="#fff" className="" />
        </li>
        <li className="">Acerca de nosotros</li>
        <li className="">Contactanos</li>
        <li className="">Ayuda</li>
        <li className="">Creado con &hearts; desde Colombia</li>
      </ul>

      <div className="flex md:w-1/2 md:justify-end md:items-end ">
        <div className="md:w-1/2 flex my-2 mx-2">
          <div className="px-2">
            <Facebook />
          </div>
          <div className="px-2">
            <img src="/public/img/instagram 1.svg" alt="Logo instagram" />
          </div>
          <div className="px-2">
            <img src="/public/img/twitter 1.svg" alt="Logo twitter" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
