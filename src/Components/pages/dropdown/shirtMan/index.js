import React from "react";

import Logo from "../../../img/logovetorizadoKZ.png";
import Mapa from "../../../img/mapa.jpg";

import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";

import "./style.css";

function shirtMan() {
    function contato() {
        var contato = document.querySelector(".liContato a");

        if (contato) {
            window.open("http://localhost:3000/contato");
        }
    }
    contato();

    function subMan() {
        var subman = document.querySelector(".man");
        if (subman) {
            window.open("http://localhost:3000/masculino");
        }
    }
    subMan();
    function iconInsta() {
        var insta = document.querySelector(".insta");
        if (insta) {
            window.open("https://www.instagram.com/kamisariazanuto/");
        }
    }
    iconInsta();

    function iconFace() {
        var face = window.document.querySelector(".face");
        if (face) {
            window.open("https://web.facebook.com/kamisaria");
        }
    }
    iconFace();

    function iconYoutube() {
        var youtube = window.document.querySelector(".youtube");
        if (youtube) {
            window.open("https://www.youtube.com/watch?v=-qwyq3HSuSY");
        }
    }
    iconYoutube();

    function iconPinterest() {
        var pinterest = window.document.querySelector(".pinterest");
        if (pinterest) {
            window.open("https://br.pinterest.com/");
        }
    }
    iconPinterest();

    function iconWhats() {
        var whats = window.document.querySelector(".whats");
        if (whats) {
            window.open("https://web.whatsapp.com/");
        }
    }
    iconWhats();

    function DropDownMan() {
        var subman = document.querySelector(".man");
        if (subman) {
            window.open("http://localhost:3000/man");
        }
    }
    DropDownMan();

    function locationMap() {
        var urlMapa = document.querySelector(".divMaps img");

        if (urlMapa) {
            window.open("https://bit.ly/kamisaria-zanuto");
        }
    }
    locationMap();

    return (
        <header className="headContainner">
            <nav className="divNav">
                <div className="divLeft"></div>
                <div className="divCenter">
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
                                    home
                                </span>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <span className="material-symbols-outlined iconMenu">
                                    local_library
                                </span>
                                <a href="/">História</a>
                            </li>
                            <li>
                                <span className="material-symbols-outlined iconMenu">
                                    design_services
                                </span>
                                <a href="/">Serviços</a>
                            </li>
                            <li>
                                <span className="material-symbols-outlined iconMenu">
                                    wc
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
                                        <li>
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
                            <li className="liContato">
                                <span className="material-symbols-outlined iconSubMenu">
                                    phone_in_talk
                                </span>
                                <a href="/" onClick={contato}>
                                    Contato
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <footer className="footerContainer">
                <section className="sectionFooter">
                    <div className="redesociais">
                        <div className="divTextName">
                            <p>Siga a kamisaria zanuto</p>
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
                        <div className="clique" onClick={locationMap}>
                            Clique
                        </div>
                        <img className="imgs" src={Mapa} alt="" />
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
export default shirtMan;
