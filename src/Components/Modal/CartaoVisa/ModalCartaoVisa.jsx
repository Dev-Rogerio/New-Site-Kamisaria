import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { CornerUpLeft } from "lucide-react";

import Visa from "../../Img/visa.png";

import "../CartaoVisa/ModalCartaoVisa.css";

const VisaModal = ({ fecharCartao, onConfirmarPagamento, email, nome }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardBrand, setCardBrand] = useState("");
    const [emailPagador, setEmailPagador] = useState("");
    const [nomeCartao, setNomeCartao] = useState("");

    useEffect(() => {
        if (email) {
            setEmailPagador(email);
        }
    }, [email]);

    // sempre que a prop `nome` mudar, atualiza o estado
    useEffect(() => {
        setNomeCartao(nome);
    }, [nome]);

    const handleConfirmarPagamento = (e) => {
        e.preventDefault();
        setTimeout(() => {
            onConfirmarPagamento();
        }, 500);
    };

    const detectCardBrand = (number) => {
        const cleaned = number.replace(/\D/g, "");
        if (/^4/.test(cleaned)) return "Visa";
        if (/^5[1-5]/.test(cleaned)) return "Mastercard";
        if (/^3[47]/.test(cleaned)) return "Amex";
        return "";
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value;
        setCardNumber(value);
        setCardBrand(detectCardBrand(value));
    };

    return (
        <div className="pix-modal-overlay">
            <div className="pix-modal">
                <button
                    onClick={fecharCartao}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "none",
                        border: "none",
                        color: "#333",
                        cursor: "pointer",
                        fontSize: "15px",
                        marginBottom: "16px",
                    }}
                >
                    <CornerUpLeft size={22} /> Voltar
                </button>

                <div className="bandeira-visa">
                    <img src={Visa} alt="Visa" />
                </div>

                <h3
                    style={{
                        fontSize: "22px",
                        marginBottom: "20px",
                        color: "#222",
                        fontWeight: "600",
                        textAlign: "center",
                    }}
                >
                    Pagamento com Cartão
                </h3>

                <form
                    onSubmit={handleConfirmarPagamento}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px",
                    }}
                >
                    <InputMask
                        mask="9999 9999 9999 9999"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="Número do Cartão"
                        className="pix-input"
                    />
                    {cardBrand && (
                        <div
                            style={{
                                fontSize: "14px",
                                color: "#555",
                                textAlign: "left",
                                paddingLeft: "4px",
                            }}
                        >
                            Bandeira detectada: <strong>{cardBrand}</strong>
                        </div>
                    )}
                    <InputMask
                        mask="99/99"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="Validade (MM/AA)"
                        className="pix-input"
                    />
                    <InputMask
                        mask={cardBrand === "Amex" ? "9999" : "999"}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="CVV"
                        className="pix-input"
                    />
                    <input
                        type="text"
                        placeholder="Nome impresso no cartão"
                        className="pix-input"
                        value={nomeCartao}
                        onChange={(e) => setNomeCartao(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email do pagador"
                        className="pix-input"
                        value={emailPagador}
                        onChange={(e) => setEmailPagador(e.target.value)}
                    />

                    <button
                        type="submit"
                        style={{
                            background: "#111",
                            color: "#fff",
                            padding: "14px 26px",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "600",
                            transition: "all 0.3s ease",
                            marginTop: "18px",
                            alignSelf: "center",
                            width: "80%",
                            maxWidth: "320px",
                            textAlign: "center",
                        }}
                        onMouseOver={(e) =>
                            (e.target.style.background = "#222")
                        }
                        onMouseOut={(e) => (e.target.style.background = "#111")}
                    >
                        Confirmar Pagamento
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VisaModal;
