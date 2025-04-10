import React, { useState } from "react";
import { X } from "lucide-react";
import Amex from "../../Img/amex.png";
import Elo from "../../Img/elo.png";
import Visa from "../../Img/visa.png";
import MasterCard from "../../Img/mastercard.png";
import "../Pagamento/pagamento.css";

const ICONES_CARTAO = [
    { src: Visa, label: "Visa" },
    { src: MasterCard, label: "MasterCard" },
    { src: Elo, label: "Elo" },
    { src: Amex, label: "Amex" },
];

const ModalPagamento = () => {
    const [formaPagamento, setFormaPagamento] = useState(null);
    const [parcelas, setParcelas] = useState([]);
    const [parcelaSelecionada, setParcelaSelecionada] = useState(null);
    const [cartao, setCartao] = useState({
        numero: "",
        nome: "",
        validade: "",
        cvv: "",
    });

    const gerarParcelas = (valorTotal) => {
        return Array.from({ length: 3 }, (_, i) => {
            const qtd = i + 1;
            const valorParcela = (valorTotal / qtd)
                .toFixed(2)
                .replace(".", ",");
            return `${qtd}x de R$${valorParcela}`;
        });
    };

    const selecionarCartao = (bandeira) => {
        setFormaPagamento(bandeira);
        setParcelas(gerarParcelas(100));
        setParcelaSelecionada(null);
    };

    const aplicarMascara = {
        numero: (valor) =>
            valor
                .replace(/\D/g, "")
                .replace(/(\d{4})(?=\d)/g, "$1 ")
                .trim(),
        validade: (valor) =>
            valor
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d{1,2})/, "$1/$2")
                .substring(0, 5),
        cvv: (valor) => valor.replace(/\D/g, "").substring(0, 4),
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const formatado = aplicarMascara[name]
            ? aplicarMascara[name](value)
            : value;
        setCartao((prev) => ({ ...prev, [name]: formatado }));
    };

    const renderBotaoConfirmar = () => {
        switch (formaPagamento) {
            case "PIX":
                return "Pagar com Pix";
            case "PayPal":
                return "Pagar com PayPal";
            case null:
                return "Confirmar Pagamento";
            default:
                return `Pagar com ${formaPagamento}`;
        }
    };

    const renderCartoes = (filtrarSelecionado = false) => (
        <div className="card-icons">
            {ICONES_CARTAO.filter(
                ({ label }) => !filtrarSelecionado || label === formaPagamento
            ).map(({ src, label }) => (
                <img
                    key={label}
                    src={src}
                    alt={label}
                    onClick={
                        !filtrarSelecionado
                            ? () => selecionarCartao(label)
                            : undefined
                    }
                    className={`payment-icon ${
                        filtrarSelecionado ? "selected" : ""
                    }`}
                />
            ))}
        </div>
    );

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-panel">
                    <button className="close-button">
                        <X size={20} />
                    </button>

                    <h2 className="modal-title">Formas de Pagamento</h2>

                    {!formaPagamento && (
                        <>
                            <section className="modal-section">
                                <h3 className="text-center">
                                    Cartões de Crédito
                                </h3>
                                {renderCartoes()}
                            </section>

                            <section
                                className="modal-section pix-option"
                                onClick={() => setFormaPagamento("PIX")}
                            >
                                <h2>PIX</h2>
                                <p>
                                    Após escolher o PIX, você receberá o QR Code
                                    para pagamento instantâneo.
                                </p>
                            </section>

                            <section
                                className="modal-section paypal-option"
                                onClick={() => setFormaPagamento("PayPal")}
                            >
                                <h2>PayPal</h2>
                                <p>
                                    Também aceitamos PayPal com segurança e
                                    praticidade.
                                </p>
                            </section>
                        </>
                    )}

                    {ICONES_CARTAO.map(({ label }) => label).includes(
                        formaPagamento
                    ) && (
                        <section className="modal-section">
                            <button
                                className="back-button"
                                onClick={() => setFormaPagamento(null)}
                            >
                                ← Voltar
                            </button>

                            {renderCartoes(true)}

                            <p className="text-sm text-center mt-2">
                                Forma selecionada:{" "}
                                <strong>{formaPagamento}</strong>
                            </p>

                            <input
                                type="text"
                                name="numero"
                                placeholder="Número do Cartão"
                                value={cartao.numero}
                                onChange={handleChange}
                                className="input"
                            />
                            <input
                                type="text"
                                name="nome"
                                placeholder="Nome do Titular"
                                value={cartao.nome}
                                onChange={handleChange}
                                className="input"
                            />

                            <div className="input-group">
                                <input
                                    type="text"
                                    name="validade"
                                    placeholder="MM/AA"
                                    value={cartao.validade}
                                    onChange={handleChange}
                                    className="input"
                                />
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV"
                                    value={cartao.cvv}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </div>

                            {parcelas.length > 0 && (
                                <div className="parcelas">
                                    <h4 className="text-center mt-2 mb-1">
                                        Opções de Parcelamento:
                                    </h4>
                                    <ul className="text-center text-sm">
                                        {parcelas.map((parcela, index) => (
                                            <li
                                                key={index}
                                                onClick={() =>
                                                    setParcelaSelecionada(
                                                        parcela
                                                    )
                                                }
                                                className={`parcela-item ${
                                                    parcelaSelecionada ===
                                                    parcela
                                                        ? "selected"
                                                        : ""
                                                }`}
                                            >
                                                {parcela}
                                            </li>
                                        ))}
                                    </ul>
                                    {parcelaSelecionada && (
                                        <p className="text-center mt-2 text-green-700">
                                            Você escolheu:{" "}
                                            <strong>
                                                {parcelaSelecionada}
                                            </strong>
                                        </p>
                                    )}
                                </div>
                            )}
                        </section>
                    )}

                    {formaPagamento === "PIX" && (
                        <section className="modal-section">
                            <button
                                className="back-button"
                                onClick={() => setFormaPagamento(null)}
                            >
                                ← Voltar
                            </button>
                            <h2>Pagamento via PIX</h2>
                            <p>
                                Chave Pix:{" "}
                                <strong>pagamento@empresa.com</strong>
                            </p>
                            <p>Ou escaneie o QR Code abaixo:</p>
                            <img
                                src="/pix-qr.png"
                                alt="QR Pix"
                                style={{ maxWidth: "200px", margin: "0 auto" }}
                            />
                        </section>
                    )}

                    {formaPagamento === "PayPal" && (
                        <section className="modal-section">
                            <button
                                className="back-button"
                                onClick={() => setFormaPagamento(null)}
                            >
                                ← Voltar
                            </button>
                            <h2>Pagamento via PayPal</h2>
                            <p>
                                Você será redirecionado para o site do PayPal
                                após confirmar o pedido.
                            </p>
                        </section>
                    )}

                    <div className="button-container">
                        <button className="confirm-button">
                            {renderBotaoConfirmar()}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalPagamento;
