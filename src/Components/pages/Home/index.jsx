import React from "react";
import "./style.css";

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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import WcIcon from "@mui/icons-material/Wc";
import CallIcon from "@mui/icons-material/Call";

function home() {
    function iconInsta() {
        const insta = document.querySelector(".insta");
        if (insta) {
            window.open("https://www.instagram.com/kamisariazanuto/");
        }
    }
    function iconFace() {
        const face = window.document.querySelector(".face");
        if (face) {
            window.open("https://web.facebook.com/kamisaria");
        }
    }
    function iconYoutube() {
        const youtube = window.document.querySelector(".youtube");
        if (youtube) {
            window.open("https://www.youtube.com/watch?v=-qwyq3HSuSY");
        }
    }
    function iconPinterest() {
        const pinterest = window.document.querySelector(".pinterest");
        if (pinterest) {
            window.open("https://br.pinterest.com/");
        }
    }
    function iconWhats() {
        const whats = window.document.querySelector(".whats");
        if (whats) {
            window.open("https://web.whatsapp.com/");
        }
    }
    function locationMap() {
        const urlMapa = document.querySelector(".divMaps img");

        if (urlMapa) {
            window.open("https://bit.ly/kamisaria-zanuto");
        }
    }
    function contato() {
        const contato = document.querySelector(".liContato a");

        if (contato) {
            // window.open("http://localhost:3000/contact");
            window.open(`${window.location.origin}/contact`);
        }
    }
    function subMan() {
        const subman = document.querySelector(".man");
        if (subman) {
            // window.open("http://localhost:3000/man");
            window.open(`${window.location.origin}/man`);
        }
    }
    function comprar() {
        const purchase = document.querySelector(".liComprar a");
        if (purchase) {
            // window.open("http://localhost:3000/sales");
            window.open(`${window.location.origin}/sales`);
        }
    }
    return (
        <header className="headContainner">
            <nav className="divNav">
                <div className="divLeft"></div>
                <div className="divCenter-Sales">
                    <section>
                        <img className="logokz" src={Logo} alt="" />
                    </section>
                    <article className="article">
                        <h1>KAMISARIA ZANUTO</h1>
                    </article>
                </div>
                <div className="divRight">
                    <div className="divMenu">
                        <ul className="divUl">
                            <li>
                                <span className="material-symbols-outlined iconMenu"></span>
                                <a href="/">Home</a>
                            </li>
                            <div className="traits"></div>
                            <li>
                                <span className="material-symbols-outlined iconMenu"></span>
                                <a href="/">História</a>
                            </li>
                            <div className="traits"></div>
                            <li className="liComprar">
                                <span className="material-symbols-outlined iconMenu"></span>
                                <a href="/" onClick={comprar}>
                                    Loja
                                </a>
                            </li>
                            <div className="traits"></div>
                            <li>
                                <span className="material-symbols-outlined iconMenu"></span>
                                <a href="/">Vestuário</a>
                                <div className="dropDown-subMenu">
                                    <ul>
                                        <li className="man" onClick={subMan}>
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
                            <div className="traits"></div>
                            <li className="liContato">
                                <span className="material-symbols-outlined iconSubMenu">
                                    {/* <CallIcon /> */}
                                </span>
                                <a href="/" onClick={contato}>
                                    Contato
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main className="main">
                <div className="main-container">
                    <section className="background">
                        <div className="main-left">
                            <section>
                                <div className="mainTittle">
                                    <h1>nossa tradição</h1>
                                </div>
                                <div className="mainDescription">
                                    <p>
                                        A Kamisaria Zanuto produz camisas sob
                                        medida há 40 anos, nossa especialidade é
                                        o corte preciso, a costura perfeita e o
                                        caseamento impecável. Hoje também
                                        contamos com a nossa divisão de
                                        alfaiataria, onde você encontrará
                                        tecidos da mais alta qualidade,
                                        aviamentos especiais e o corte adequado
                                        para o seu biotipo.
                                    </p>
                                </div>
                            </section>
                        </div>
                        <div className="main-right">
                            <article className="divPhoto">
                                <img src={Capa} alt="" />
                            </article>
                        </div>
                    </section>
                </div>
            </main>
            <article className="article">
                <div className="first-article">
                    <div className="article-left">
                        <div className="divImg1">
                            <div className="img-txt">sob medida</div>
                            <img src={One} alt="" />
                        </div>
                    </div>
                    <div className="article-right">
                        <div className="divImg2">
                            <div className="img-txt">Alfaiataria</div>
                            <img src={Two} alt="" />
                        </div>
                    </div>
                </div>
            </article>
            <aside className="aside">
                <div className="second-aside">
                    <div className="aside-left">
                        <div className="divImg3">
                            <div className="img-txt">acessórios</div>
                            <img src={Three} alt="" />
                        </div>
                    </div>
                    <div className="aside-right">
                        <div className="divImg4">
                            <div className="img-txt">bordados</div>
                            <img src={Four} alt="" />
                        </div>
                    </div>
                </div>
            </aside>
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

                <a
                    href="https://wa.me/5511973418998"
                    target="_self"
                    rel="noopener noreferrer"
                    className="whatsapp-float"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 512 512"
                    >
                        <circle cx="256" cy="256" r="256" fill="#25D366" />
                        <path
                            d="M380.9 131.1C339.5 89.6 284.3 64 224.9 64c-97.7 0-177.1 79.4-177.1 177.1 0 31.2 8.2 61.6 23.8 88.3L48 448l121.4-32.1c25.5 14 54.5 21.3 84.6 21.3h.1c97.7 0 177.1-79.4 177.1-177.1 0-47.2-18.4-91.5-50.3-123zm-155.9 267c-26.6 0-52.7-7.2-75.5-20.8l-5.4-3.2-72.1 19.1 19.3-70.1-3.5-5.5c-14.8-23.3-22.6-50.2-22.6-77.8 0-81.1 66-147.1 147.1-147.1 39.3 0 76.2 15.3 104 43.1s43.1 64.7 43.1 104c0 81.1-66 147.1-147.1 147.1zm82.1-111.1c-4.5-2.3-26.5-13.1-30.6-14.6s-7.1-2.3-10.1 2.3-11.6 14.6-14.2 17.6-5.2 3.4-9.7 1.1c-26.5-13.3-43.8-23.7-61.3-53.4-4.6-7.9 4.6-7.3 13.1-24.1 1.5-3 0.7-5.6-0.4-7.9s-10.1-24-13.8-32.9c-3.6-8.6-7.3-7.4-10.1-7.5s-5.6-0.1-8.6-0.1-7.9 1.1-12.1 5.6c-4.2 4.5-16 15.6-16 38s16.4 45.9 18.7 49.1c2.3 3.1 32.6 50 79.1 70.2 11 4.7 19.6 7.5 26.3 9.6 11 3.5 21.1 3 29.2 1.8 8.9-1.3 27.7-11.2 31.6-22.1 3.9-10.8 3.9-20.1 2.8-22.1-1.1-1.9-4-3.1-8.5-5.4z"
                            fill="#fff"
                        />
                    </svg>
                </a>
            </footer>
            <div className="divEnd">
                <p> &copy; Fundada desde: 1974</p>
                <p className="adress-site"> www.kamisariazanuto.com.br</p>
            </div>
        </header>
    );
}
export default home;
