import logo from './assets/Itaú_Unibanco_logo_2023.svg.png';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import { enviarEmail } from './shared/sendEmail';
import Modal from './components/ModalEmail';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [saida, setSaida] = useState(() => localStorage.getItem('saida') || '');
  const [proximoHorario, setProximoHorario] = useState('');
  const [mensagem, setMensagem] = useState('Você já pode começar a trabalhar agora.');
  const [showModal, setShowModal] = useState(false);
  const [modalFocus, setModalFocus] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (saida) {
      localStorage.setItem('saida', saida);

      const [hora, minuto] = saida.split(':').map(Number);
      const horarioSaida = new Date();
      horarioSaida.setHours(hora, minuto, 0, 0);

      const horarioRetorno = new Date(horarioSaida.getTime() + 11 * 60 * 60 * 1000);
      const diaSemana = horarioRetorno.getDay();

      if (diaSemana === 6 || diaSemana === 0) {
        setMensagem('Você não pode logar no final de semana');
      } else {
        if (horarioRetorno.getHours() < 7) {
          setMensagem('Você já pode começar a trabalhar agora. \n Obs: você só pode começar a trabalhar após as 7h.');
          horarioRetorno.setHours(7, 0, 0, 0);
        }

        setProximoHorario(horarioRetorno.toLocaleTimeString());

        const tempoRestante = horarioRetorno.getTime() - new Date().getTime();

        if (tempoRestante > 0) {
          setTimeout(() => {
            toast.success('Você pode começar a trabalhar agora.');
          }, tempoRestante);
        } else {
          toast.success("Você já pode começar a trabalhar.");
        }
      }
    }
  }, [saida]);

  const handleOpenModal = () => {
    setShowModal(true);
    setModalFocus(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleEmailSubmit = (email: string, nome: string) => {
    const colaborador = {
      email,
      nome,
      horaParaTrabalhar: proximoHorario,
      mensagem: mensagem
    };
    enviarEmail(colaborador);
    setShowModal(false);
    toast.success('Email enviado com sucesso!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Logo do Itaú Unibanco" />
        <h4>Bem-vindo(a) ao Calcula-Interjornada!</h4>
        <p>Por favor, insira seu horário de saída:</p>
        <div className='actions'>
          <input
            className="time"
            type="time"
            value={saida}
            onChange={(e) => setSaida(e.target.value)}
            aria-label="Horário de saída"
            ref={inputRef}
          />
          <button
            className="button-send"
            onClick={handleOpenModal}
            aria-label="Enviar horário para o e-mail"
          >
            enviar para o e-mail
          </button>
        </div>
        {proximoHorario && (
          <p>Você poderá trabalhar novamente às {proximoHorario}</p>
        )}

        <Modal
          show={showModal}
          onClose={handleCloseModal}
          onEmailSubmit={handleEmailSubmit}
          aria-labelledby="modal-title"
        />
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </header>
      <footer className="App-footer">
        <p aria-label="Desenvolvido por: Isabella C Oliveira - 2024">
          Desenvolvido por: Isabella C Oliveira - 2024
        </p>
      </footer>
    </div>
  );
}

export default App;
