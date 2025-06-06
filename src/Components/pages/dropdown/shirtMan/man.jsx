import React, { useState } from "react";

import "../../home/home.css";
import "../shirtMan/man.css";

import Tissue from "../../../Modal/Tissue/tissue.jsx";
import logo from "../../../Img/logo_branco.png";
import imgTeen from "../../../Img/hz10.jpg";
import imgTwelve from "../../../Img/kz12.jpg";
import imgThirteen from "../../../Img/kz13.jpg";
import imgSeventeen from "../../../Img/kz17.jpg";
import mapa from "../../../Img/mapa.jpg";
import imgTwentOne from "../../../Img/kz21.jpg";
import imgTwentTwo from "../../../Img/kz22.jpg";
import imgTwentThree from "../../../Img/kz23.jpg";
import imgTwentFour from "../../../Img/kz24.jpg";
import imgTSixteen from "../../../Img/kz26.jpg";
import model from "../../../Img/man.jpg";
import imgOne from "../../../Img/kz1.jpg";
import imgTwo from "../../../Img/kz3.jpg";

import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";

import Tailor from "../../../Modal/Tailor";
import Sewing from "../../../Modal/Sewing";
import Measure from "../../../Modal/Measure";
import Cufflinks from "../../../Modal/Cufflinks";
import Grid from "../../../Modal/Grid";
import Embroidery from "../../../Modal/Embroidery";
import Custom from "../../../Modal/Custom";
import Store from "../../../Modal/Store";

