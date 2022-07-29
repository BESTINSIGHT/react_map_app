import "../styles/components/modal.scss";
import { useEffect } from "react";
import Button from "./Button";
import Input from "./Input";

const Modal = ({ children, isOpen, setIsOpen, className }) => {
  useEffect(() => {
    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
  }, []);

  return (
    <div
      className={`${className} modal-layout ${
        isOpen ? "show-modal" : "hide-modal"
      }`}
    >
      <div>{children}</div>
    </div>
  );
};

export default Modal;
