import React from "react";
import { useNavigate } from "react-router-dom";
// import "./camisetas.jsx";
import Logo from "../../img/logovetorizadoKZ.png";
import "../menuStore/emconstrucao.css";

const Sapato = () => {
    const navigate = useNavigate();

    return (
        <div className="construction-container">
            <img
                src={Logo}
                alt="Logo Kamisaria Zanuto"
                className="construction-logo"
            />
            <h1>Página de Camisetas em Construção</h1>
            <p>
                Em breve você poderá conferir nossa linha completa de camisetas
                exclusivas Kamisaria Zanuto. Aguardem novidades!
            </p>

            <button
                className="btn-voltar"
                onClick={() => navigate("/menustore")}
            >
                ← Voltar à Loja
            </button>
        </div>
    );
};

export default Sapato;
