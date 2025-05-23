import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { CornerUpLeft } from "lucide-react";
import BandeiraVisa from "../CartaoVisa/bandeiraVisa.jsx";
import "../CartaoVisa/ModalCartaoVisa.css";

const VisaModal = ({ fecharCartao, onConfirmarPagamento, email, nome }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardBrand, setCardBrand] = useState("");
    const [emailPagador, setEmailPagador] = useState(email || "");
    const [nomeCartao, setNomeCartao] = useState(nome || "");

    useEffect(() => {
        if (email) setEmailPagador(email);
    }, [email]);

    useEffect(() => {
        if (nome) setNomeCartao(nome);
    }, [nome]);

    const handleConfirmarPagamento = (e) => {
        e.preventDefault();
        setTimeout(onConfirmarPagamento, 500);
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
                <button className="voltar-botao" onClick={fecharCartao}>
                    <CornerUpLeft size={22} /> Voltar
                </button>

                <h3 className="titulo-modal">Pagamento com Cartão</h3>

                <BandeiraVisa
                    cardNumber={cardNumber}
                    nomeCartao={nomeCartao}
                    expiry={expiry}
                />

                <form
                    onSubmit={handleConfirmarPagamento}
                    className="form-cartao"
                >
                    <InputMask
                        mask="9999 9999 9999 9999"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="Número do Cartão"
                        className="pix-input"
                    />

                    {cardBrand && (
                        <div className="bandeira-detectada">
                            Bandeira detectada: <strong>{cardBrand}</strong>
                        </div>
                    )}

                    <div className="input-duplo">
                        <InputMask
                            mask="99/99"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            placeholder="Validade (MM/AA)"
                            className="pix-input metade"
                        />
                        <InputMask
                            mask={cardBrand === "Amex" ? "9999" : "999"}
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            placeholder="CVV"
                            className="pix-input metade"
                        />
                    </div>

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

                    <button type="submit" className="botao-confirmar">
                        Confirmar Pagamento
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VisaModal;
