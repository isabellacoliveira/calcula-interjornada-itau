import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Interjornada from "./pages/interjornada";
import Inicio from "./pages/inicio";
import Zerarbanco from "./pages/zerarbanco";
import Footer from "./components/footer";

function AppRoutes() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/interjornada" element={<Interjornada />} />
                    <Route path="/zerar-banco" element={<Zerarbanco />} />
                    <Route path="/*" element={<Inicio />} />
                </Routes>
            </Router>
        </>
    );
}

export default AppRoutes;