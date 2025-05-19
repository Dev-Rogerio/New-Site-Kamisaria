import React, { useState, useCallback } from "react";
import "./home.css";

import Capa from "../../Img/capa.jpg";
import One from "../../Img/kz1.jpg";
import Two from "../../Img/kz2.jpg";
import Three from "../../Img/kz3.jpg";
import Four from "../../Img/kz4.jpg";
import Logo from "../../Img/logovetorizadoKZ.png";
import Mapa from "../../Img/mapa.jpg";

import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";

function Home() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const openLink = useCallback((url) => {
        window.open(url, "_blank");
    }, []);

    return (
        <>
            <header className="headContainer">
                <nav className="nav">
                    <div className="nav-left" />
                    <div className="nav-center">
                        <img
                            className="logo"
                            src={Logo}
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

            <main className="main-content">
                {/* Imagem capa full width */}
                <section className="cover-section">
                    <div className="text-block">
                        <h2>nossa tradição</h2>
                        <p>
                            A Kamisaria Zanuto produz camisas sob medida há 40
                            anos, nossa especialidade é o corte preciso, a
                            costura perfeita e o caseamento impecável. Hoje
                            também contamos com a nossa divisão de alfaiataria,
                            onde você encontrará tecidos da mais alta qualidade,
                            aviamentos especiais e o corte adequado para o seu
                            biotipo.
                        </p>
                    </div>
                    <img
                        src={Capa}
                        alt="Capa Kamisaria Zanuto"
                        className="cover-image"
                    />
                </section>

                {/* Grid das demais imagens */}
                <section className="gallery-grid">
                    <div className="gallery-item">
                        <img src={One} alt="Sob Medida" />
                        <span className="img-caption">sob medida</span>
                    </div>
                    <div className="gallery-item">
                        <img src={Two} alt="Alfaiataria" />
                        <span className="img-caption">Alfaiataria</span>
                    </div>
                    <div className="gallery-item">
                        <img src={Three} alt="Acessórios" />
                        <span className="img-caption">acessórios</span>
                    </div>
                    <div className="gallery-item">
                        <img src={Four} alt="Bordados" />
                        <span className="img-caption">bordados</span>
                    </div>
                </section>
            </main>

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
                    <img src={Mapa} alt="Mapa localização Kamisaria Zanuto" />
                </section>

                <a
                    href="https://wa.me/5511973418998"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-float"
                    aria-label="WhatsApp"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 512 512"
                    >
                        <circle cx="256" cy="256" r="256" fill="#25D366" />
                        <path
                            d="M380.9 131.1C339.5 89.6 284.3 64 224.9 64c-97.7 0-177.1 79.4-177.1 177.1 0 31.2 8.2 61.6 23.8 88.3L48 448l121.4-32.1c25.5 14 54.5 21.3 84.6 21.3h.1c97.7 0 177.1-79.4 177.1-177.1 0-59.3-25.6-114.5-67.3-156.1z"
                            fill="#FFF"
                        />
                        <path
                            d="M350.2 323.7c-5.2-2.6-30.8-15.2-35.6-17-4.8-1.9-8.3-2.6-11.8 2.6-3.5 5.2-13.4 17-16.4 20.4-3 3.5-6 3.9-11.2 1.3-30.8-15.2-51-27.2-71.2-61.5-5.4-9.3 5.4-8.6 15.5-28.6 1.7-3.5.9-6.5-.4-9.1-1.3-2.6-11.8-28.4-16.2-38.9-4.3-10.2-8.7-8.8-11.8-9.1-3-.3-6.5-.4-10-.4s-9.1 1.3-13.9 6.5c-4.8 5.2-18.4 18-18.4 43.8s18.9 50.9 21.5 54.4c2.6 3.5 37 56.5 89.7 79.3 12.5 5.4 22.2 8.7 29.8 11.1 12.5 4 23.9 3.4 32.9 2.1 10-1.5 30.8-12.5 35.1-24.6 4.3-12.1 4.3-22.5 3-24.6-1.3-2.1-4.7-3.4-10-6z"
                            fill="#25D366"
                        />
                    </svg>
                </a>
            </footer>
        </>
    );
}

export default Home;
