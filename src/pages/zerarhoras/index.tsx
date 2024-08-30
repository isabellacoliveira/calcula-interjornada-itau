import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import {
  BotaoLimpar,
  ButtonBack,
  Calcular,
  Container,
  Content,
  ContentButton,
  ContentInput,
  Header,
  HelpButton,
  HourBank,
  LabelInput,
  Time,
  Titulo
} from './styles';
import Imagem from '../../components/imagem';
import Warning from '../../components/warning';
import Help from '../../components/help';
import Footer from '../../components/footer';

type WorkHoursCalculationResult = {
  exitTime: string;
  workHoursToday: string;
};

const calculateExitTime = (
  bankHours: number,
  bankMinutes: number,
  entryTime: string,
  lunchHours: number,
  lunchMinutes: number
): WorkHoursCalculationResult | null => {
  const [entryHours, entryMinutes] = entryTime.split(':').map(Number);
  const maxWorkHoursPerDay = 10;
  const mandatoryWorkHours = 8;

  const bankHoursInHours = bankHours + (bankMinutes / 60);
  const lunchHoursInHours = lunchHours + (lunchMinutes / 60);

  if (bankHoursInHours > maxWorkHoursPerDay) {
    return null;
  }

  const remainingWorkHours = mandatoryWorkHours - bankHoursInHours;
  const totalWorkTime = remainingWorkHours + lunchHoursInHours;

  let exitHours = entryHours + Math.floor(totalWorkTime);
  let exitMinutes = entryMinutes + Math.round((totalWorkTime % 1) * 60);

  if (exitMinutes >= 60) {
    exitHours += Math.floor(exitMinutes / 60);
    exitMinutes %= 60;
  }

  const formattedExitTime = `${exitHours.toString().padStart(2, '0')}:${exitMinutes.toString().padStart(2, '0')}`;
  const workHoursTodayFormatted = `${Math.floor(remainingWorkHours).toString().padStart(2, '0')}:${Math.round((remainingWorkHours % 1) * 60).toString().padStart(2, '0')}`;

  return {
    exitTime: formattedExitTime,
    workHoursToday: workHoursTodayFormatted,
  };
};

