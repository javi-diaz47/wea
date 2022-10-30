import { useBooleanState } from "./useBooleanState";

const useModal = () => {
  const {
    bool: modalOpen,
    onTrue: open,
    onFalse: close,
  } = useBooleanState(false);

  interface renderModalType {
    modal: JSX.Element | JSX.Element[];
    condition: boolean;
  }

  const renderModal = ({ modal, condition }: renderModalType) => {
    return condition ? modal : <></>;
  };

  return {
    modalOpen,
    open,
    close,
    renderModal,
  };
};

export { useModal };
