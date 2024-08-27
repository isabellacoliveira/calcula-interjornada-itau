import { useState } from 'react';
import InputMask from 'react-input-mask';
import { ButtonBack, Calcular, Container, Content, ContentButton, ContentInput, Header, LabelInput, Time, Titulo } from './styles';
import Imagem from '../../components/imagem';
import { useNavigate } from 'react-router-dom';
import Help from '../../components/help';

type WorkHoursCalculationResult = {
  exitTime: string;
};

const calculateExitTime = (bankHours: string, entryTime: string): WorkHoursCalculationResult => {
  const [entryHours, entryMinutes] = entryTime.split(':').map(Number);
  const [bankHoursValue, bankMinutesValue] = bankHours.split(':').map(Number);
  const maxWorkHoursPerDay = 10;
  const mandatoryWorkHours = 8;
  const lunchBreak = 1;
  
  const bankHoursInHours = bankHoursValue + (bankMinutesValue / 60);
  const totalWorkTimeRequired = mandatoryWorkHours + lunchBreak + bankHoursInHours;
  
  // Ensure we don't exceed the maximum work hours per day
  const workHoursToFit = Math.min(totalWorkTimeRequired, maxWorkHoursPerDay);

  let exitHours = entryHours + Math.floor(workHoursToFit);
  let exitMinutes = entryMinutes + Math.round((workHoursToFit % 1) * 60);

  if (exitMinutes >= 60) {
    exitHours += Math.floor(exitMinutes / 60);
    exitMinutes %= 60;
  }

  const formattedExitTime = `${exitHours.toString().padStart(2, '0')}:${exitMinutes.toString().padStart(2, '0')}`;

  return {
    exitTime: formattedExitTime
  };
};

export default function ZerarHoras() {
  const [bankHours, setBankHours] = useState<string>('00:00');
  const [entryTime, setEntryTime] = useState<string>('09:00');
  const [result, setResult] = useState<WorkHoursCalculationResult | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleCalculate = () => {
    if (!/^(\d{1,2}):(\d{2})$/.test(bankHours)) {
      alert('Formato de horas no banco inválido.');
      setResult(null);
      return;
    }

    try {
      const { exitTime } = calculateExitTime(bankHours, entryTime);
      setResult({ exitTime });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/[^0-9:]/g, '');
    if (cleanedValue.length <= 5 && /^[0-2]?[0-9]:[0-5][0-9]?$/.test(cleanedValue)) {
      setter(cleanedValue);
    }
  };

  const toggleVisibility = (isOpen: boolean) => {
    setIsVisible(isOpen);
  };

  return (
    <>
      <Container>
        <ContentButton>
          <ButtonBack onClick={() => navigate('/')}>
            voltar
          </ButtonBack>
        </ContentButton>
        <Help onModalChange={toggleVisibility} />
        <Header>
          <Content>
            {!isVisible && <Imagem />}
            <Titulo>Em Manutenção</Titulo>
            {/* <Titulo>Gestão de Horas</Titulo> */}
            {/* <ContentInput>
              <LabelInput>Horas no banco:</LabelInput>
              <InputMask
                mask="99:99"
                value={bankHours}
                onChange={handleChange(setBankHours)}
                placeholder="HH:MM"
                maskChar={null}
              />
            </ContentInput>
            <ContentInput>
              <LabelInput>Horário de entrada:</LabelInput>
              <Time
                type="time"
                value={entryTime}
                onChange={(e) => setEntryTime(e.target.value)}
              />
            </ContentInput>
            <Calcular onClick={handleCalculate}>calcular</Calcular>
            {result && (
              <div>
                <p>Hora de saída: {result.exitTime}</p>
              </div>
            )} */}
          </Content>
        </Header>
      </Container>
    </>
  );
}
