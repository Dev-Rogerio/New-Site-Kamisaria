import React, { useState } from "react";

import Footer from "../../common/Footer/footer";
import Nav from "../../common/Nav/nav.jsx";
import "../home/home.css";
import "../contact/contact.css";

import Telefonista from "../../Img/telefonista.jpg";

function Contact() {
    const [message, setMessage] = useState("");

    // declarar o estado aqui
    const [menuOpen, setMenuOpen] = useState(false);

    // função para abrir/fechar menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="headContainer">
            <Nav />
            <div className="divSection">
                <section className="section-container">
                    <div className="grid-left">
                        <section className="info-login">
                            <p className="text-title">
                                Entre em contato conosco
                            </p>

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
            </div>

            <Footer />
        </header>
    );
}

export default Contact;
