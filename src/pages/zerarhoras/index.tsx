import { useEffect, useRef, useState } from 'react';
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
  const [lunchHours, setLunchHours] = useState<string>('01');
  const [lunchMinutes, setLunchMinutes] = useState<string>('00');
  const [entryTime, setEntryTime] = useState<string>('09:00');
  const [result, setResult] = useState<WorkHoursCalculationResult | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [passoDoFormulario, setPassoDoFormulario] = useState(1);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const helpButtonRef = useRef<HTMLButtonElement>(null);
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

  function openModal() {
    setIsHelpModalOpen(true);
  }

  useEffect(() => {
    if (!isHelpModalOpen && helpButtonRef.current) {
      helpButtonRef.current.focus();
    }
  }, [isHelpModalOpen]);

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

  function limparForm() {
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
          <ButtonBack
            aria-label="Voltar para a página inicial"
            onClick={() => navigate('/')}
            role="button">
            voltar
          </ButtonBack>
        </ContentButton>

        <Warning
          isOpen={isWarningModalOpen}
          onClose={() => setIsWarningModalOpen(false)}
          aria-label="Modal de aviso"
        />

        <HelpButton
          className="help-button"
          onClick={openModal}
          aria-label="Abrir ajuda"
          role="button"
          ref={helpButtonRef}
        >
          ?
        </HelpButton>

        <Help
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
          aria-label="Modal de ajuda"
        />

        <Header>
          <Content>
            {!isWarningModalOpen && !isHelpModalOpen &&
              <Imagem aria-label="Logo do Itaú Unibanco" aria-hidden="true" />
            }

            {passoDoFormulario === 1 && (
              <>
                <Titulo role="heading" aria-level={1}>Gestão de Horas</Titulo>
                <HourBank role="form" aria-label="Formulário para inserir horas extras">
                  <ContentInput>
                    <LabelInput aria-level={2}>Horas extras (horas):</LabelInput>
                    <Time
                      id="bankHours"
                      type="text"
                      value={bankHours}
                      onChange={handleHoursChange(setBankHours)}
                      placeholder="HH"
                      maxLength={2}
                      aria-label="Campo para inserir horas extras"
                      role="textbox"
                    />
                  </ContentInput>
                  <ContentInput>
                    <LabelInput aria-level={2}>Horas extras (minutos):</LabelInput>
                    <Time
                      id="bankMinutes"
                      type="text"
                      value={bankMinutes}
                      onChange={handleMinutesChange(setBankMinutes)}
                      placeholder="MM"
                      maxLength={2}
                      aria-label="Campo para inserir minutos extras"
                      role="textbox"
                    />
                  </ContentInput>
                  <Calcular
                    onClick={() => proximosItens()}
                    disabled={!areBankFieldsFilled}
                    aria-label="Próximo passo"
                    role="button"
                  >
                    próximo
                  </Calcular>
                </HourBank>
              </>
            )}

            {passoDoFormulario === 2 && (
              <>
                <Titulo role="heading" aria-level={1}>Tempo de Almoço</Titulo>
                <HourBank>
                  <ContentInput>
                    <LabelInput aria-level={2}>Horas</LabelInput>
                    <Time
                      id="lunchHours"
                      type="text"
                      value={lunchHours}
                      onChange={handleHoursChange(setLunchHours)}
                      placeholder="HH"
                      maxLength={2}
                      aria-label="Campo para inserir horas de almoço"
                      role="textbox"
                    />
                  </ContentInput>
                  <ContentInput>
                    <LabelInput aria-level={2}>Minutos:</LabelInput>
                    <Time
                      id="lunchMinutes"
                      type="text"
                      value={lunchMinutes}
                      onChange={handleMinutesChange(setLunchMinutes)}
                      placeholder="MM"
                      maxLength={2}
                      aria-label="Campo para inserir minutos de almoço"
                      role="textbox"
                    />
                  </ContentInput>
                  <Calcular
                    onClick={() => proximosItens2()}
                    disabled={!areLunchFieldsFilled}
                    aria-label="Próximo passo"
                    role="button"
                  >
                    próximo
                  </Calcular>
                </HourBank>
              </>
            )}

            {passoDoFormulario === 3 && (
              <>
                <Titulo role="heading" aria-level={1}>Por favor, insira seu horário de entrada</Titulo>
                <HourBank>
                  <ContentInput>
                    <LabelInput aria-level={2}>Horário de entrada:</LabelInput>
                    <Time
                      id="entryTime"
                      type="time"
                      value={entryTime}
                      onChange={(e) => setEntryTime(e.target.value)}
                      aria-label="Campo para inserir horário de entrada"
                    />
                  </ContentInput>
                  <Calcular
                    onClick={handleCalculate}
                    disabled={!isEntryTimeFilled}
                    aria-label="Calcular horário de saída"
                  >
                    calcular


                  </Calcular>
                </HourBank>
              </>
            )}

            {message && <div aria-live="polite">{message}</div>}
            {result && (
              <div role="region" aria-label="Resultados do cálculo de horas">
                <p>Horas de trabalho necessárias hoje: {result.workHoursToday}</p>
                <p>Hora de saída: {result.exitTime}</p>
              </div>
            )}

            <BotaoLimpar>
              <Calcular onClick={() => limparForm()} aria-label="Limpar formulário" role="button">Limpar formulário</Calcular>
            </BotaoLimpar>
          </Content>
        </Header>
      </Container>

      <Footer />
    </>
  );
}
