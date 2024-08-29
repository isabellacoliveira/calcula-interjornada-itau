import Modal from '../modal-reuso'; // Certifique-se de ter o tipo correto para as propriedades do Modal
import { HelpContent } from './styles';

type WarningProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Warning({ isOpen, onClose }: WarningProps) {
  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <HelpContent>
        <h2>Cuidado!</h2>
        <div>
          <p>
            Você excedeu o limite máximo de horas que uma pessoa pode fazer ao dia...
          </p>
          <p>
            Lembre-se de não deixar para zerar suas horas no último dia!
          </p>
          <p>
            Converse com o seu gestor
          </p>
        </div>
      </HelpContent>
    </Modal>
  );
}

<h2></h2>
