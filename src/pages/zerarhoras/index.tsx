import { useState } from 'react';
import { ButtonBack, Calcular, Container, Content, ContentButton, ContentInput, Header, LabelInput, Time, Titulo } from './styles';
import Imagem from '../../components/imagem';
import { useNavigate } from 'react-router-dom';
import Help from '../../components/help';

type WorkHoursCalculationResult = {
  exitTime: string;
};

const calculateExitTime = (bankHours: number, entryTime: string): WorkHoursCalculationResult => {
  const [entryHours, entryMinutes] = entryTime.split(':').map(Number);
  const mandatoryWorkHours = 8;
  const lunchBreak = 1;
  const totalWorkTime = mandatoryWorkHours + lunchBreak - bankHours;

  let exitHours = entryHours + Math.floor(totalWorkTime);
  let exitMinutes = entryMinutes + Math.round((totalWorkTime % 1) * 60);

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
  const [bankHours, setBankHours] = useState<number>(0);
  const [entryTime, setEntryTime] = useState<string>('09:00');
  const [result, setResult] = useState<WorkHoursCalculationResult | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleCalculate = () => {
    try {
      const { exitTime } = calculateExitTime(bankHours, entryTime);
      setResult({ exitTime });
    } catch (error: any) {
      alert(error.message);
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
            <Titulo>Gestão de Horas</Titulo>
            <ContentInput>
              <LabelInput>Horas no banco:</LabelInput>
              <Time
                type="number"
                value={bankHours}
                onChange={(e) => setBankHours(Number(e.target.value))}
                placeholder="Horas no banco"
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
            <Calcular onClick={handleCalculate}>Calcular</Calcular>
            {result && (
              <div>
                <p>Hora de saída: {result.exitTime}</p>
              </div>
            )}
          </Content>
        </Header>
      </Container>
    </>
  );
}
