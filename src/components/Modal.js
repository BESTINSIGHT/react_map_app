import "../styles/components/modal.scss";
import { useEffect } from "react";

const Modal = ({ children, isOpen, setIsOpen, className }) => {
  useEffect(() => {
    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => {
      console.log("디스럭트");
      window.removeEventListener("keydown", escKeyModalClose);
    };
  }, []);

  return (
    <div className={isOpen ? "show-modal-background" : "hide-modal-background"}>
      <div
        className={`${className} modal-layout ${
          isOpen ? "show-modal" : "hide-modal"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
