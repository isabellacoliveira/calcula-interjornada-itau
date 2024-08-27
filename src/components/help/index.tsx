import { useEffect, useState } from 'react';
import Modal from '../modal-reuso';
import { HelpButton, HelpContent } from './styles';

type HelpProps = {
  onModalChange?: (isOpen: boolean) => void;
};

export default function Help({ onModalChange }: HelpProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    if (onModalChange) onModalChange(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (onModalChange) onModalChange(false);
  };

  useEffect(() => {
    if (!isModalOpen && onModalChange) {
      onModalChange(false);
    }
  }, [isModalOpen, onModalChange]);

  return (
    <>
      <HelpButton className="help-button" onClick={openModal}>
        ?
      </HelpButton>

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <HelpContent>
          <h2>Sobre o Aplicativo</h2>
          <p>
            Nosso aplicativo de gestão de horas foi projetado para ajudá-lo a gerenciar suas horas de trabalho de forma eficiente e cumprir suas metas de banco de horas. Com ele, você pode inserir suas horas acumuladas no banco de horas e o horário de entrada no trabalho (no último dia do mês), e o aplicativo calculará automaticamente o horário ideal de saída, considerando as horas que você precisa trabalhar diariamente e um intervalo obrigatório de 1 hora para o almoço.
          </p>
          <p>
            O aplicativo ajusta seu horário de trabalho para garantir que você utilize todas as horas do banco até o final do mês, ajudando a planejar seu dia e maximizar sua produtividade. Ideal para quem deseja um controle preciso e otimizado das suas horas de trabalho.
          </p>
          <p>
            Considerando que estamos no último dia para zerar seu banco de horas, insira seu horário de entrada e o aplicativo lhe mostrará que horas deve sair no dia de hoje para zerar o banco. 
          </p>
        </HelpContent>
      </Modal>
    </>
  );
}
