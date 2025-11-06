import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/logovetorizadoKZ.png";
import "../menuStore/camisetasDice.css";

import Preta from "../../img/muscle-fit-preta.jpg";
import Branca from "../../img/muscle-fit-branca.jpg";
import Azul from "../../img/muscle-fit-azul.jpg";
import Cinza from "../../img/muscle-fit-cinza.jpg";
import Bordo from "../../img/muscle-fit-bordo.jpg";
import Referencia from "../../img/muscle-fit-referenciaDice.jpg";

const STORAGE_KEY = "kamisaria_carrinho_v1";
const FRETE_KEY = "kamisaria_frete_v1";
const WHATSAPP_NUMBER = "5511945599306";

const produto = {
    id: 1,
    nome: "Camiseta Muscle Fit",
    preco: 160.0,
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

const CamisetasDice = () => {
    const navigate = useNavigate();

    // ===== Estados =====
    const [corSelecionada, setCorSelecionada] = useState("Preta");
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState("M");
    const [quantidade, setQuantidade] = useState(1);
    const [carrinho, setCarrinho] = useState([]);
    const [frete, setFrete] = useState(null);
    const [cep, setCep] = useState("");
    const [loadingFrete, setLoadingFrete] = useState(false);
    const [erroFrete, setErroFrete] = useState("");
    const [miniOpen, setMiniOpen] = useState(false);
    const [indexImagem, setIndexImagem] = useState(0);

    const imagens = produto.cores.map((c) => c.imagem);
    const imagemAtual = produto.cores.find(
        (c) => c.nome === corSelecionada
    )?.imagem;

    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

    // ===== LocalStorage =====
    useEffect(() => {
        const storedCart = localStorage.getItem(STORAGE_KEY);
        if (storedCart) setCarrinho(JSON.parse(storedCart));
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
    }, [carrinho]);

    useEffect(() => {
        const storedFrete = localStorage.getItem(FRETE_KEY);
        if (storedFrete) setFrete(JSON.parse(storedFrete));
    }, []);

    useEffect(() => {
        if (frete) localStorage.setItem(FRETE_KEY, JSON.stringify(frete));
    }, [frete]);

    // ===== Funções =====
    const adicionarAoCarrinho = (abrirMini = true) => {
        if (quantidade < 1) return;

        setCarrinho((prev) => {
            const idx = prev.findIndex(
                (p) =>
                    p.id === produto.id &&
                    p.cor === corSelecionada &&
                    p.tamanho === tamanhoSelecionado
            );
            if (idx >= 0) {
                const copy = [...prev];
                copy[idx].quantidade += quantidade;
                return copy;
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
    };

    const finalizarCompra = () => {
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
    };

    const calcularFrete = () => {
        setErroFrete("");
        if (!cep || cep.length < 8) {
            setErroFrete("Digite um CEP válido.");
            return;
        }

        setLoadingFrete(true);
        setTimeout(() => {
            setLoadingFrete(false);
            const valor = cep.endsWith("000") ? 0 : 24.9;
            const prazo =
                valor === 0 ? "Retirada gratuita" : "Prazo: 5 a 8 dias úteis";
            setFrete({ valor, prazo });
        }, 1200);
    };

    // ===== Componentes internos =====
    const Galeria = () => (
        <div className="dice-img-box">
            <div className="gallery">
                <div className="gallery-main">
                    <img
                        src={imagemAtual}
                        alt={`${produto.nome} - ${corSelecionada}`}
                        className="dice-main-img"
                    />

                    <button
                        className="gallery-arrow left"
                        onClick={() =>
                            setIndexImagem(
                                (prev) =>
                                    (prev - 1 + imagens.length) % imagens.length
                            )
                        }
                    >
                        ‹
                    </button>
                    <button
                        className="gallery-arrow right"
                        onClick={() =>
                            setIndexImagem(
                                (prev) => (prev + 1) % imagens.length
                            )
                        }
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
                            onClick={() => setIndexImagem(idx)}
                        >
                            <img
                                src={img}
                                alt={`${produto.nome} mini ${idx}`}
                            />
                        </button>
                    ))}
                </div>

                {/* 🔥 Imagem de referência logo abaixo das thumbs */}
                <div className="referencia-box">
                    <div className="tabela-container">
                        <h4 className="tabela-titulo">
                            Tabela de Medidas (cm)
                        </h4>
                        <table className="tabela-medidas-ui">
                            <thead>
                                <tr>
                                    <th>Medidas</th>
                                    <th>PP</th>
                                    <th>P</th>
                                    <th>M</th>
                                    <th>G</th>
                                    <th>GG</th>
                                    <th>EG</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>A — Largura do Tórax</td>
                                    <td>41</td>
                                    <td>44</td>
                                    <td>47</td>
                                    <td>50</td>
                                    <td>54</td>
                                    <td>58</td>
                                </tr>
                                <tr>
                                    <td>B — Costa Ombro a Ombro</td>
                                    <td>40</td>
                                    <td>41</td>
                                    <td>43</td>
                                    <td>45</td>
                                    <td>48</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td>C — Comprimento Total</td>
                                    <td>65</td>
                                    <td>69</td>
                                    <td>70</td>
                                    <td>72</td>
                                    <td>74</td>
                                    <td>77</td>
                                </tr>
                                <tr>
                                    <td>D — Comprimento da Manga</td>
                                    <td>17</td>
                                    <td>19</td>
                                    <td>19</td>
                                    <td>20</td>
                                    <td>20</td>
                                    <td>22</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <img
                        className="ref"
                        src={Referencia}
                        alt="Referência de medidas"
                    />
                </div>
            </div>
        </div>
    );

    const ProdutoInfo = () => (
        <div className="dice-info">
            <p className="dice-preco">{formatBRL(produto.preco)}</p>

            <div className="dice-selecao">
                <h4>Cor</h4>
                <div className="dice-cores">
                    {produto.cores.map((cor) => (
                        <button
                            key={cor.nome}
                            className={`dice-cor-btn ${
                                corSelecionada === cor.nome ? "ativa" : ""
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
                                tamanhoSelecionado === tam ? "ativa" : ""
                            }`}
                            onClick={() => setTamanhoSelecionado(tam)}
                        >
                            {tam}
                        </button>
                    ))}
                </div>
            </div>

            {/* <div className="dice-quantidade">
                <h4>Quantidade</h4>
                <div className="quantidade-controle">
                    <button
                        onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                    >
                        −
                    </button>
                    <span>{quantidade}</span>
                    <button onClick={() => setQuantidade((q) => q + 1)}>
                        +
                    </button>
                </div>
            </div> */}

            <div className="dice-quantidade">
                <h4>Quantidade</h4>
                <div className="quantidade-controle">
                    <button
                        onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                    >
                        −
                    </button>
                    <span>{quantidade}</span>
                    <button onClick={() => setQuantidade((q) => q + 1)}>
                        +
                    </button>
                </div>

                {/* 🔥 Mostra o total se for 2 ou mais unidades */}
                {quantidade > 1 && (
                    <p className="total-multiplas">
                        Total:{" "}
                        <strong>{formatBRL(produto.preco * quantidade)}</strong>
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
                    onClick={() => {
                        adicionarAoCarrinho(false);
                        finalizarCompra();
                    }}
                >
                    Comprar Agora
                </button>
            </div>

            {/* <div className="frete-section">
                <input
                    type="text"
                    placeholder="Digite seu CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
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
                        {frete.valor === 0 ? "Grátis" : formatBRL(frete.valor)}{" "}
                        — {frete.prazo}
                    </p>
                )}
            </div> */}

            <div className="frete-section">
                <input
                    type="text"
                    placeholder="Digite seu CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
                    maxLength={8}
                    className="input-cep"
                />
                <button className="btn-frete" onClick={calcularFrete}>
                    {loadingFrete ? "Calculando..." : "Calcular"}
                </button>

                {erroFrete && <p className="frete-erro">{erroFrete}</p>}
                {frete && (
                    <>
                        <p className="frete-info">
                            Frete:{" "}
                            {frete.valor === 0
                                ? "Grátis"
                                : formatBRL(frete.valor)}{" "}
                            — {frete.prazo}
                        </p>

                        {/* 🔥 Dica de tamanho abaixo do traço */}
                    </>
                )}
            </div>

            <TabelaMedidas />

            <p className="dica-tamanho">
                <strong>Dica de tamanho:</strong> Prefere um caimento menos
                ajustado? Escolha um tamanho acima do seu habitual.
            </p>
        </div>
    );

    const TabelaMedidas = () => (
        <div className="tabela-medidas-texto">
            <p>
                <strong>TABELA DE MEDIDAS</strong>
            </p>
            <p>
                Para escolher o tamanho ideal da sua camiseta, confira as
                medidas abaixo. Todas as medidas estão em centímetros (cm).
            </p>

            {/* <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>PP</th>
                        <th>P</th>
                        <th>M</th>
                        <th>G</th>
                        <th>GG</th>
                        <th>EG</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>A- Largura Tórax (cm) </td>
                        <td>41</td>
                        <td>44</td>
                        <td>47</td>
                        <td>50</td>
                        <td>54</td>
                        <td>58</td>
                    </tr>

                    <tr>
                        <td>B- Costa Ombro a Ombro (cm) </td>
                        <td>40</td>
                        <td>41</td>
                        <td>43</td>
                        <td>45</td>
                        <td>48</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>C- Comprimento Total (cm) </td>
                        <td>65</td>
                        <td>69</td>
                        <td>70</td>
                        <td>72</td>
                        <td>74</td>
                        <td>77</td>
                    </tr>
                    <tr>
                        <td>D- Comprimento da Manga (cm) </td>
                        <td>17</td>
                        <td>19</td>
                        <td>19</td>
                        <td>20</td>
                        <td>20</td>
                        <td>22</td>
                    </tr>
                </tbody>
            </table> */}
            <table>
                <thead>
                    <tr>
                        <th>Tamanho</th>
                        <th>Largura Tórax</th>
                        <th>Costas</th>
                        <th>Manga</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>P</td>
                        <td>48</td>
                        <td>66</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>M</td>
                        <td>52</td>
                        <td>68</td>
                        <td>21</td>
                    </tr>
                    <tr>
                        <td>G</td>
                        <td>56</td>
                        <td>70</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <td>GG</td>
                        <td>60</td>
                        <td>72</td>
                        <td>23</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    const MiniCarrinho = () => (
        <div className={`mini-cart ${miniOpen ? "open" : ""}`}>
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
                <ul className="mini-list">
                    {carrinho.length === 0 && <li>Seu carrinho está vazio.</li>}
                    {carrinho.map((item, idx) => (
                        <li key={idx} className="mini-item">
                            <div className="mini-info">
                                <span className="mini-title">{item.nome}</span>
                                <span className="mini-meta">
                                    {item.cor} — {item.tamanho}
                                </span>
                                <div className="mini-qty">
                                    <button
                                        onClick={() =>
                                            setCarrinho((prev) => {
                                                const copy = [...prev];
                                                copy[idx].quantidade = Math.max(
                                                    1,
                                                    copy[idx].quantidade - 1
                                                );
                                                return copy;
                                            })
                                        }
                                    >
                                        −
                                    </button>
                                    <span>{item.quantidade}</span>
                                    <button
                                        onClick={() =>
                                            setCarrinho((prev) => {
                                                const copy = [...prev];
                                                copy[idx].quantidade += 1;
                                                return copy;
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
                            <button
                                className="mini-remove"
                                onClick={() =>
                                    setCarrinho((prev) =>
                                        prev.filter((_, i) => i !== idx)
                                    )
                                }
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
                {carrinho.length > 0 && (
                    <button className="btn-comprar" onClick={finalizarCompra}>
                        Finalizar Compra
                    </button>
                )}
            </div>
        </div>
    );

    // ===== JSX principal =====
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
                <Galeria />
                <ProdutoInfo />
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

            <MiniCarrinho />
        </div>
    );
};

export default CamisetasDice;
