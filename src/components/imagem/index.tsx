import { useNavigate } from "react-router-dom";
import { Logo } from "./styles";
import logo from '../../assets/Itaú_Unibanco_logo_2023.svg.png';

export default function Imagem() {
    return(
        <Logo src={logo} alt="Logo do Itaú Unibanco" />
    )
}