import { useNavigate } from "react-router-dom";
import { ButtonSend, Content, Titulos } from "./styles";
import Imagem from "../../components/imagem";
import Footer from "../../components/footer";
import { useState } from "react";

export default function Interjornada() {
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const navigate = useNavigate();

    function openModal(){
        setIsHelpModalOpen(true);
      }

    return(
        <>        
            <Content>
                <Imagem />
                <Titulos className="boas-vindas">Olá, Ituber! Seja bem-vindo (a) <br/> ao Calcula Interjornada</Titulos>
                <ButtonSend onClick={() => navigate('/interjornada')}>calcular interjornada</ButtonSend>
                <ButtonSend onClick={() => navigate('/zerar-banco')}>zerar banco de horas</ButtonSend>
                <ButtonSend onClick={() => navigate('/calcular-saida')}>calcular horário de saída</ButtonSend>
            </Content>
            <Footer />
        </>
    )
}