import React, { useState, useCallback } from "react";

import Logo from "../../Img/logo_branco.png";

import "./nav.css";

const Nav = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const openLink = useCallback((url) => {
        window.open(url, "_blank");
    }, []);
    return (
        <>
            <header className="_headContainer">
                <nav className="_nav">
                    <div className="_nav-left" />
                    <div className="_nav-center">
                        <img
                            className="_logo"
                            src={Logo}
                            alt="Logo Kamisaria Zanuto"
                        />
                        <h1 className="_logo-title">KAMISARIA ZANUTO</h1>
                    </div>

                    {/* Botão hamburguer para mobile */}
                    <button
                        className={`_hamburger ${menuOpen ? "active" : ""}`}
                        onClick={toggleMenu}
                        aria-label="Menu"
                        aria-expanded={menuOpen}
                    >
                        <span />
                        <span />
                        <span />
                    </button>

                    <div className={`_nav-right ${menuOpen ? "open" : ""}`}>
                        <ul className="_nav-menu">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/">História</a>
                            </li>
                            <li>
                                <a href="/sales" className="_highlighted">
                                    Loja
                                </a>
                            </li>
                            <li className="_submenu-parent">
                                <a href="/">Vestuário</a>
                                <ul className="_submenu">
                                    <li>
                                        <a href="/man">
                                            <span className="_material-symbols-outlined iconMenu">
                                                man_4
                                            </span>
                                            Camisa Masc.
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/">
                                            <span className="_material-symbols-outlined iconMenu">
                                                woman
                                            </span>
                                            Camisa Fem.
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/">
                                            <span className="_material-symbols-outlined iconMenu">
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
        </>
    );
};
export default Nav;
