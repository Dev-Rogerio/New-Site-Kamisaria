import React from "react";
import { useNavigate } from "react-router-dom";
import "../menuStore/menuStore.css";

import Logo from "../../img/logovetorizadoKZ.png";

const MenuStore = () => {
    const navigate = useNavigate();

    const itens = [
        { nome: "Camisa", link: "/sales", icon: "👔" },
        { nome: "Terno", link: "/ternos", icon: "🕴️" },
        { nome: "Calca", link: "/calcas", icon: "👖" },
        { nome: "Camisetas", link: "/camisetas", icon: "👕" },
        { nome: "Cintos", link: "/cintos", icon: "🧷" },
        { nome: "Sapatos", link: "/sapatos", icon: "👞" },
        { nome: "Abotoadura", link: "/abotoaduras", icon: "💍" },
        { nome: "Gravatas", link: "/gravatas", icon: "🎀" },
    ];

    return (
        <div className="menu-container">
            <button className="home-button" onClick={() => navigate("/")}>
                ← Voltar para Home
            </button>
            <img className="logo" src={Logo} alt="Logo Kamisaria Zanuto" />

            <h1>Kamisaria Zanuto</h1>
            <p className="menu-intro">
                Qual item você gostaria de comprar hoje? Escolha uma das opções
                abaixo:
            </p>
            <div className="menu-grid">
                {itens.map((item) => (
                    <div
                        key={item.nome}
                        className="menu-card"
                        onClick={() => navigate(item.link)}
                    >
                        <span className="icon">{item.icon}</span>
                        <span className="item-name">{item.nome}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuStore;
