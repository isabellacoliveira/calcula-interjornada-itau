import { useEffect, useState } from 'react';
import Modal from '../modal-reuso';
import { HelpButton, HelpContent } from './styles';

type WarningProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Warning({ isOpen, onClose }: WarningProps) {
  return (
    <>
      <Modal isOpen={isOpen} closeModal={onClose}>
        <HelpContent>
          <h2>Cuidado!</h2>
          <p>
            Você excedeu o limite máximo de horas que uma pessoa pode fazer ao dia...
          </p>
          <p>
            Lembre-se de não deixar para zerar suas horas no último dia!
          </p>
          <p>
            Converse com o seu gestor
          </p>
        </HelpContent>
      </Modal>
    </>
  );
}
