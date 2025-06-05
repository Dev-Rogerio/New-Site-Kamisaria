import React, { useState, useEffect, useRef } from "react";

import Nav from "../../common/nav/Nav";

import GuiaTamanhosLuxo from "../../Modal/GuiaTamanhos/GuiaTamanhos.jsx";
import "../Sales/sales.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InputMask from "react-input-mask";
import axios from "axios";
import Logo from "../../Img/logo_branco.png";
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
import ModalCep from "../dropdown/modalCep/Modal_Cep.jsx";
import { useFetcher, useHref } from "react-router-dom";
import { UsbSharp } from "@mui/icons-material";
import CarrinhoCompra from "../../Modal/CarrinhoCompra/Carrinho_Compra.jsx";
import Devolucao from "../../Modal/devolucao/Devolucao.jsx";

const Sales = ({ price }) => {
    const [mudaPhoto, setMudaPhoto] = useState(Camisaa);
    const [ativar, setAtivar] = useState(false);
    const [valorControler, setValorControler] = useState("");
    const [selectedSizeText, setSelectedSizeText] = useState("");
    const [reais, centavos] = (560.0).toFixed(2).split(".");
    const [showModal, setShowModal] = useState(false);
    const [hideAddress, setHideAddress] = useState(false);
    const [orderData, setOrderData] = useState({});
    const [cep, setCep] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [address, setAddress] = useState(null);
    const [updateData, setUpdateData] = useState({ tamanho: "" });
    const [showSize, setShowSize] = useState("EG");
    const inputRef = useRef(null);
    const [cent, setCent] = useState("00");
    const [cpf, setCpf] = useState();
    const [email, setEmail] = useState();
    const [errorSize, setErrorSize] = useState("");
    const [showPiscar, setShowPiscar] = useState(false);
    const [showTremer, setShowTremer] = useState(false);
    const [errorColor, setErrorColor] = useState("");
    const [showPiscarColor, setShowPiscarColor] = useState(false);
    const [showTremerColor, setShowTremerColor] = useState(false);
    const [selectedColor, setSelectedColor] = useState("");
    const [quantidade, setQuantidade] = useState(1);
    const [valCamisa, setValCamisa] = useState(476.0);
    const [carrinho, setCarrinho] = useState([]);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColorText, setSelectedColorText] = useState("");
    const [numberSize, setNumberSize] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [showGuiaTamanhos, setShowGuiaTamanhos] = useState(false);
    const [parcela, setParcela] = useState("");
    const [modalCarrinhoCompras, setModalCarrinhoCompra] = useState(false);
    const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
    const [mostrarModalCarrinho, setMostrarModalCarrinho] = useState(false);
    const [imagemSelecionada, setImagemSelecionada] = useState(Branco);
    const [frete, setFrete] = useState(10);
    const [mostrarMais, setMostrarMais] = useState(false);
    const [mostarModalDevolucao, setMostrarModalDevolucao] = useState(false);
    const [estoque, setEstoque] = useState({
        Branco: { 38: 5, 40: 3, 42: 2, 44: 4, 46: 1 },
        Azul: { 38: 4, 40: 5, 42: 3, 44: 2, 46: 0 },
        Rosa: { 38: 2, 40: 2, 42: 1, 44: 3, 46: 2 },
    });

    const [mostrarSaibaMais, setMostrarSaibaMais] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        setFrete(25);
    }, [setFrete]);

    // Carrega o carrinho do localStorage quando o componente monta
    useEffect(() => {
        const carrinhoSalvo = localStorage.getItem("carrinho");
        if (carrinhoSalvo) {
            setCarrinho(JSON.parse(carrinhoSalvo));
        }
    }, []);

    // Sempre que o carrinho mudar, salva no localStorage
    useEffect(() => {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }, [carrinho]);

    const adicionarAoCarrinho = () => {
        const novoItem = {
            nome: "Camisa Alfaiataria",
            imagem: imagemSelecionada,
            cor: selectedColor,
            tamanho: selectedSize,
            quantidade: quantidade,
            preco: valCamisa,
        };

        setCarrinho([...carrinho, novoItem]);
    };

    useEffect(() => {
        // const total = 476 * quantidade;
        const total = 1 * quantidade;
        const inteiro = Math.floor(total);
        const decimal = (total % 1).toFixed(2).split(".")[1] || "00";

        setValCamisa(inteiro);
        setCent(decimal);

        // Calcular valor da parcela
        const valorParcela = total / 3;
        const parcelaFormatada = valorParcela.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
        });

        setParcela(parcelaFormatada);
    }, [quantidade]);

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
        if (!selectedColor) {
            setErrorColor("Selecione uma cor primeiro");
            return;
        }

        const quantidadeDisponivel = estoque[selectedColor]?.[size] || 0;

        if (quantidadeDisponivel <= 0) {
            alert(" Este tmanho esta fora de estoque");
            return;
        }

        setSelectedSize(size);
        setErrorSize("");
        setShowPiscar(false);
        setShowTremer(false);
    };

    const handleColorsChange = (color) => {
        setSelectedColor(color);
        setSelectedColorText(color);
        setErrorColor("");
        setShowTremerColor(false);
        // Atualiza a imagem conforme a cor selecionada
        switch (color) {
            case "Branco":
                setImagemSelecionada(Branco);
                break;
            case "Azul":
                setImagemSelecionada(Azul);
                break;
            case "Rosa":
                setImagemSelecionada(Rosa);
                break;
            default:
                setImagemSelecionada(Branco); // fallback
        }
    };

    const handleSelectChange = (e) => {
        const selecteValue = e.target.value;
        const numberOnly = parseInt(selecteValue);
        // setQuantidade(numberOnly);
        setQuantidade(Number(e.target.value));
    };

    const handleAvancar = () => {
        let hasError = false;

        if (!selectedSize) {
            setErrorSize("Por favor, selecione um tamanho.");
            setShowPiscar(true);
            setTimeout(() => {
                setShowPiscar(false);
                setShowTremer(true);
            }, 500);
            hasError = true;
        }

        if (!selectedColor) {
            setErrorColor("Por favor, selecione uma cor.");
            setShowPiscarColor(true);
            setTimeout(() => {
                setShowPiscarColor(false);
                setShowTremerColor(true);
            }, 500);
            hasError = true;
        }

        if (hasError) return;

        // se tudo certo
        setErrorSize("");
        setErrorColor("");
        setShowTremer(false);
        setShowTremerColor(false);
        setAtivar(true); // ou sua lógica de seguir o fluxo
    };

    const AbrieCarrinho = () => {
        setMostrarModalCarrinho(true);
    };

    const fecharCarrinho = () => {
        setMostrarCarrinho(false);
    };

    // Remover item do carrinho
    const removerItem = (index) => {
        const novoCarrinho = [...carrinho];
        novoCarrinho.splice(index, 1);
        setCarrinho(novoCarrinho);
    };

    // Limpar todo o carrinho
    const limparCarrinho = () => {
        setCarrinho([]);
    };

    // Função que simula a atualização do valor do frete
    const handleFreteChange = (novoFrete) => {
        setFrete(novoFrete); // Atualiza o frete
    };

    if (numberSize) {
        return <GuiaTamanhosLuxo isOpen={true} setIsOpen={setNumberSize} />;
    }

    return (
        <div className="containerSales">
            {!ativar && <Nav />}

            {ativar && (
                <Address
                    ativo={ativar}
                    setAtivo={setAtivar}
                    setOrderData={setOrderData}
                    selectedSize={selectedSize}
                    selectedColor={selectedColor}
                    quantidade={quantidade}
                    orderData={orderData}
                    showSize={showSize}
                    valCamisa={valCamisa}
                    cpf={cpf}
                    frete={frete}
                />
            )}

            <div className={`allSelect ${ativar ? "hidden" : ""}`}>
                <div className="mCompras">
                    <p>Minhas compras</p>
                    <span
                        className="iconeCarrinho material-symbols-outlined iconSubMenu"
                        onClick={AbrieCarrinho}
                    >
                        <ShoppingCartIcon />
                        {carrinho.length > 0 && (
                            <span className="contadorCarrinho">
                                {carrinho.length}
                            </span>
                        )}
                    </span>
                </div>
                {mostrarModalCarrinho && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <CarrinhoCompra
                                carrinho={carrinho}
                                removerItem={removerItem}
                                limparCarrinho={limparCarrinho}
                                fecharCarrinho={() =>
                                    setMostrarModalCarrinho(false)
                                }
                            />
                        </div>
                    </div>
                )}

                <section className="container">
                    <div className="section_Wrapper_fild_Left">
                        <div className="center_Collumn_One_Sales">
                            <section className="section_Photos_Scroll_Left">
                                {[
                                    Camisaa,
                                    Camisab,
                                    Camisac,
                                    Camisad,
                                    Camisae,
                                    Camisaf,
                                ].map((img, i) => (
                                    <div
                                        key={i}
                                        className="scrool"
                                        onClick={() => setMudaPhoto(img)}
                                    >
                                        <img
                                            className="imgSales"
                                            src={img}
                                            alt={`Miniatura ${i + 1}`}
                                        />
                                    </div>
                                ))}
                            </section>

                            <section className="sectonMain">
                                <div className="photo">
                                    <img
                                        src={mudaPhoto}
                                        alt="Camisa selecionada"
                                    />
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

                        <div className="div-move">
                            <div className="moveOne">
                                <div>
                                    <video width="100%" controls>
                                        <source
                                            src="/videos/video1.mp4"
                                            type="video/mp4"
                                        />
                                        Seu navegador não suporta vídeo.
                                    </video>
                                </div>
                                <span>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Cum, officia nobis. Sequi
                                    nulla perferendis quas? Expedita nisi
                                    delectus eaque dolor voluptates consequatur
                                    et autem distinctio exercitationem nemo
                                    explicabo, temporibus ad?
                                </span>
                            </div>
                            <div className="moveTwo">
                                <div>
                                    <video width="100%" controls>
                                        <source
                                            src="/videos/video2.mp4"
                                            type="video/mp4"
                                        />
                                        Seu navegador não suporta vídeo.
                                    </video>
                                </div>
                                <span>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Cum, officia nobis. Sequi
                                    nulla perferendis quas? Expedita nisi
                                    delectus eaque dolor voluptates consequatur
                                    et autem distinctio exercitationem nemo
                                    explicabo, temporibus ad?
                                </span>
                            </div>
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
                                    <div className="stars">
                                        <span className="material-symbols-outlined blue-star">
                                            grade
                                        </span>
                                        <span className="material-symbols-outlined blue-star">
                                            grade
                                        </span>
                                        <span className="material-symbols-outlined blue-star">
                                            grade
                                        </span>
                                        <span className="material-symbols-outlined blue-star">
                                            grade
                                        </span>
                                        <span className="material-symbols-outlined blue-star">
                                            grade
                                        </span>
                                    </div>

                                    <p>5/0.5</p>
                                    <p>10 opniões</p>
                                </div>
                            </div>

                            <div className="desconto-sales">
                                <p> Desconto de: </p> RS
                                <p className="valueDesc">
                                    {reais}
                                    <span>{centavos} </span>
                                </p>
                                <p className="textPor">Por</p>
                            </div>

                            <div className="valueoff">
                                <div className="valueTot">
                                    <p>
                                        R$ {valCamisa}, <span>{cent}</span>
                                    </p>
                                </div>
                                <p className="descriptionOff">15% OFF</p>
                            </div>

                            <div className="descriptionParcelado">
                                <div className="parcelamento icone-cartao">
                                    <span>ou</span>
                                    <strong>3x</strong>
                                    <span className="valor-parcelado">
                                        {parcela}
                                    </span>
                                    <span className="sem-juros">sem juros</span>
                                </div>
                            </div>

                            <div className="pagtos">
                                <p>
                                    Ver os meios de pagamento{" "}
                                    <span>Clique aqui</span>{" "}
                                </p>
                            </div>

                            <div className="delivery">
                                <p>
                                    <span className="material-symbols-outlined icon-truck">
                                        local_shipping
                                    </span>
                                    Chegará amanhã
                                </p>
                                <p>
                                    por <span>R$ 15,00</span>
                                </p>
                            </div>

                            <div className="info-pagamento-envio">
                                <p className="fpagto">
                                    Mais forma de pagamento
                                </p>
                                <p className="envio">Envio para todo país</p>
                                <p
                                    className="formasEnvio"
                                    onClick={() =>
                                        alert(
                                            "Mostrar prazos e formas de envio"
                                        )
                                    }
                                >
                                    Saiba os prazos de entrega e as formas de
                                    envio
                                </p>
                                <p
                                    className="calcularFrete"
                                    onClick={() =>
                                        alert("Calcular prazo de entrega")
                                    }
                                >
                                    Calcular o prazo de entrega
                                </p>
                                <p className="retorno">Devolução grátis</p>
                                <p className="prazo">
                                    Você tem 7 dias a partir da data de
                                    recebimento.
                                </p>

                                <p
                                    className="saibamais"
                                    onClick={() => setMostrarSaibaMais(true)}
                                >
                                    {mostrarMais ? "fechar ⬏" : "saiba mais  ⬎"}
                                </p>

                                {/* <p>{item.open ? "fechar ⬏" : "saiba mais ⬎"}</p> */}
                            </div>

                            <Devolucao
                                mostrarSaibaMais={mostrarSaibaMais}
                                setMostrarSaibaMais={setMostrarSaibaMais}
                            />

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
                                        <img src={"Branco"} alt="" />
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
                                        <img src={"Azul"} alt="Cor Azul" />
                                    </div>
                                </div>
                                <div
                                    className={`divThree colors ${
                                        selectedColor === "Rosa" ? "bold" : ""
                                    }`}
                                    // onClick={() => handleColors("Rosa", "Rosa")}
                                    onClick={() => handleColorsChange("Rosa")}
                                >
                                    <div>
                                        <img src={"Rosa"} alt="" />
                                    </div>
                                </div>
                            </div>

                            {errorColor && (
                                <p
                                    className={`errorColor ${
                                        showPiscarColor ? "piscar" : ""
                                    } ${showTremerColor ? "tremer" : ""}`}
                                >
                                    {errorColor}
                                </p>
                            )}

                            <div className="descriptionSize">
                                <p className="estoque">Tamanho:</p>
                                <p className="sizers">{selectedSize}</p>
                            </div>

                            <div className="gradeTamanho">
                                <button
                                    className={`size ${
                                        selectedSize === "38" ? "bold" : ""
                                    }`}
                                    onClick={() => handleSizeChange("38")}
                                    disabled={
                                        estoque[selectedColor]?.["38"] <= 0
                                    }
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

                            {errorSize && (
                                <p
                                    className={`errorSize ${
                                        showPiscar ? "piscar" : ""
                                    } ${showTremer ? "tremer" : ""}`}
                                >
                                    {errorSize}
                                </p>
                            )}

                            <div className="product_unit">
                                <p>Quantidade</p>
                                <select
                                    className="selectedQuantidade"
                                    value={quantidade}
                                    onChange={handleSelectChange}
                                >
                                    <option value="1">1 - Camisa</option>
                                    <option value="2">2 - Camisas</option>
                                    <option value="3">3 - Camisas</option>
                                    <option value="4">4 - Camisas</option>
                                    <option value="5">5 - Camisas</option>
                                    {/* Adicione mais conforme necessário */}
                                </select>
                            </div>

                            <div className="guia">
                                <span className="material-symbols-outlined  iconSubMenu">
                                    straighten
                                </span>
                                <p
                                    className="guiaDescription"
                                    onClick={() => setNumberSize(true)}
                                >
                                    Guia de tamanhos <span>Clique Aqui</span>
                                </p>
                            </div>

                            {selectedColor && selectedSize && (
                                <div className="estoqueDisponivel">
                                    <span className="material-symbols-outlined iconEstoque">
                                        inventory_2
                                    </span>
                                    <p className="disponivel">
                                        Estoque disponível
                                    </p>
                                    <div>
                                        <span>
                                            (
                                            {estoque[selectedColor]?.[
                                                selectedSize
                                            ] ?? 0}
                                            )
                                        </span>
                                    </div>
                                </div>
                            )}

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

                            <p className="freteGratis">
                                🚚 Frete grátis comprando 2 ou mais unidades
                            </p>

                            <button
                                className="buttonComprar"
                                onClick={handleAvancar}
                            >
                                Avançar
                            </button>

                            <button
                                className="buttonAdicionar"
                                onClick={adicionarAoCarrinho}
                            >
                                🛒 Adicionar ao carrinho
                            </button>

                            <p className="to-Sales">
                                Vendido por{" "}
                                <span style={{ fontFamily: "Bodoni72" }}>
                                    KAMISARIA ZANUTO
                                </span>
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
                frete={frete}
            />

            {showModal && (
                <Order
                    setShowModal={setShowModal}
                    setHideAddress={setHideAddress}
                    orderData={orderData}
                    selectedColor={selectedColor}
                    selectedSize={showSize}
                    quantidade={quantidade}
                    setQuantidade={setQuantidade}
                    selectedColorText={selectedColorText}
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    valCamisa={valCamisa}
                />
            )}
        </div>
    );
};
export default Sales;
