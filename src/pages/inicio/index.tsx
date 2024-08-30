import { useNavigate } from "react-router-dom";
import { ButtonSend, Content } from "./styles";
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
                
                <ButtonSend onClick={() => navigate('/interjornada')}>calcular interjornada</ButtonSend>
                <ButtonSend onClick={() => navigate('/zerar-banco')}>zerar banco de horas</ButtonSend>
            </Content>
            <Footer />
        </>
    )
}