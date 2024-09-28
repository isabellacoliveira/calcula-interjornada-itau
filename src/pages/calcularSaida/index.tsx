import React, { useState } from 'react';
import { Container } from './styles';
import Imagem from '../../components/imagem';

export default function CalcularSaida() {
    const [horaEntrada, setHoraEntrada] = useState('');
    const [tipoFuncionario, setTipoFuncionario] = useState('');
    const [horaSaida, setHoraSaida] = useState('');
    const [almoço, setAlmoço] = useState(1);
    const [tempoAlmoço, setTempoAlmoço] = useState('');

    const calcularSaida = () => {
        if (!horaEntrada || !tipoFuncionario) {
            alert('Por favor, insira a hora de entrada e selecione o tipo de funcionário.');
            return;
        }

        const [hora, minutos] = horaEntrada.split(':').map(Number);
        let horasTrabalho = 0;

        if (tipoFuncionario === 'estagiario') {
            horasTrabalho = 6;
            if (tempoAlmoço === '15') {

                setAlmoço(0.25)
            } else {
                setAlmoço(1);
            }
        } else if (tipoFuncionario === 'efetivo') {
            horasTrabalho = 8;
            setAlmoço(1);
        }

        const totalHorasTrabalho = horasTrabalho + almoço;
        const horaTotal = hora + totalHorasTrabalho;
        const horaSaidaCalculada = `${String(horaTotal).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;

        setHoraSaida(horaSaidaCalculada);
    };

    const alterarAlmoçoEstagiario = () => {
        setTempoAlmoço('15');
        calcularSaida();
    };

    const alterarAlmoçoEfetivo = (novasHoras: any) => {
        setTempoAlmoço(novasHoras);
        calcularSaida();
    };

    return (
        // <div>
        //     <h1>Calculadora de Horário de Saída</h1>
        //     <label>
        //         Tipo de Funcionário:
        //         <select
        //             value={tipoFuncionario}
        //             onChange={(e) => setTipoFuncionario(e.target.value)}
        //         >
        //             <option value="">Selecione</option>
        //             <option value="estagiario">Estagiário</option>
        //             <option value="efetivo">Efetivo</option>
        //         </select>
        //     </label>

        //     {tipoFuncionario && (
        //         <>
        //             <br />
        //             <label>
        //                 Hora de Entrada (HH:MM):
        //                 <input
        //                     type="time"
        //                     value={horaEntrada}
        //                     onChange={(e) => setHoraEntrada(e.target.value)}
        //                 />
        //             </label>
        //             <br />
        //             <button onClick={calcularSaida}>Calcular Horário de Saída</button>

        //             {tipoFuncionario === 'estagiario' && (
        //                 <div>
        //                     <button onClick={alterarAlmoçoEstagiario}>Almoço de 15 minutos</button>
        //                 </div>
        //             )}

        //             {tipoFuncionario === 'efetivo' && (
        //                 <div>
        //                     <label>
        //                         Tempo de Almoço (horas):
        //                         <input
        //                             type="number"
        //                             min="1"
        //                             max="2"
        //                             step="0.5"
        //                             defaultValue="1"
        //                             onChange={(e) => alterarAlmoçoEfetivo(parseFloat(e.target.value))}
        //                         />
        //                     </label>
        //                 </div>
        //             )}
        //         </>
        //     )}

        //     {horaSaida && (
        //         <div>
        //             <h2>Horário de Saída: {horaSaida}</h2>
        //         </div>
        //     )}
        // </div>
        <>
            <Container>
                Em desenvolvimento
            </Container>
        </>
    );
}
