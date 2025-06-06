import React from "react";
import "./Navbar.css";
import "../pages/home/style.css";

import Logo from "../Img/logovetorizadoKZ.png";

function Navbar() {
    return (
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
    );
}

export default Navbar;
