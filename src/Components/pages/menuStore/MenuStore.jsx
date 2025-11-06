import React from "react";
import { useNavigate } from "react-router-dom";
import "../menuStore/menuStore.css";
import Logo from "../../img/logovetorizadoKZ.png";

// Imagens dos produtos principais
import CamisaImg from "../../img/kz1.jpg";
import TernoImg from "../../img/terno.jpg";
import CalcaImg from "../../img/calcaRaffer.jpg";
import CamisetaImg from "../../img/muscle-fit-preta.jpg";
import CintoImg from "../../img/kz3.jpg";
import SapatoImg from "../../img/kz14.jpg";
import AbotoaduraImg from "../../img/kz17.jpg";
import GravataImg from "../../img/kz20.jpg";

const MenuStore = () => {
    const navigate = useNavigate();

    const itens = [
        { nome: "Camisa", link: "/sales", imagem: CamisaImg },
        { nome: "Terno", link: "/ternos", imagem: TernoImg },
        { nome: "Calça", link: "/calcas", imagem: CalcaImg },
        { nome: "Camisetas", link: "/camisetasdice", imagem: CamisetaImg },
        { nome: "Cintos", link: "/cintos", imagem: CintoImg },
        { nome: "Sapatos", link: "/sapatos", imagem: SapatoImg },
        { nome: "Abotoadura", link: "/abotoaduras", imagem: AbotoaduraImg },
        { nome: "Gravatas", link: "/gravatas", imagem: GravataImg },
    ];

    return (
        <div className="menu-container">
            {/* Botão voltar */}
            <button className="home-button" onClick={() => navigate("/")}>
                ← Voltar para Home
            </button>

            {/* Cabeçalho moderno */}
            <header className="menu-header">
                <img
                    src={Logo}
                    alt="Logo Kamisaria Zanuto"
                    className="menu-logo"
                />
                <h1 className="menu-titulo">Kamisaria Zanuto</h1>
                <p className="menu-subtitle">
                    Estilo e elegância em cada detalhe. Escolha abaixo o produto
                    que deseja conhecer:
                </p>
            </header>

            {/* Grade de produtos */}
            <div className="menu-grid">
                {itens.map((item) => (
                    <div
                        key={item.nome}
                        className="menu-card"
                        onClick={() => navigate(item.link)}
                    >
                        <div
                            className="menu-image"
                            style={{ backgroundImage: `url(${item.imagem})` }}
                        ></div>
                        <div className="menu-overlay">
                            <span className="item-name">{item.nome}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuStore;

// ---------------------------------------------------------------------
//                         PRIMEIRO MENU
// ---------------------------------------------------------------------

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../menuStore/menuStore.css";

// import Logo from "../../img/logovetorizadoKZ.png";

// const MenuStore = () => {
//     const navigate = useNavigate();

//     const itens = [
//         { nome: "Camisa", link: "/sales", icon: "👔" },
//         { nome: "Terno", link: "/ternos", icon: "🕴️" },
//         { nome: "Calca", link: "/calcas", icon: "👖" },
//         { nome: "Camisetas", link: "/camisetas", icon: "👕" },
//         { nome: "Cintos", link: "/cintos", icon: "🧷" },
//         { nome: "Sapatos", link: "/sapatos", icon: "👞" },
//         { nome: "Abotoadura", link: "/abotoaduras", icon: "💍" },
//         { nome: "Gravatas", link: "/gravatas", icon: "🎀" },
//     ];

//     return (
//         <div className="menu-container">
//             <button className="home-button" onClick={() => navigate("/")}>
//                 ← Voltar para Home
//             </button>
//             <img className="logo" src={Logo} alt="Logo Kamisaria Zanuto" />

//             <h1>Kamisaria Zanuto</h1>
//             <p className="menu-intro">
//                 Qual item você gostaria de comprar hoje? Escolha uma das opções
//                 abaixo:
//             </p>
//             <div className="menu-grid">
//                 {itens.map((item) => (
//                     <div
//                         key={item.nome}
//                         className="menu-card"
//                         onClick={() => navigate(item.link)}
//                     >
//                         <span className="icon">{item.icon}</span>
//                         <span className="item-name">{item.nome}</span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MenuStore;
