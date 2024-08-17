import logo from './assets/Itaú_Unibanco_logo_2023.svg.png';
import './App.css';
import { useEffect, useState } from 'react';
import { enviarEmail } from './shared/sendEmail';

function App() {
  const [saida, setSaida] = useState(() => {
    return localStorage.getItem('saida') || '';
  });
  const [proximoHorario, setProximoHorario] = useState('');

  useEffect(() => {
    if (saida) {
      localStorage.setItem('saida', saida);

      localStorage.setItem('teste', saida);

      const [hora, minuto] = saida.split(':').map(Number);
      const horarioSaida = new Date();
      horarioSaida.setHours(hora, minuto, 0, 0);

      const horarioRetorno = new Date(horarioSaida.getTime() + 11 * 60 * 60 * 1000);
      setProximoHorario(horarioRetorno.toLocaleTimeString());

      const tempoRestante = horarioRetorno.getTime() - new Date().getTime();

      if (tempoRestante > 0) {
        setTimeout(() => {
          console.log('aaaaa')
        }, tempoRestante);
      } else {
        console.log("Você já pode começar a trabalhar.");
      }
    }
  }, [saida]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h4>Bem-vindo(a) ao Calcula-Interjornada!</h4>
        <p>Por favor, insira seu horário de saída:</p>
        <input
          type="time"
          value={saida}
          onChange={(e) => setSaida(e.target.value)}
        />
        <button onClick={() => enviarEmail({ nome: "Isabella", email: "isaaholiveira15@gmail.com", horaParaTrabalhar: proximoHorario })
        }>
          Enviar para o e-mail
        </button>
        {proximoHorario && (
          <p>Você poderá trabalhar novamente às {proximoHorario}</p>
        )}
      </header>
    </div>
  );
}

export default App;
