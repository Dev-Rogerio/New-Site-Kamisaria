import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/logovetorizadoKZ.png";
import "../menuStore/camisetasDice.css";

import Preta from "../../img/muscle-fit-preta.jpg";
import Branca from "../../img/muscle-fit-branca.jpg";
import Azul from "../../img/muscle-fit-azul.jpg";
import Cinza from "../../img/muscle-fit-cinza.jpg";
import Bordo from "../../img/muscle-fit-bordo.jpg";

import Address from "../../Modal/Address/address";

const STORAGE_KEY = "kamisaria_carrinho_v1";
const FRETE_KEY = "kamisaria_frete_v1";
const WHATSAPP_NUMBER = "5511945599306";

const produto = {
    id: 1,
    nome: "Camiseta Muscle Fit Algodão Egípcio",
    preco: 248.5,
    cores: [
        { nome: "Preta", imagem: Preta, corHex: "#111" },
        { nome: "Branca", imagem: Branca, corHex: "#fff" },
        { nome: "Azul", imagem: Azul, corHex: "#0044cc" },
        { nome: "Cinza", imagem: Cinza, corHex: "#999" },
        { nome: "Bordo", imagem: Bordo, corHex: "#C20000" },
    ],
};

const tamanhosDisponiveis = ["P", "M", "G", "GG", "XGG"];
const formatBRL = (value) => `R$ ${value.toFixed(2).replace(".", ",")}`;

