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
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [dataFromChild, setDataFromChild] = useState('');
    const [diaDaSemana, setDiaDaSemana] = useState<number>();
    const [warroommode, setwarroommode] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    const calcularProximoHorario = (horarioSaida: string) => {
        if (horarioSaida) {
            const [hora, minuto] = horarioSaida.split(':').map(Number);
            const horarioSaidaDate = new Date();
            horarioSaidaDate.setHours(hora, minuto, 0, 0);

            const horarioRetorno = new Date(horarioSaidaDate.getTime() + 11 * 60 * 60 * 1000);
            const diaSemana = horarioRetorno.getDay();
            setDiaDaSemana(diaSemana);

            // if (diaSemana === 6 || diaSemana === 0) {
            //     setMensagem('Você não pode logar no final de semana');
            //     setCanWork(false);
            // } else {
                if (horarioRetorno.getHours() < 7) {
                    setMensagem('Você só pode começar a trabalhar após as 7h.');
                    horarioRetorno.setHours(7, 0, 0, 0);
                    setCanWork(false);
                } else {
                    setMensagem('Você já pode começar a trabalhar agora.');
                    setCanWork(true);
                }

                setProximoHorario(horarioRetorno.toLocaleTimeString());
                console.log('Próximo horário de trabalho:', horarioRetorno.toLocaleTimeString());

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
            // }
        }
    };

    useEffect(() => {
        calcularProximoHorario(saida);
    }, [saida]);

    useEffect(() => {
        if (saida) {
            calcularProximoHorario(saida);
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

    function openModal() {
        setIsHelpModalOpen(true);
    }

    function warRoomOff() {
        setCanWork(false);
        setwarroommode(false);
    }

    const warRoomSure = (data: any) => {
        setDataFromChild(data)

        if (data === true) setCanWork(true);
        setIsHelpModalOpen(false);
        setwarroommode(true);
    }

    return (
        <Container>
            <ContentButton>
                <ButtonBack onClick={() => navigate('/')}>
                    voltar
                </ButtonBack>
            </ContentButton>
            <Header $warroommode={warroommode}>
                <Content>
                    <Imagem />
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
                    </Actions>
                    {proximoHorario ? (
                        <p key={proximoHorario}>Você poderá trabalhar novamente às {proximoHorario}</p>
                    ) : (
                        <p>Horário de trabalho não definido.</p>
                    )}
                </Content>

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
