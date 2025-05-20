import React, { useState, useCallback } from "react";

import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import Mapa from "../../Img/mapa.jpg";

const Footer = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const openLink = useCallback((url) => {
        window.open(url, "_blank");
    }, []);

    return (
        <footer className="_footer">
            <section className="_social-section">
                <p>Siga a kamisaria zanuto</p>
                <div className="_social-icons">
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

            <section className="_address-section">
                <p>
                    Razão Social: Kamisaria Zanuto - ME Confecção de camisa sob
                    medida - Nosso endereço: Praça General Gentil Falcão, número
                    49 - Bairro: Cidade Monções - Brooklin - São Paulo - SP -
                    Cep 04571-150 - SP. Telefone: (11) 5506-8369 / WhatsApp (11)
                    93240-6348. Nosso horário comercial é de Segunda a Sexta das
                    9h às 16:30 e Sábado das 9h às 13h.
                </p>
            </section>

            <section
                className="_map-section"
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
                <span className="_click-hint">Clique</span>
                <img src={Mapa} alt="Mapa localização Kamisaria Zanuto" />
            </section>

            <a
                href="https://wa.me/5511973418998"
                target="_blank"
                rel="noopener noreferrer"
                className="_whatsapp-float"
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
    );
};
export default Footer;
