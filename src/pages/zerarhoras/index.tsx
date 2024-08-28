import { useState } from 'react';
import InputMask from 'react-input-mask';
import { ButtonBack, Calcular, Container, Content, ContentButton, ContentInput, Header, LabelInput, Time, Titulo } from './styles';
import Imagem from '../../components/imagem';
import { useNavigate } from 'react-router-dom';
import Warning from '../../components/warning';

type WorkHoursCalculationResult = {
  exitTime: string;
  workHoursToday: string;
};

const calculateExitTime = (bankHours: number, bankMinutes: number, entryTime: string): WorkHoursCalculationResult | null => {
  const [entryHours, entryMinutes] = entryTime.split(':').map(Number);
  const maxWorkHoursPerDay = 10;
  const mandatoryWorkHours = 8;
  const lunchBreak = 1;

  const bankHoursInHours = bankHours + (bankMinutes / 60);

  if (bankHoursInHours > maxWorkHoursPerDay) {
    return null; 
  }

  const totalWorkTimeRequired = mandatoryWorkHours + lunchBreak + bankHoursInHours;
  
  const workHoursToday = maxWorkHoursPerDay - lunchBreak - bankHoursInHours;
  
  let exitHours = entryHours + lunchBreak + Math.floor(workHoursToday);
  let exitMinutes = entryMinutes + Math.round((workHoursToday % 1) * 60);

  if (exitMinutes >= 60) {
    exitHours += Math.floor(exitMinutes / 60);
    exitMinutes %= 60;
  }

  const formattedExitTime = `${exitHours.toString().padStart(2, '0')}:${exitMinutes.toString().padStart(2, '0')}`;

  return {
    exitTime: formattedExitTime,
    workHoursToday: `${Math.floor(workHoursToday).toString().padStart(2, '0')}:${Math.round((workHoursToday % 1) * 60).toString().padStart(2, '0')}`,
  };
};

export default function ZerarHoras() {
  const [bankHours, setBankHours] = useState<string>('00');
  const [bankMinutes, setBankMinutes] = useState<string>('00');
  const [entryTime, setEntryTime] = useState<string>('09:00');
  const [result, setResult] = useState<WorkHoursCalculationResult | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCalculate = () => {
    const hours = parseInt(bankHours, 10) || 0;
    const minutes = parseInt(bankMinutes, 10) || 0;

    if (minutes < 0 || minutes > 59) {
      alert('Minutos inválidos. Insira um valor entre 0 e 59.');
      setResult(null);
      setMessage(null);
      return;
    }

    try {
      const result = calculateExitTime(hours, minutes, entryTime);
      if (result === null) {
        setIsWarningModalOpen(true); 
        setResult(null);
      } else {
        setResult(result);
        setMessage(null);
      }
      console.log(`Deu certo, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); 
    if (value.length <= 2) {
      setBankHours(value);
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); 
    const minutes = parseInt(value, 10);
    if (value.length <= 2 && (isNaN(minutes) || (minutes >= 0 && minutes <= 59))) {
      setBankMinutes(value);
    }
  };

  const toggleVisibility = (isOpen: boolean) => {
    setIsWarningModalOpen(isOpen);
  };

  return (
    <>
      <Container>
        <ContentButton>
          <ButtonBack onClick={() => navigate('/')}>
            voltar
          </ButtonBack>
        </ContentButton>
        {/* <Help isOpen={isWarningModalOpen} onClose={() => setIsWarningModalOpen(false)} /> */}
        <Warning isOpen={isWarningModalOpen} onClose={() => setIsWarningModalOpen(false)} />
        <Header>
          <Content>
            {!isWarningModalOpen && <Imagem />}
            <Titulo>Gestão de Horas</Titulo>
            <ContentInput>
              <LabelInput>Horas extras (horas):</LabelInput>
              <Time
                type="text"
                value={bankHours}
                onChange={handleHoursChange}
                placeholder="HH"
                maxLength={2}
                />
            </ContentInput>
            <ContentInput>
              <LabelInput>Horas extras (minutos):</LabelInput>
              <Time
                type="text"
                value={bankMinutes}
                onChange={handleMinutesChange}
                placeholder="MM"
                maxLength={2}
                />
            </ContentInput>
            {/* <Titulo>Tempo de Almoço</Titulo>
            <ContentInput>
              <LabelInput>Horas</LabelInput>
              <Time
                type="text"
                value={bankHours}
                onChange={handleHoursChange}
                placeholder="HH"
                maxLength={2}
              />
            </ContentInput>
            <ContentInput>
              <LabelInput>minutos:</LabelInput>
              <Time
                type="text"
                value={bankMinutes}
                onChange={handleMinutesChange}
                placeholder="MM"
                maxLength={2}
              />
            </ContentInput> */}
            <ContentInput>
              <LabelInput>Horário de entrada:</LabelInput>
              <Time
                type="time"
                value={entryTime}
                onChange={(e) => setEntryTime(e.target.value)}
              />
            </ContentInput>
            <Calcular onClick={handleCalculate}>calcular</Calcular>
            {message && <div>{message}</div>}
            {result && (
              <div>
                <p>Horas de trabalho necessárias hoje: {result.workHoursToday}</p>
                <p>Hora de saída: {result.exitTime}</p>
              </div>
            )}
          </Content>
        </Header>
      </Container>
    </>
  );
}