function ShirtMan() {
    const [showtissue, setShowtissue] = useState();
    const [tailor, setTailor] = useState(false);
    const [sewing, setSewing] = useState(false);
    const [measure, setMeasure] = useState(false);
    const [cufflinks, setCufflinks] = useState(false);
    const [grid, setGrid] = useState(false);
    const [embroidery, setEmbroidery] = useState(false);
    const [custom, setCustom] = useState(false);
    const [store, setStore] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen((prev) => !prev);
    }

    return (
        <header className="head-container">
            <header className="headContainer">
                <nav className="nav">
                    <div className="nav-left" />
                    <div className="nav-center">
                        <img
                            className="logo"
                            src={logo}
                            alt="Logo Kamisaria Zanuto"
                        />
                        <h1 className="logo-title">KAMISARIA ZANUTO</h1>
                    </div>

                    {/* Botão hamburguer para mobile */}
                    <button
                        className={`hamburger ${menuOpen ? "active" : ""}`}
                        onClick={toggleMenu}
                        aria-label="Menu"
                        aria-expanded={menuOpen}
                    >
                        <span />
                        <span />
                        <span />
                    </button>

                    <div className={`nav-right ${menuOpen ? "open" : ""}`}>
                        <ul className="nav-menu">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/">História</a>
                            </li>
                            <li>
                                <a href="/sales" className="highlighted">
                                    Loja
                                </a>
                            </li>
                            <li className="submenu-parent">
                                <a href="/">Vestuário</a>
                                <ul className="submenu">
                                    <li>
                                        <a href="/man">
                                            <span className="material-symbols-outlined iconMenu">
                                                man_4
                                            </span>
                                            Camisa Masc.
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/">
                                            <span className="material-symbols-outlined iconMenu">
                                                woman
                                            </span>
                                            Camisa Fem.
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/">
                                            <span className="material-symbols-outlined iconMenu">
                                                straighten
                                            </span>
                                            Medidas
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="/contact">Contato</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            {/* Parte Inicial com 3 imagens */}
            <section className="intro-grid">
                <img src={model} alt="Modelo" />
                <img src={imgOne} alt="Imagem 1" />
                <img src={imgTwo} alt="Imagem 2" />
            </section>

            <div className="photobook">
                <h1>PHOTO BOOKS</h1>
            </div>

            {/* Modais */}
            <Tailor ativo={tailor} setAtivo={setTailor} />
            <Sewing ativo={sewing} setAtivo={setSewing} />
            <Measure ativo={measure} setAtivo={setMeasure} />
            <Cufflinks ativo={cufflinks} setAtivo={setCufflinks} />
            <Grid ativo={grid} setAtivo={setGrid} />
            <Embroidery ativo={embroidery} setAtivo={setEmbroidery} />
            <Custom ativo={custom} setAtivo={setCustom} />
            <Store ativo={store} setAtivo={setStore} />
            <Tissue showtissue={showtissue} setShowtissue={setShowtissue} />

            <section className="photo-grid">
                {[
                    {
                        img: imgTwelve,
                        title: "Alfaiatária",
                        modal: () => setTailor(true),
                        open: tailor,
                    },
                    {
                        img: imgThirteen,
                        title: "Alta costura",
                        modal: () => setSewing(true),
                        open: sewing,
                    },
                    {
                        img: imgTSixteen,
                        title: "Measure",
                        modal: () => setMeasure(true),
                        open: measure,
                    },
                    {
                        img: imgSeventeen,
                        title: "Abotuaduras",
                        modal: () => setCufflinks(true),
                        open: cufflinks,
                    },
                    {
                        img: imgTwentTwo,
                        title: "Tecidos",
                        modal: () => setShowtissue(true),
                        open: showtissue,
                    },
                    {
                        img: imgTwentThree,
                        title: "Grade",
                        modal: () => setGrid(true),
                        open: grid,
                    },
                    {
                        img: imgTwentFour,
                        title: "Bordados",
                        modal: () => setEmbroidery(true),
                        open: embroidery,
                    },
                    {
                        img: imgTwentOne,
                        title: "Personalizada",
                        modal: () => setCustom(true),
                        open: custom,
                    },
                    {
                        img: imgTeen,
                        title: "Loja",
                        modal: () => setStore(true),
                        open: store,
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="photo-item"
                        onClick={item.modal}
                    >
                        <img src={item.img} alt={item.title} />
                        <div className="text">
                            <h1>{item.title}</h1>
                            <p>{item.open ? "fechar ⬏" : "saiba mais ⬎"}</p>
                        </div>
                    </div>
                ))}
            </section>

            <footer className="footer">
                <section className="social-section">
                    <p>Siga a kamisaria zanuto</p>
                    <div className="social-icons">
                        <a
                            href="https://www.instagram.com/kamisariazanuto/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <InstagramIcon />
                        </a>
                        <a
                            href="https://web.facebook.com/kamisaria"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FacebookIcon />
                        </a>
                        <a
                            href="https://www.youtube.com/watch?v=-qwyq3HSuSY"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <YouTubeIcon />
                        </a>
                        <a
                            href="https://br.pinterest.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <PinterestIcon />
                        </a>
                        <a
                            href="https://web.whatsapp.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <WhatsAppIcon />
                        </a>
                    </div>
                </section>

                <section className="address-section">
                    <p>
                        Razão Social: Kamisaria Zanuto - ME Confecção de camisa
                        sob medida - Nosso endereço: Praça General Gentil
                        Falcão, número 49 - Bairro: Cidade Monções - Brooklin -
                        São Paulo - SP - Cep 04571-150 - SP. Telefone: (11)
                        5506-8369 / WhatsApp (11) 93240-6348. Nosso horário
                        comercial é de Segunda a Sexta das 9h às 16:30 e Sábado
                        das 9h às 13h.
                    </p>
                </section>

                <section
                    className="map-section"
                    onClick={() =>
                        window.open("https://bit.ly/kamisaria-zanuto", "_blank")
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            window.open(
                                "https://bit.ly/kamisaria-zanuto",
                                "_blank"
                            );
                    }}
                    aria-label="Abrir localização no mapa"
                >
                    <span className="click-hint">Clique</span>
                    <img src={mapa} alt="Mapa Kamisaria Zanuto" />
                </section>
            </footer>
        </header>
    );
}

export default ShirtMan;
