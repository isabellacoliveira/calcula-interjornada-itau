import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onEmailSubmit: (email: string, nome: string) => void;
  ariaLabelledBy?: string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onEmailSubmit, ariaLabelledBy }) => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && modalRef.current) {
      modalRef.current.focus();
    }
  }, [show]);

  if (!show) {
    return null;
  }

  const handleSubmit = () => {
    onEmailSubmit(email, nome);
    setEmail('');
    setNome('');
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-labelledby={ariaLabelledBy}
      aria-modal="true"
    >
      <div
        className="modal-content"
        ref={modalRef}
        tabIndex={-1} // Ensure it can receive focus
      >
        <h2 id={ariaLabelledBy} className="modal-title">Envio de E-mail</h2>
        <input
          type="email"
          className="email-input"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="E-mail do colaborador"
        />
        <input
          type="text"
          className="email-input"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          aria-label="Nome do colaborador"
        />
        <button
          className="button-send"
          onClick={handleSubmit}
          aria-label="Enviar e-mail"
        >
          Enviar
        </button>
        <button
          className="button-close"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default Modal;
