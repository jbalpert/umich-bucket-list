// generic modal component - when someone clicks outside of the modal, it closes
import React from "react";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Modal = ({ children, isOpen, setIsOpen }: Props) => {
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-modalBG z-50"
          onClick={closeModal}>
          <div className="mx-6">{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
