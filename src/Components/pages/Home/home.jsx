import React, { useState, useCallback } from "react";

import Footer from "../../common/Footer/footer";
import Nav from "../../common/Nav/nav";
import "./home.css";
import "../Sales/sales.css";

import Capa from "../../Img/capaHome.jpg";
import One from "../../Img/kz1.jpg";
import Two from "../../Img/kz2.jpg";
import Three from "../../Img/kz3.jpg";
import Four from "../../Img/kz4.jpg";
import Mapa from "../../Img/mapa.jpg";

import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { Import } from "lucide-react";

function Home() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const openLink = useCallback((url) => {
        window.open(url, "_blank");
    }, []);

    return (
        <>
            <Nav />

            <main className="main-content">
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

            <Footer />
        </>
    );
}

export default Home;
