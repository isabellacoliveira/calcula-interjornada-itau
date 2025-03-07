import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Interjornada from "./pages/interjornada";
import Inicio from "./pages/inicio";

import ZerarHoras from "./pages/zerarhoras";
import HourInput from "./pages/zerarhoras";
import CalcularSaida from "./pages/calcularSaida";
import { PasswordProvider } from "./contexts/PasswordContext";

function AppRoutes() {
    return (
        <>
        <PasswordProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/interjornada" element={<Interjornada />} />
                    <Route path="/zerar-banco" element={<HourInput />} />
                    <Route path="/calcular-saida" element={<CalcularSaida />} />
                    <Route path="/*" element={<Inicio />} />
                </Routes>
            </Router>
        </PasswordProvider>
        </>
    );
}

export default AppRoutes;