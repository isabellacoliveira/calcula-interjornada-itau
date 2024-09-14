import { useEffect, useRef } from 'react';
import { HelpButton } from "./styles";

const Modal = ({ isOpen, closeModal, children }: any) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Guardar o elemento que estava focado antes de abrir o modal
      previouslyFocusedElement.current = document.activeElement as HTMLElement;

      // Focar o modal ou o primeiro elemento dentro do modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      // Retornar o foco para o elemento previamente focado ao fechar o modal
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        ref={modalRef}
        tabIndex={-1} 
        role="dialog"
        aria-modal="true"
      >
        {children}
        <HelpButton onClick={closeModal}>fechar</HelpButton>
      </div>
    </div>
  );
};

export default Modal;
