import { MenuAlt4Icon, XIcon } from "@heroicons/react/outline";

interface Props {
  navigation: boolean;
  notification: boolean;
  onNavigation: () => void;
}

const MenuBurgerButtonIcon = ({
  onNavigation,
  navigation,
  notification,
}: Props) => {
  return (
    <button onClick={onNavigation} className="z-20">
      {!navigation && (
        <MenuAlt4Icon
          className={`w-10 h-10 duration-200 delay-200 ${
            notification ? "opacity-0" : " opacity-100"
          }`}
        />
      )}
      {!!navigation && <XIcon className="w-10 h-10" />}
    </button>
  );
};

export { MenuBurgerButtonIcon };
