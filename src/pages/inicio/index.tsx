import { useNavigate } from "react-router-dom";

export default function Interjornada() {
    const navigate = useNavigate();

    return(
        <div>
            <button onClick={() => navigate('/interjornada')}>Calcular Interjornada</button>
            <button onClick={() => navigate('/zerar-banco')}>Zerar Banco de Horas</button>
        </div>
    )
}