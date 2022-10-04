import React, { useEffect } from "react";
import Modal from "../Modal";

export interface Props {
  error: ErrorProps;
  setError: React.Dispatch<React.SetStateAction<ErrorProps>>;
  setErrorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  errorOpen: boolean;
}

type ErrorProps = {
  errorHeader: string;
  errorDescription: string;
};

const ErrorModal: React.FC<Props> = ({ error, setError, setErrorOpen, errorOpen }: Props) => {
  // have error open for 5 seconds unless user closes
  useEffect(() => {
    const timer = setTimeout(() => {
      setError({
        errorHeader: "",
        errorDescription: "",
      });
      setErrorOpen(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <Modal isOpen={errorOpen} setIsOpen={setErrorOpen}>
      <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 " role="alert">
        <p className="text-lg md:text-3xl">{error.errorDescription}</p>
      </div>
    </Modal>
  );
};

export default ErrorModal;
