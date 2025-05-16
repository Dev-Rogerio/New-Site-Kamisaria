import React from "react";
import Logo from "../../Img/logovetorizadoKZ.png";
import Telefonista from "../../Img/telefonista.jpg";
import Mapa from "../../Img/mapa.jpg";

import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";

import "../contact/style.css";

function contact() {
    function iconInsta() {
        const insta = document.querySelector(".insta");
        if (insta) {
            window.open("https://www.instagram.com/kamisariazanuto/");
        }
    }
    iconInsta();

    function iconFace() {
        const face = window.document.querySelector(".face");
        if (face) {
            window.open("https://web.facebook.com/kamisaria");
        }
    }
    iconFace();

    function iconYoutube() {
        const youtube = window.document.querySelector(".youtube");
        if (youtube) {
            window.open("https://www.youtube.com/watch?v=-qwyq3HSuSY");
        }
    }
    iconYoutube();

    function iconPinterest() {
        const pinterest = window.document.querySelector(".pinterest");
        if (pinterest) {
            window.open("https://br.pinterest.com/");
        }
    }
    iconPinterest();

    function iconWhats() {
        const whats = window.document.querySelector(".whats");
        if (whats) {
            window.open("https://web.whatsapp.com/");
        }
    }
    iconWhats();

    function locationMap() {
        const urlMapa = document.querySelector(".divMaps img");

        if (urlMapa) {
            window.open("https://bit.ly/kamisaria-zanuto");
        }
    }
    locationMap();

    function DropDownMan() {
        const subman = document.querySelector(".man");
        if (subman) {
            window.open("http://localhost:3001/man");
        }
    }
    DropDownMan();

    function DropDownWoman() {
        const subWoman = document.querySelector(".woman");
        if (subWoman) {
            window.open("http://localhost:3001/woman");
        }
    }
    DropDownWoman();

    return (
        <header className="headContainner">
            <nav className="divNav">
                <div className="divLeft"></div>
                <div className="divCenter-Sales">
                    <section>
                        <img className="logokz" src={Logo} alt="" />
                    </section>
                    <article>
                        <h1>KAMISARIA ZANUTO</h1>
                    </article>
                </div>
                <div className="divRight">
                    <div className="divMenu">
                        <ul className="divUl">
                            <li>
                                <span className="material-symbols-outlined iconMenu">
                                    {/* home */}
                                </span>
                                <a href="/">Home</a>
                            </li>
                            <div className="traits"></div>
                            <li>
                                <span className="material-symbols-outlined iconMenu">
                                    {/* local_library */}
                                </span>
                                <a href="/">História</a>
                            </li>
                            <div className="traits"></div>
                            <li>
                                <span className="material-symbols-outlined iconMenu">
                                    {/* design_services */}
                                </span>
                                <a href="/">Comprar</a>
                            </li>
                            <div className="traits"></div>
                            <li>
                                <span className="material-symbols-outlined iconMenu">
                                    {/* wc */}
                                </span>
                                <a href="/">Vestuário</a>
                                <div className="dropDown-subMenu">
                                    <ul>
                                        <li
                                            className="man"
                                            onClick={DropDownMan}
                                        >
                                            <a href="/">
                                                <span className="material-symbols-outlined iconMenu">
                                                    man_4
                                                </span>
                                                <h1> Camisa Masc.</h1>
                                            </a>
                                        </li>
                                        <li
                                            className="woman"
                                            onClick={DropDownWoman}
                                        >
                                            <a href="/">
                                                <span className="material-symbols-outlined iconSubMenu">
                                                    woman
                                                </span>
                                                <h1>Camisa Fem.</h1>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/">
                                                <span className="material-symbols-outlined  iconSubMenu">
                                                    straighten
                                                </span>
                                                <h1>Medidas</h1>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <div className="traits"></div>
                            <li className="liContato">
                                <span className="material-symbols-outlined iconSubMenu"></span>
                                <a href="/">Contato</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <section className="section-container">
                <div className="grid-left">
                    <section className="info-login">
                        <p className="text-title">Entre em contato conosco</p>

                        <form className="form-group">
                            <div className="form-field">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    required
                                    autoComplete="off"
                                />
                                <label className="form-label">Nome</label>
                            </div>

                            <div className="form-field">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    required
                                    autoComplete="off"
                                />
                                <label className="form-label">E-mail</label>
                            </div>

                            <div className="form-field">
                                <textarea
                                    name="message"
                                    className="form-textarea"
                                    rows="5"
                                    placeholder="Digite sua mensagem..."
                                ></textarea>
                            </div>

                            <button className="form-button">Enviar</button>
                        </form>
                    </section>
                </div>

                <div className="grid-right">
                    <img
                        className="img-telefonista"
                        src={Telefonista}
                        alt="Atendente"
                    />
                </div>
            </section>

            <footer className="footerContainer">
                <section className="sectionFooter">
                    <div className="redesociais">
                        <div className="divTextName">
                            <p>Siga a kamisaria Zanuto</p>
                        </div>
                        <div className="iconsSociais ">
                            <a
                                href="/"
                                className="insta icon-rede"
                                onClick={iconInsta}
                            >
                                <InstagramIcon />
                            </a>
                            <a
                                href="/"
                                className="face icon-rede"
                                onClick={iconFace}
                            >
                                <FacebookIcon />
                            </a>
                            <a
                                href="/"
                                className="youtube icon-rede"
                                onClick={iconYoutube}
                            >
                                <YouTubeIcon />
                            </a>
                            <a
                                href="/"
                                className="pinterest icon-rede"
                                onClick={iconPinterest}
                            >
                                <PinterestIcon />
                            </a>
                            <a
                                href="/"
                                className="whats icon-rede"
                                onClick={iconWhats}
                            >
                                <WhatsAppIcon />
                            </a>
                        </div>
                    </div>
                    <div className="divAdress">
                        <p>
                            Razão Social: Kamisaria zanuto - ME Confecção de
                            camisa sob medida - Nosso endereço: Praça General
                            Gentil Falcão, número 49 - Bairro: Cidade Monções -
                            Brooklin - São Paulo - SP - Cep 04571-150 - SP.
                            Telefone: (11) 5506-8369 / whats-app (11)
                            93240-6348. Nosso horário comercial é de,
                            Segunda-feira a Sexta-feira das 9h ás 16:30hs e de
                            Sábado das 9h ás 13h.
                        </p>
                    </div>
                    <div className="divMaps">
                        <div className="clique">Clique </div>
                        <img
                            className="imgs"
                            // onClick={takePath}
                            src={Mapa}
                            alt=""
                        />
                    </div>
                </section>
            </footer>
            <div className="divEnd">
                <p> &copy; Fundada desde: 1974</p>
                <p className="adress-site"> www.kamisariazanuto.com.br</p>
            </div>
        </header>
    );
}
export default contact;
