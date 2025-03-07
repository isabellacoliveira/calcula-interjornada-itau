import { useNavigate } from "react-router-dom";
import { ButtonSend, Content, Password, PasswordHiddenButton, Titulos } from "./styles";
import Imagem from "../../components/imagem";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import { usePassword } from "../../contexts/PasswordContext";
import sweetalert from 'sweetalert'; 
import bcrypt from 'bcryptjs';
import CryptoJS from "crypto-js";


export default function Interjornada() {
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [canSeeThePassword, setCanSeeThePassword] = useState(false);
    const navigate = useNavigate();
    const { postPassword, passwordMessage, passwordStatus } = usePassword();

    function openModal(){
        setIsHelpModalOpen(true);
    }

    async function handleSendPassword() {
        if (!password) {
            sweetalert("Por favor, insira uma senha.");
            return;
        }

        await postPassword(password);
        
        setIsHelpModalOpen(true);
    }

    useEffect(() => {
        if (passwordMessage) {
            sweetalert(passwordMessage);
        } else {
            sweetalert("Senha enviada com sucesso!");
        }
    }, [passwordMessage, passwordStatus]);

    return(
        <>        
            <Content>
                <Imagem />
                <Titulos className="boas-vindas">Hey, Ituber! Welcome <br/> to Calcula Interjornada. </Titulos>
                <Titulos>Please, define your password:</Titulos>
                <br />
                <div>
                <Password 
                    type={canSeeThePassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordHiddenButton
                    type="button"
                    onClick={() => setCanSeeThePassword(!canSeeThePassword)} 
                >
                {canSeeThePassword ? "Hidden" : "👁️"}
                </PasswordHiddenButton>
                </div>
                <ButtonSend onClick={handleSendPassword}>Send password</ButtonSend>
            </Content>
            <Footer />
        </>
    )
}