export default function ZerarHoras() {
  const [bankHours, setBankHours] = useState<string>('00');
  const [bankMinutes, setBankMinutes] = useState<string>('00');
  const [lunchHours, setLunchHours] = useState<string>('01'); // Ajustado para o mínimo de 1h
  const [lunchMinutes, setLunchMinutes] = useState<string>('00');
  const [entryTime, setEntryTime] = useState<string>('09:00');
  const [result, setResult] = useState<WorkHoursCalculationResult | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [passoDoFormulario, setPassoDoFormulario] = useState(1);
  const navigate = useNavigate();

  const handleCalculate = () => {
    const hoursB = parseInt(bankHours, 10) || 0;
    const minutesB = parseInt(bankMinutes, 10) || 0;
    const hoursL = parseInt(lunchHours, 10) || 0;
    const minutesL = parseInt(lunchMinutes, 10) || 0;

    if (minutesB < 0 || minutesB > 59 || minutesL < 0 || minutesL > 59) {
      alert('Minutos inválidos. Insira um valor entre 0 e 59.');
      setResult(null);
      setMessage(null);
      return;
    }

    try {
      const calculationResult = calculateExitTime(hoursB, minutesB, entryTime, hoursL, minutesL);
      if (calculationResult === null) {
        setIsWarningModalOpen(true);
        setResult(null);
      } else {
        setResult(calculationResult);
        setMessage(null);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  function openModal(){
    setIsHelpModalOpen(true);
  }

  const handleHoursChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 2) {
      setter(value);
    }
  };

  const handleMinutesChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const minutes = parseInt(value, 10);
    if (value.length <= 2 && (isNaN(minutes) || (minutes >= 0 && minutes <= 59))) {
      setter(value);
    }
  };

  function proximosItens() {
    setPassoDoFormulario(2);
  }

  function proximosItens2() {
    setPassoDoFormulario(3);
  }

  function limparForm(){
    setBankHours("")
    setBankMinutes("")
    setLunchHours("")
    setLunchMinutes("")
    setEntryTime("")
    setResult(null)
    setMessage("")
    setPassoDoFormulario(1);
  }

  const areBankFieldsFilled = bankHours.trim() !== '' && bankMinutes.trim() !== '';
  const areLunchFieldsFilled = lunchHours.trim() !== '' && lunchMinutes.trim() !== '';
  const isEntryTimeFilled = entryTime.trim() !== '';

  return (
    <>
      <Container>
        <ContentButton>
          <ButtonBack onClick={() => navigate('/')}>voltar</ButtonBack>
        </ContentButton>
        <Warning
          isOpen={isWarningModalOpen}
          onClose={() => setIsWarningModalOpen(false)}
        />
        <HelpButton className="help-button" onClick={openModal}>
          ?
        </HelpButton>
         <Help
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
        />
        <Header>
          <Content>
            {!isWarningModalOpen && !isHelpModalOpen && <Imagem />}
            {passoDoFormulario === 1 ? <>
              <Titulo>Gestão de Horas</Titulo>
              <HourBank>
                <ContentInput>
                  <LabelInput>Horas extras (horas):</LabelInput>
                  <Time
                    type="text"
                    value={bankHours}
                    onChange={handleHoursChange(setBankHours)}
                    placeholder="HH"
                    maxLength={2}
                  />
                </ContentInput>
                <ContentInput>
                  <LabelInput>Horas extras (minutos):</LabelInput>
                  <Time
                    type="text"
                    value={bankMinutes}
                    onChange={handleMinutesChange(setBankMinutes)}
                    placeholder="MM"
                    maxLength={2}
                  />
                </ContentInput>
                <Calcular onClick={() => proximosItens()} disabled={!areBankFieldsFilled}>próximo</Calcular>
              </HourBank>
            </> : ""}

            {passoDoFormulario === 2 ? <>
              <Titulo>Tempo de Almoço</Titulo>
              <HourBank>
                <ContentInput>
                  <LabelInput>Horas</LabelInput>
                  <Time
                    type="text"
                    value={lunchHours}
                    onChange={handleHoursChange(setLunchHours)}
                    placeholder="HH"
                    maxLength={2}
                  />
                </ContentInput>
                <ContentInput>
                  <LabelInput>Minutos:</LabelInput>
                  <Time
                    type="text"
                    value={lunchMinutes}
                    onChange={handleMinutesChange(setLunchMinutes)}
                    placeholder="MM"
                    maxLength={2}
                  />
                </ContentInput>
                <Calcular onClick={() => proximosItens2()} disabled={!areLunchFieldsFilled}>próximo</Calcular>
              </HourBank></> : ""}

            {passoDoFormulario === 3 ? <>
              <Titulo>Por favor, insira seu horário de entrada</Titulo>
              <HourBank>
                <ContentInput>
                  <LabelInput>Horário de entrada:</LabelInput>
                  <Time
                    type="time"
                    value={entryTime}
                    onChange={(e) => setEntryTime(e.target.value)}
                  />
                </ContentInput>
                <Calcular onClick={handleCalculate} disabled={!isEntryTimeFilled}>calcular</Calcular>
              </HourBank>
            </> : ""}
            {message && <div>{message}</div>}
            {result && (
              <div>
                <p>Horas de trabalho necessárias hoje: {result.workHoursToday}</p>
                <p>Hora de saída: {result.exitTime}</p>
              </div>
            )}
            <BotaoLimpar>
              <Calcular onClick={() => limparForm()}>Limpar formulário</Calcular>
            </BotaoLimpar>
          </Content>
        </Header>
      </Container>
      <Footer />
    </>
  );
}
