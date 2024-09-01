import Modal from '../modal-reuso'; 
import { ButtonContinue, HelpContent } from './styles';

type WarRoomProps = {
  isOpen: boolean;
  onClose: () => void;
  setCanWork: any;
};

export default function WarRoom({ isOpen, onClose, setCanWork }: WarRoomProps) {
    function handleClick(){
        setCanWork(true);
    }

    function handleCancel(){

    }

    return (
    <Modal isOpen={isOpen} setCanWork={onClose}>
      <HelpContent>
        <h2>Tem certeza que deseja continuar?</h2>
        <div>
          <p>
            Você deve priorizar seu tempo de descanso.
          </p>
          <p>
            O trabalho no final de semana deve ser alinhado diretamente com o seu líder/gestor
          </p>
          <div>
            <ButtonContinue onClick={handleClick}>Continuar</ButtonContinue>
          </div>
        </div>
      </HelpContent>
    </Modal>
  );
}

<h2></h2>
