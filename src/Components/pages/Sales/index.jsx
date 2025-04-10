import React, { useState, useEffect, useRef } from "react";
import "../Sales/sales.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InputMask from "react-input-mask";
import axios from "axios";
import Logo from "../../Img/logovetorizadoKZ.png";
import Camisaa from "../../Img/camisaa.JPG";
import Camisab from "../../Img/camisab.JPG";
import Camisac from "../../Img/camisac.JPG";
import Camisad from "../../Img/camisad.JPG";
import Camisae from "../../Img/camisae.JPG";
import Camisaf from "../../Img/camisaf.JPG";
import WhatsApp from "../../Img/whatsapp.png";
import Azul from "../../Img/azul.png";
import Branco from "../../Img/branca.png";
import Rosa from "../../Img/rosa.png";
import Address from "../../Modal/Address/address.jsx";
import Order from "../../Modal/Order/order.jsx";
import ModalCep from "../dropdown/modalCep/modalCep.jsx";
const Sales = ({ price }) => {
    const [mudaPhoto, setMudaPhoto] = useState(Camisaa);
    const [ativar, setAtivar] = useState(false);
    const [valorControler, setValorControler] = useState("");
    const [selectedColorText, setSelectedColorText] = useState("");
    const [selectedSizeText, setSelectedSizeText] = useState("");
    const [reais, centavos] = (123.45).toFixed(2).split(".");
    const [val, cent] = (99.99).toFixed(2).split(".");
    const [showModal, setShowModal] = useState(false);
    const [hideAddress, setHideAddress] = useState(false);
    const [orderData, setOrderData] = useState({});
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [cep, setCep] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [address, setAddress] = useState(null);
    const [updateData, setUpdateData] = useState({ tamanho: "" });
    const [showSize, setShowSize] = useState("EG");
    const inputRef = useRef(null);

    useEffect(() => {
        console.log("Estado showSize atualizado:", showSize);
    }, [showSize]);

    useEffect(() => {
        setUpdateData((prevData) => ({
            ...prevData,
            tamanho: selectedSize,
        }));
    }, [selectedSize]);

    console.log("CEP no Address:", cep);
    console.log("showSize enviado para Order:", showSize);

    function subMan() {
        const subman = document.querySelector(".man");
        if (subman) {
            window.open("http://localhost:3000/man");
        }
    }
    function contato() {
        const contato = document.querySelector(".liContato a");
        if (contato) {
            window.open("http://localhost:3000/contact");
        }
    }
    const y = (valor) => {
        return setValorControler(`${valor} aqui é 33`);
    };
    const handleSize = (size) => {
        setSelectedSize(size);
        setSelectedSizeText(size);
    };
    const handleColors = (color) => {
        var collors = document.querySelector(".collors");
        setSelectedColor(color);
        setSelectedColorText(color);
    };

    const handleCepChange = async (event) => {
        const newCep = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
        setCep(newCep);

        if (newCep.length === 8) {
            try {
                const response = await axios.get(
                    `https://viacep.com.br/ws/${newCep}/json/`
                );
                if (!response.data.erro) {
                    setAddress(response.data); // Atualiza o estado do endereço
                    setIsModalOpen(true); // Abre a modal
                } else {
                    setAddress(null); // Caso o CEP seja inválido
                    setIsModalOpen(true);
                }
            } catch (error) {
                console.error("Erro ao buscar o CEP:", error);
            }
        }
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const handleColorsChange = (colorValue, colorText) => {
        setSelectedColor(colorValue);
        setSelectedColorText(colorText);
    };

    return (
        <div className="containerSales">
            {!ativar && (
                <nav className={`divNav-Sales ${ativar ? "hidden" : ""}`}>
                    <div className="divLeft-Sales"></div>
                    <div className="divCenter">
                        <section>
                            {" "}
                            <img className="logokz" src={Logo} alt="" />
                        </section>
                        <article>
                            {" "}
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
                                <li>
                                    <span className="material-symbols-outlined iconMenu"></span>
                                    <a href="/">Loja</a>
                                </li>
                                <div className="traits"></div>
                                <li>
                                    <span className="material-symbols-outlined iconMenu"></span>
                                    <a href="/">Vestuário</a>
                                    <div className="dropDown-subMenu">
                                        <ul>
                                            <li
                                                className="man"
                                                onClick={subMan}
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
                                <div className="traits"></div>
                                <li className="liContato">
                                    <span className="material-symbols-outlined iconSubMenu"></span>
                                    <a href="/" onClick={contato}>
                                        Contato
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )}
            {ativar && (
                <Address
                    ativo={ativar}
                    setAtivo={setAtivar}
                    setOrderData={setOrderData}
                    selectedSize={selectedSize}
                    selectedColor={selectedColor}
                    orderData={orderData}
                    showSize={showSize}
                />
            )}
            <div className={`allSelect ${ativar ? "hidden" : ""}`}>
                <div className="mCompras">
                    <p>Minhas compras</p>
                    <span className="material-symbols-outlined iconSubMenu">
                        <ShoppingCartIcon />
                    </span>
                </div>
                <section className="container">
                    <div className="section_Wrapper_fild_Left">
                        <div className="center_Collumn_One_Sales">
                            <section className="section_Photos_Scroll_Left">
                                <div
                                    className="scrool"
                                    onClick={() => setMudaPhoto(Camisaa)}
                                >
                                    <img
                                        className="imgSales"
                                        src={Camisaa}
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="scrool"
                                    onClick={() => setMudaPhoto(Camisab)}
                                >
                                    <img
                                        className="imgSales"
                                        src={Camisab}
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="scrool"
                                    onClick={() => setMudaPhoto(Camisac)}
                                >
                                    <img
                                        className="imgSales"
                                        src={Camisac}
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="scrool"
                                    onClick={() => setMudaPhoto(Camisad)}
                                >
                                    <img
                                        className="imgSales"
                                        src={Camisad}
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="scrool"
                                    onClick={() => setMudaPhoto(Camisae)}
                                >
                                    <img
                                        className="imgSales"
                                        src={Camisae}
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="scrool"
                                    onClick={() => setMudaPhoto(Camisaf)}
                                >
                                    <img
                                        className="imgSales"
                                        src={Camisaf}
                                        alt=""
                                    />
                                </div>
                            </section>
                            <section className="sectonMain">
                                <div className="photo">
                                    <img src={mudaPhoto} alt="" />
                                </div>
                            </section>
                        </div>
                        <div className="container_below_Left">
                            <p>
                                Camisa Alfaiataria – Elegância Sob Medida
                                Descubra a perfeição nos detalhes com nossa
                                camisa confeccionada em alfaiataria premium,
                                feita para quem valoriza estilo, conforto e
                                sofisticação. Tecido 100% Algodão Egípcio: Toque
                                macio, leveza e respirabilidade para o seu dia a
                                dia. Modelagem sob medida: Ajuste impecável ao
                                corpo, valorizando sua silhueta com conforto.
                                Colarinho estruturado: Mantém o caimento
                                elegante, mesmo após o uso prolongado.
                                Acabamento refinado: Costuras reforçadas e
                                botões personalizados, pensados para durar.
                                Estilo atemporal: Ideal para ocasiões formais ou
                                para elevar o visual casual com classe. Vista o
                                que há de melhor em alfaiataria e sinta a
                                diferença de uma peça feita especialmente para
                                você.
                            </p>
                        </div>
                    </div>

                    <section className="sectionRight">
                        <div className="description">
                            <p className="marca">
                                Conferir mais produtos da marca KAMISARIA ZANUTO
                            </p>
                            <p className="pDescription">
                                Camisa Social Masculina Manga Longa Slim Fit Sem
                                Bolso
                            </p>
                            <div className="opinion">
                                <div className="bestseller">mais vendido </div>
                                <div className="star">
                                    <span className="material-symbols-outlined iconSubMenu">
                                        Grade Grade Grade Grade Grade
                                    </span>
                                    <p>5/0.5</p>
                                    <p>10 opniões</p>
                                </div>
                            </div>
                            <p className="valueDesc">
                                RS {reais} <span>{centavos}</span>
                            </p>
                            <div className="valueoff">
                                <p className="valueTot">
                                    R$ {price} <span>{cent}</span>
                                </p>
                                <p className="descriptionOff">15% OFF</p>
                            </div>
                            <div className="descriptionParcelado">
                                <p>
                                    em 3X R$ 49,<span>99</span>
                                </p>
                            </div>
                            <div className="pagtos">
                                Ver os meios de pagamento
                            </div>
                            <div className="entrega">
                                <p>Chegará amanhã</p>
                                <p>
                                    {" "}
                                    por <span> R$ 15,00</span>
                                </p>
                            </div>
                            <p className="fpagto">Mais forma de pagamento</p>
                            <p className="envio">Envio para todo país</p>
                            <p className="formasEnvio">
                                Saiba os prazos de entrega e as formas de envio
                            </p>
                            <p className="calcularFrete">
                                Calcular o prazo de entrega
                            </p>
                            <p className="retorno">Devolução grátis</p>
                            <p className="prazo">
                                Você tem 30 dias a partir da data de
                                recebimento.
                            </p>
                            <p className="saibamais">Saiba mais</p>
                            <div className="descriptionCor">
                                <p className="cores">Cor:</p>
                                <p
                                    className="collors"
                                    value={selectedColor}
                                    onChange={(e) =>
                                        setSelectedColor(e.target.value)
                                    }
                                >
                                    {selectedColorText}
                                </p>
                            </div>
                            <div className="gradecor">
                                <div
                                    className={`divOne colors ${
                                        selectedColor === "Branco" ? "bold" : ""
                                    }`}
                                    onClick={() =>
                                        handleColorsChange("Branco", "Branco")
                                    }
                                >
                                    <div>
                                        <img src={Branco} alt="" />
                                    </div>
                                </div>
                                <div
                                    className={`divTwo colors ${
                                        selectedColor === "Azul" ? "bold" : ""
                                    }`}
                                    onClick={() =>
                                        handleColorsChange("Azul", "Azul")
                                    }
                                >
                                    <div>
                                        <img src={Azul} alt="Cor Azul" />
                                    </div>
                                </div>
                                <div
                                    className={`divThree colors ${
                                        selectedColor === "Rosa" ? "bold" : ""
                                    }`}
                                    onClick={() => handleColors("Rosa", "Rosa")}
                                >
                                    <div>
                                        <img src={Rosa} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="descriptionSize">
                                <p className="estoque">Tamanho:</p>
                                <p className="sizers">{selectedSize}</p>
                            </div>
                            <div className="gradeTamanho">
                                {/* :==================================================== */}

                                <button
                                    className={`size ${
                                        selectedSize === "38" ? "bold" : ""
                                    }`}
                                    onClick={() => handleSizeChange("38")}
                                >
                                    38
                                </button>

                                <button
                                    className={`size ${
                                        selectedSize === "40" ? "bold" : ""
                                    }`}
                                    onClick={() => handleSizeChange("40")}
                                >
                                    40
                                </button>
                                <button
                                    className={`size ${
                                        selectedSize === "42" ? "bold" : ""
                                    }`}
                                    onClick={() => handleSizeChange("42")}
                                >
                                    42
                                </button>
                                <button
                                    className={`size ${
                                        selectedSize === "44" ? "bold" : ""
                                    }`}
                                    onClick={() => handleSizeChange("44")}
                                >
                                    44
                                </button>
                                <button
                                    className={`size ${
                                        selectedSize === "46" ? "bold" : ""
                                    }`}
                                    onClick={() => handleSizeChange("46")}
                                >
                                    46
                                </button>
                                <button
                                    className={`size ${
                                        selectedSize === "48" ? "bold" : ""
                                    }`}
                                    onClick={() => handleSizeChange("48")}
                                >
                                    48
                                </button>
                            </div>

                            <div className="product_unit">
                                <p>Quantidade</p>
                                <select>
                                    <option value="1">1 - Camisa</option>
                                    <option value="2">2 - Camisas</option>
                                    <option value="3">3 - Camisas</option>
                                    <option value="3">4 - Camisas</option>
                                    <option value="3">5 - Camisas</option>
                                    {/* Adicione mais conforme necessário */}
                                </select>
                            </div>
                            <div className="guia">
                                <span className="material-symbols-outlined  iconSubMenu">
                                    straighten
                                </span>
                                <p className="guiaDescription">
                                    Guia de tamanhos <span>Clique Aqui</span>
                                </p>
                            </div>
                            <p className="disponivel">Estoque disponível</p>
                            <p className="labelCep">Calcular o frete:</p>
                            <div className="InputCep">
                                <a href="">Informe o cep</a>
                                <InputMask
                                    mask="99999-999"
                                    type="text"
                                    value={cep}
                                    onChange={handleCepChange}
                                    placeholder="Digite seu CEP"
                                    ref={inputRef}
                                />
                            </div>

                            {/* <div className="_velueDelivery">
                                <p></p>
                            </div> */}

                            <p className="freteGratis">
                                Frete grátis comprando 2 ou mais unidades
                            </p>
                            <button
                                className="buttonComprar"
                                onClick={() => setAtivar(true)}
                            >
                                Comprar
                            </button>
                            <button className="buttonAdicionar">
                                Adicionar ao carrinho
                            </button>
                            <p className="vendidoPor">
                                Vendido por <span>KAMISARIA ZANUTO</span>
                            </p>
                            <div className="garantia">
                                <p>7 dias de garantia de fábrica</p>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
            <ModalCep
                isOpen={isModalOpen}
                onClose={closeModal}
                address={address}
            />

            {showModal && (
                <Order
                    setShowModal={setShowModal}
                    setHideAddress={setHideAddress}
                    orderData={orderData}
                    selectedColor={selectedColor}
                    selectedSize={showSize}
                    selectedColorText={selectedColorText}
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};
export default Sales;