// Galeria isolada
const Galeria = React.memo(function Galeria({
    imagens,
    indexImagem,
    onTrocar,
}) {
    return (
        <div className="dice-img-box">
            <div className="gallery">
                <div className="gallery-main">
                    <img
                        src={imagens[indexImagem]}
                        alt={`Produto imagem ${indexImagem + 1}`}
                        className="dice-main-img"
                    />

                    <button
                        className="gallery-arrow left"
                        aria-label="Anterior"
                        onClick={() => onTrocar(indexImagem - 1)}
                    >
                        ‹
                    </button>

                    <button
                        className="gallery-arrow right"
                        aria-label="Próxima"
                        onClick={() => onTrocar(indexImagem + 1)}
                    >
                        ›
                    </button>
                </div>

                <div className="gallery-thumbs">
                    {imagens.map((img, idx) => (
                        <button
                            key={idx}
                            className={`thumb-btn ${
                                indexImagem === idx ? "active" : ""
                            }`}
                            onClick={() => onTrocar(idx)}
                            aria-label={`Miniatura ${idx + 1}`}
                        >
                            <img src={img} alt={`Miniatura ${idx + 1}`} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});

const CamisetasDice = () => {
    const navigate = useNavigate();

    // UI states
    const [corSelecionada, setCorSelecionada] = useState("Preta");
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState("M");
    const [quantidade, setQuantidade] = useState(1);

    // store / frete / modais
    const [carrinho, setCarrinho] = useState([]);
    const [frete, setFrete] = useState(null);
    const [cep, setCep] = useState("");
    const [loadingFrete, setLoadingFrete] = useState(false);
    const [erroFrete, setErroFrete] = useState("");

    const [miniOpen, setMiniOpen] = useState(false);
    const [indexImagem, setIndexImagem] = useState(0);

    // modais
    const [abrirModalCompra, setAbrirModalCompra] = useState(false);
    const [showMostrarAddress, setShowMostrarAddress] = useState(false);

    // memo
    const imagens = useMemo(() => produto.cores.map((c) => c.imagem), []);
    const totalItens = useMemo(
        () => carrinho.reduce((acc, item) => acc + item.quantidade, 0),
        [carrinho]
    );

    // storage load
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setCarrinho(JSON.parse(stored));

        const storedFrete = localStorage.getItem(FRETE_KEY);
        if (storedFrete) setFrete(JSON.parse(storedFrete));
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
    }, [carrinho]);

    useEffect(() => {
        if (frete) localStorage.setItem(FRETE_KEY, JSON.stringify(frete));
    }, [frete]);

    // callbacks
    const trocarImagem = useCallback(
        (novoIndex) => {
            const total = imagens.length;
            const idx = ((novoIndex % total) + total) % total;
            setIndexImagem(idx);
        },
        [imagens.length]
    );

    const adicionarAoCarrinho = useCallback(
        (abrirMini = true) => {
            if (quantidade < 1) return;
            setCarrinho((prev) => {
                const idx = prev.findIndex(
                    (p) =>
                        p.id === produto.id &&
                        p.cor === corSelecionada &&
                        p.tamanho === tamanhoSelecionado
                );
                if (idx >= 0) {
                    const novo = [...prev];
                    novo[idx].quantidade += quantidade;
                    return novo;
                }
                return [
                    ...prev,
                    {
                        id: produto.id,
                        nome: produto.nome,
                        preco: produto.preco,
                        cor: corSelecionada,
                        tamanho: tamanhoSelecionado,
                        quantidade,
                    },
                ];
            });

            setQuantidade(1);
            if (abrirMini) setMiniOpen(true);
        },
        [corSelecionada, tamanhoSelecionado, quantidade]
    );

    const finalizarCompraWhatsApp = useCallback(() => {
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio.");
            return;
        }
        const resumo = carrinho
            .map(
                (item) =>
                    `• ${item.nome} (${item.cor}, ${item.tamanho}) — ${
                        item.quantidade
                    }x — ${formatBRL(item.preco * item.quantidade)}`
            )
            .join("%0A");

        const total =
            carrinho.reduce((a, b) => a + b.preco * b.quantidade, 0) +
            (frete?.valor || 0);
        const mensagem = `Olá! Gostaria de finalizar a compra:%0A${resumo}%0A%0ATotal: ${formatBRL(
            total
        )}${
            frete
                ? `%0A(Frete: ${formatBRL(frete.valor)} — ${frete.prazo})`
                : ""
        }`;
        window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagem}`,
            "_blank"
        );
    }, [carrinho, frete]);

    const calcularFrete = useCallback(() => {
        setErroFrete("");
        if (cep.length < 8) return setErroFrete("Digite um CEP válido.");
        setLoadingFrete(true);
        setTimeout(() => {
            setLoadingFrete(false);
            const valor = cep.endsWith("000") ? 0 : 24.9;
            const prazo =
                valor === 0 ? "Retirada gratuita" : "5 a 8 dias úteis";
            setFrete({ valor, prazo });
        }, 900);
    }, [cep]);

    // Finalizar na modal -> fechar modal revisão e abrir Address (opção A)
    const onModalFinalizar = () => {
        setAbrirModalCompra(false);
        setShowMostrarAddress(true);
    };

    return (
        <div className="dice-container">
            <header className="dice-header">
                <img
                    src={Logo}
                    alt="Logo Kamisaria Zanuto"
                    className="dice-logo"
                />
                <h1 className="dice-titulo">{produto.nome}</h1>
                <p className="dice-subtitle">
                    Estilo, conforto e caimento perfeito — a essência da linha{" "}
                    <strong>DICE</strong>.
                </p>

                <button
                    className="cart-fixed"
                    onClick={() => setMiniOpen((s) => !s)}
                >
                    🛒 Carrinho{" "}
                    {totalItens > 0 && (
                        <span className="cart-badge">{totalItens}</span>
                    )}
                </button>
            </header>

            <div className="dice-produto">
                <Galeria
                    imagens={imagens}
                    indexImagem={indexImagem}
                    onTrocar={trocarImagem}
                />

                <div className="dice-info">
                    <p className="dice-preco">{formatBRL(produto.preco)}</p>

                    <div className="dice-selecao">
                        <h4>Cor</h4>
                        <div className="dice-cores">
                            {produto.cores.map((cor) => (
                                <button
                                    key={cor.nome}
                                    className={`dice-cor-btn ${
                                        corSelecionada === cor.nome
                                            ? "ativa"
                                            : ""
                                    }`}
                                    style={{ backgroundColor: cor.corHex }}
                                    onClick={() => setCorSelecionada(cor.nome)}
                                    title={cor.nome}
                                />
                            ))}
                        </div>
                        <span className="cor-selecionada">
                            Cor selecionada: {corSelecionada}
                        </span>
                    </div>

                    <div className="dice-tamanho">
                        <h4>Tamanho</h4>
                        <div className="tamanho-opcoes">
                            {tamanhosDisponiveis.map((tam) => (
                                <button
                                    key={tam}
                                    className={`tamanho-btn ${
                                        tamanhoSelecionado === tam
                                            ? "ativa"
                                            : ""
                                    }`}
                                    onClick={() => setTamanhoSelecionado(tam)}
                                >
                                    {tam}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="dice-quantidade">
                        <h4>Quantidade</h4>
                        <div className="quantidade-controle">
                            <button
                                onClick={() =>
                                    setQuantidade((q) => Math.max(1, q - 1))
                                }
                            >
                                −
                            </button>
                            <span>{quantidade}</span>
                            <button onClick={() => setQuantidade((q) => q + 1)}>
                                +
                            </button>
                        </div>

                        {quantidade > 1 && (
                            <p className="total-multiplas">
                                Total:{" "}
                                <strong>
                                    {formatBRL(produto.preco * quantidade)}
                                </strong>
                            </p>
                        )}
                    </div>

                    <div className="dice-botoes">
                        <button
                            className="btn-carrinho"
                            onClick={() => adicionarAoCarrinho(true)}
                        >
                            Adicionar ao Carrinho
                        </button>
                        <button
                            className="btn-comprar"
                            onClick={() => setAbrirModalCompra(true)}
                        >
                            Comprar Agora
                        </button>
                    </div>

                    <div className="frete-section">
                        <input
                            type="text"
                            placeholder="Digite seu CEP"
                            value={cep}
                            onChange={(e) =>
                                setCep(e.target.value.replace(/\D/g, ""))
                            }
                            maxLength={8}
                            className="input-cep"
                        />
                        <button className="btn-frete" onClick={calcularFrete}>
                            {loadingFrete ? "Calculando..." : "Calcular"}
                        </button>

                        {erroFrete && <p className="frete-erro">{erroFrete}</p>}
                        {frete && (
                            <p className="frete-info">
                                Frete:{" "}
                                {frete.valor === 0
                                    ? "Grátis"
                                    : formatBRL(frete.valor)}{" "}
                                — {frete.prazo}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="dice-descricao">
                <h4>Descrição</h4>
                <p>
                    Camisa social de alto padrão, tecido premium, perfeita para
                    ocasiões especiais.
                </p>
                <ul className="dice-especificacoes">
                    <li>100% algodão</li>
                    <li>Corte slim fit</li>
                    <li>Disponível em diversas cores</li>
                </ul>
            </div>

            <button className="dice-voltar" onClick={() => navigate(-1)}>
                Voltar
            </button>

            {miniOpen && (
                <div className="mini-cart open">
                    <div className="mini-cart-header">
                        <span>Seu Carrinho</span>
                        <button
                            className="mini-close"
                            onClick={() => setMiniOpen(false)}
                        >
                            ×
                        </button>
                    </div>

                    <div className="mini-cart-body">
                        {carrinho.length === 0 && (
                            <p>Seu carrinho está vazio.</p>
                        )}

                        {carrinho.map((item, idx) => (
                            <div key={idx} className="mini-item">
                                <div className="mini-info">
                                    <span className="mini-title">
                                        {item.nome}
                                    </span>
                                    <span className="mini-meta">
                                        {item.cor} — {item.tamanho}
                                    </span>
                                    <div className="mini-qty">
                                        <button
                                            onClick={() =>
                                                setCarrinho((prev) => {
                                                    const novo = [...prev];
                                                    novo[idx].quantidade =
                                                        Math.max(
                                                            1,
                                                            novo[idx]
                                                                .quantidade - 1
                                                        );
                                                    return novo;
                                                })
                                            }
                                        >
                                            −
                                        </button>

                                        <span>{item.quantidade}</span>

                                        <button
                                            onClick={() =>
                                                setCarrinho((prev) => {
                                                    const novo = [...prev];
                                                    novo[idx].quantidade += 1;
                                                    return novo;
                                                })
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <span className="mini-price">
                                    {formatBRL(item.quantidade * item.preco)}
                                </span>
                            </div>
                        ))}

                        {carrinho.length > 0 && (
                            <div style={{ marginTop: 12 }}>
                                <button
                                    className="btn-comprar"
                                    onClick={finalizarCompraWhatsApp}
                                >
                                    Finalizar Compra via WhatsApp
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Address modal (recebe os dados preenchidos) */}
            {showMostrarAddress && (
                <Address
                    ativo={showMostrarAddress}
                    setAtivo={setShowMostrarAddress}
                    selectedSize={tamanhoSelecionado}
                    selectedColor={corSelecionada}
                    quantidade={quantidade}
                    valCamisa={produto.preco * quantidade}
                    frete={frete}
                />
            )}

            {/* Modal de revisão do pedido (abre antes do Address) */}
            {abrirModalCompra && (
                <div
                    className="dice-modal-overlay"
                    onClick={() => setAbrirModalCompra(false)}
                >
                    <div
                        className="dice-modal-compra"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="close-btn"
                            onClick={() => setAbrirModalCompra(false)}
                        >
                            ✕
                        </button>

                        <h2>Confira seu pedido</h2>

                        <div className="modal-produto">
                            <img src={imagens[indexImagem]} alt="Produto" />
                            <div>
                                <h3>{produto.nome}</h3>
                                <p>Cor: {corSelecionada}</p>
                                <p>Tamanho: {tamanhoSelecionado}</p>
                                <p>Quantidade: {quantidade}</p>
                                <p className="modal-preco">
                                    {formatBRL(produto.preco * quantidade)}
                                </p>
                            </div>
                        </div>

                        <div
                            style={{ display: "flex", gap: 10, marginTop: 18 }}
                        >
                            <button
                                className="modal-finalizar"
                                onClick={onModalFinalizar}
                            >
                                FINALIZAR COMPRA
                            </button>
                            <button
                                className="btn-carrinho"
                                onClick={() => {
                                    adicionarAoCarrinho(true);
                                    setAbrirModalCompra(false);
                                }}
                            >
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CamisetasDice;
