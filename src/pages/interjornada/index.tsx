import { useEffect, useRef, useState } from "react";
import { enviarEmail } from "../../shared/sendEmail";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../../components/send-email";
import Footer from "../../components/footer";
import { Actions, ButtonBack, ButtonSend, Container, Content, ContentButton, Header, Time, WarRoomButton } from "./styles";
import { useNavigate } from "react-router-dom";
import Imagem from "../../components/imagem";
import WarRoom from "../../components/war-room";

export default function Interjornada() {
    const [saida, setSaida] = useState(() => localStorage.getItem('saida') || '');
    const [proximoHorario, setProximoHorario] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [canWork, setCanWork] = useState<boolean>(true);
    const [modalFocus, setModalFocus] = useState<boolean>(false);
    const [dataFromChild, setDataFromChild] = useState('');
    const [showWarRoomMode, setshowWarRoomMode] = useState(false);
    const [fazerCalculoNoFinalDeSemana, setFazerCalculoNoFinalDeSemana] = useState(false);
    const [showWarRoomBackground, setshowWarRoomBackground] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const horarioSaidaDate = new Date();
    const horarioRetorno = new Date(horarioSaidaDate.getTime() + 11 * 60 * 60 * 1000);
    const diaSemana = horarioRetorno.getDay();

    const verificaDiaDaSemanaESePodeTrabalhar = (horarioSaida: string) => {
        if (!fazerCalculoNoFinalDeSemana) {
            if (diaSemana === 6 || diaSemana === 0) {
                setEstadoFinalDeSemana(); 
            } else {
                calcularProximoHorarioESetarODiaDaSemanaNaSession(horarioSaida);
            }
        } else {
            calcularProximoHorarioESetarODiaDaSemanaNaSession(horarioSaida);
        }
    }

    const setEstadoFinalDeSemana = () => {
        setshowWarRoomMode(true);
        sessionStorage.setItem('dia da semana', diaSemana.toString())
        setMensagem('Você não pode logar no final de semana');
        setCanWork(false);
    }

    const calcularProximoHorarioESetarODiaDaSemanaNaSession = (horarioSaida: string) => {
        sessionStorage.setItem('dia da semana', diaSemana.toString())
        calcularProximoHorario(horarioSaida);
    }

    const calcularProximoHorario = (horarioSaida: string) => {
        if (horarioSaida) {
            const [hora, minuto] = horarioSaida.split(':').map(Number);
            horarioSaidaDate.setHours(hora, minuto, 0, 0);

            const horarioRetorno = new Date(horarioSaidaDate.getTime() + 11 * 60 * 60 * 1000);

            if (horarioRetorno.getHours() < 7) {
                setMensagem('Você só pode começar a trabalhar após as 7h.');
                horarioRetorno.setHours(7, 0, 0, 0);
            } else {
                setMensagem('Você já pode começar a trabalhar agora.');
                setCanWork(true);
            }

            setProximoHorario(horarioRetorno.toLocaleTimeString());

            const tempoRestante = horarioRetorno.getTime() - new Date().getTime();
            if (tempoRestante > 0) {
                setTimeout(() => {
                    console.log('Você pode começar a trabalhar agora.');
                    setCanWork(true);
                }, tempoRestante);
            } else {
                console.log("Você já pode começar a trabalhar.");
                setCanWork(true);
            }
        }
    };

    useEffect(() => {
        verificaDiaDaSemanaESePodeTrabalhar(saida)
    }, [saida]);

    useEffect(() => {
        if (saida) {
            verificaDiaDaSemanaESePodeTrabalhar(saida);
        }
    }, []);

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

    const warRoomOff = (data: any) => {
        setDataFromChild(data)
        setCanWork(false);
        setshowWarRoomMode(true);
        setshowWarRoomBackground(false);
        setFazerCalculoNoFinalDeSemana(false);
    }

    const warRoomSure = (data: any) => {
        setDataFromChild(data)
        setCanWork(true);
        setshowWarRoomBackground(true);
        setFazerCalculoNoFinalDeSemana(true);
    }

    const limparHorario = () => {
        setSaida("");
        setProximoHorario("")
        sessionStorage.clear();
    }

    return (
        <Container>
            <ContentButton>
                <ButtonBack onClick={() => navigate('/')}>
                    voltar
                </ButtonBack>
            </ContentButton>
            <Header $showWarRoomBackground={showWarRoomBackground}>
                <Content>
                    <Imagem />
                    {canWork ? <div>
                        <h4>Bem-vindo(a) ao Calcula-Interjornada!</h4>
                        <p>Por favor, insira seu horário de saída:</p>
                        <Actions>
                            <Time
                                className="time"
                                type="time"
                                value={saida}
                                onChange={(e) => {
                                    console.log("Novo horário de saída:", e.target.value);
                                    setSaida(e.target.value);
                                }}
                                ref={inputRef}
                            />
                            <ButtonSend
                                className="button-send"
                                onClick={handleOpenModal}
                            >
                                enviar para o e-mail
                            </ButtonSend>
                            <ButtonSend
                                className="button-send"
                                onClick={limparHorario}
                            >
                                limpar
                            </ButtonSend>
                        </Actions>
                        {proximoHorario ? (
                            <p key={proximoHorario}>Você poderá trabalhar novamente às {proximoHorario}</p>
                        ) : (
                            <p>Horário de trabalho não definido.</p>
                        )}
                    </div> : <p>Você não pode trabalhar no final de semana. Priorize seu tempo de descanso.</p>}

                </Content>
                {(diaSemana === 5 || diaSemana === 6 || diaSemana === 0) && showWarRoomMode && (
                    <WarRoomButton  onClick={showWarRoomBackground ? warRoomOff : warRoomSure}>
                        {showWarRoomBackground ? 'Fim do WR' : 'WR'}
                    </WarRoomButton>
                )}
                <Modal
                    show={showModal}
                    onClose={handleCloseModal}
                    onEmailSubmit={handleEmailSubmit}
                />
                <Toaster position="top-center" reverseOrder={false} />
            </Header>
            <Footer />
        </Container>
    );
}
