import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onEmailSubmit: (email: string, nome: string) => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onEmailSubmit }) => {
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
    >
      <div
        className="modal-content"
        ref={modalRef}
        tabIndex={-1} 
      >
        <h2 className="modal-title">Envio de E-mail</h2>
        <input
          type="email"
          className="email-input"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="email-input"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button
          className="button-send"
          onClick={handleSubmit}
        >
          Enviar
        </button>
        <button
          className="button-close"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default Modal;
