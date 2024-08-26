import { HelpButton } from "./styles";

const Modal = ({ isOpen, closeModal, children }: any) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children} 
        <HelpButton onClick={closeModal}>fechar</HelpButton>
      </div>
    </div>
  );
};

export default Modal;
