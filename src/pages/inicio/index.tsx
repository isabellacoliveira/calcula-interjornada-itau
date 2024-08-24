import { useNavigate } from "react-router-dom";
import { ButtonSend, Content } from "./styles";
import Imagem from "../../components/imagem";

export default function Interjornada() {
    const navigate = useNavigate();

    return(
        <Content>
            <Imagem />
            
            <ButtonSend onClick={() => navigate('/interjornada')}>calcular interjornada</ButtonSend>
            <ButtonSend onClick={() => navigate('/zerar-banco')}>zerar banco de horas</ButtonSend>
        </Content>
    )
}