import React, { useEffect } from "react";
import Modal from "../Modal";
import { UseGlobalState } from "../../../contexts/GlobalStateContext";

const ErrorModal: React.FC = () => {
  const { isErrorOpen, setIsErrorOpen, error, setError } = UseGlobalState();
  // have error open for 5 seconds unless user closes
  useEffect(() => {
    const timer = setTimeout(() => {
      setError({
        header: "",
        message: "",
      });
      setIsErrorOpen(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [error, setError, setIsErrorOpen]);

  return (
    <Modal isOpen={isErrorOpen} setIsOpen={setIsErrorOpen}>
      <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 " role="alert">
        <p className="text-lg md:text-3xl">{error?.message}</p>
      </div>
    </Modal>
  );
};

export default ErrorModal;
