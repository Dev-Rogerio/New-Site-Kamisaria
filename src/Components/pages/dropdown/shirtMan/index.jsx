import React, { useState } from "react";
import Tissue from "../../../Modal/Tissue/index";
import Logo from "../../../Img/logovetorizadoKZ.png";
import ImgTeen from "../../../Img/hz10.jpg";
import ImgTwelve from "../../../Img/kz12.jpg";
import ImgThirteen from "../../../Img/kz13.jpg";
import ImgSeventeen from "../../../Img/kz17.jpg";
import Mapa from "../../../Img/mapa.jpg";
import ImgTwentOne from "../../../Img/kz21.jpg";
import ImgTwentTwo from "../../../Img/kz22.jpg";
import ImgTwentThree from "../../../Img/kz23.jpg";
import ImgTwentFour from "../../../Img/kz24.jpg";
import ImgTSixteen from "../../../Img/kz26.jpg";
import Model from "../../../Img/man.jpg";
import ImgOne from "../../../Img/kz1.jpg";
import ImgTwo from "../../../Img/kz3.jpg";

import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";

import "./style.css";
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

    function contato() {
        const contato = document.querySelector(".liContato a");

        if (contato) {
            window.open("http://localhost:3000/contact");
        }
    }
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
                                        <li className="man">
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
            <section className="grid-section-man">
                <div className="collumn-item">
                    <img className="img-one" src={Model} alt=""></img>
                </div>
                <div className="collumn-item">
                    <div className="first-name">
                        <img className="img-two" src={ImgOne} alt=""></img>
                    </div>
                </div>
                <div className="collumn-item">
                    <div className="first-name">
                        <img className="img-third" src={ImgTwo} alt=""></img>
                    </div>
                </div>
            </section>
            <div className="photobook">
                <h1>PHOTO BOOKS</h1>
            </div>
            <Tailor ativo={tailor} setAtivo={setTailor} />
            <Sewing ativo={sewing} setAtivo={setSewing} />
            <Measure ativo={measure} setAtivo={setMeasure} />
            <Cufflinks ativo={cufflinks} setAtivo={setCufflinks} />
            <Grid ativo={grid} setAtivo={setGrid} />
            <Embroidery ativo={embroidery} setAtivo={setEmbroidery} />
            <Custom ativo={custom} setAtivo={setCustom} />
            <Store ativo={store} setAtivo={setStore} />
            <section className="grid-collumn-second js-accordion">
                <div className="collumn-item-two">
                    <img src={ImgTwelve} alt="" />
                    <div
                        className="text"
                        onClick={() => {
                            setTailor(true);
                        }}
                    >
                        <h1>Alfaiatária</h1>
                        <p>{tailor ? "fechar ⬏" : "saiba mais ⬎"}</p>
                    </div>
                </div>
                <div className="collumn-item-two">
                    <img src={ImgThirteen} alt="" />
                    <div
                        className="text"
                        onClick={() => {
                            setSewing(true);
                        }}
                    >
                        <h1>Alta costura</h1>
                        <p>{sewing ? "fechar ⬏" : "saiba mais ⬎"}</p>
                    </div>
                </div>
                <div className="collumn-item-two">
                    <img src={ImgTSixteen} alt="" />
                    <div className="text" onClick={() => setMeasure(true)}>
                        <h1>Measure</h1>
                        <p>{measure ? "fechar ⬏" : "saiba mais ⬎"}</p>
                    </div>
                </div>
            </section>
            <section className="grid-collumn-second js-accordion">
                <div className="collumn-item-two">
                    <img src={ImgSeventeen} alt="" />
                    <div className="text" onClick={() => setCufflinks(true)}>
                        <h1>Abotuaduras</h1>
                        <p>{cufflinks ? "fechar ⬏" : "saiba mais ⬎"}</p>
                    </div>
                </div>
                <Tissue showtissue={showtissue} setShowtissue={setShowtissue} />
                <div className="collumn-item-two">
                    <img src={ImgTwentTwo} alt="" />
                    <div className="text" onClick={(_e) => setShowtissue(true)}>
                        <h1>Tecidos</h1>
                        <p>{showtissue ? "fechar ⬏" : "saiba mais ⬎"}</p>
                    </div>
                </div>
                <div className="collumn-item-two">
                    <img src={ImgTwentThree} alt="" />
                    <div className="text" onClick={() => setGrid(true)}>
                        <h1>Grade</h1>
                        <p>{grid ? "fechar ⬏" : "saiba mais ⬎"}</p>
                    </div>
                </div>
            </section>
            <section className="grid-collumn-second js-accordion">
                <div className="collumn-item-two">
                    <img src={ImgTwentFour} alt="" />
                    <div className="text" onClick={() => setEmbroidery(true)}>
                        <h1>Bordados</h1>
                        <p>{embroidery ? "fechar ⬏" : "saiba mais ⬎"}</p>
                    </div>
                </div>
                <div className="collumn-item-two">
                    <img src={ImgTwentOne} alt="" />
                    <div className="text" onClick={() => setCustom(true)}>
                        <h1>Personalizada</h1>
                        <p>{custom ? "fechar ⬏" : "saiba mais ⬎"}</p>
                    </div>
                </div>
                <div className="collumn-item-two">
                    <img src={ImgTeen} alt="" />
                    <div className="text" onClick={() => setStore(true)}>
                        <h1>Loja</h1>
                        <p>{store ? "fechar ⬏" : "saiba mais ⬎"}</p>
                    </div>
                </div>
            </section>
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
export default ShirtMan;
