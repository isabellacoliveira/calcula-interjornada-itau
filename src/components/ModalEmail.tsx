import React, { useState } from 'react';
import './styles.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onEmailSubmit: (email: string, nome: string) => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onEmailSubmit }) => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');

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
    <div className="modal-overlay">
      <div className="modal-content">
        <input
          type="email"
          className="email-input"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="colabordor"
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
        <button className="button-close" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default Modal;
