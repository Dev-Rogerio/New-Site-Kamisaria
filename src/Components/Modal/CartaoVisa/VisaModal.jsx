import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { CornerUpLeft } from "lucide-react";
import BandeiraVisa from "../CartaoVisa/bandeiraVisa.jsx";
import "../CartaoVisa/VisaModal.css";

const VisaModal = ({ fecharCartao, email, nome }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardBrand, setCardBrand] = useState("");
    const [emailPagador, setEmailPagador] = useState(email || "");
    const [nomeCartao, setNomeCartao] = useState(nome || "");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (email) setEmailPagador(email);
    }, [email]);

    useEffect(() => {
        if (nome) setNomeCartao(nome);
    }, [nome]);

    // Detecta a bandeira do cartão com base nos primeiros dígitos
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

    const MERCADO_PAGO_EMAIL = "roger.ngt3494@gmail.com"; // substitua pelo e-mail da sua conta Mercado Pago

    const handleConfirmarPagamento = async (e) => {
        e.preventDefault();

        if (emailPagador.toLowerCase() === MERCADO_PAGO_EMAIL.toLowerCase()) {
            setMessage(
                "Erro: O e-mail do pagador não pode ser o mesmo do recebedor."
            );
            return;
        }

        const frete = 25.0;

        const valorTotal = valorCamisa + frete;

        const pagamentoData = {
            titulo: "Camisa Social",
            quantidade,
            valorUnitario: valorTotal,
            emailPagador,
            nomeCartao,
        };

        console.log("🔁 Iniciando pagamento:", pagamentoData);

        try {
            const response = await fetch("http://localhost:3001/checkout_pro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pagamentoData),
            });

            const data = await response.json();

            if (response.ok && data.init_point) {
                console.log("✅ Preferência criada:", data.init_point);
                window.location.href = data.init_point;
            } else {
                console.error("⚠️ Erro ao criar preferência:", data);
                setMessage("Erro ao criar pagamento. Tente novamente.");
            }
        } catch (error) {
            console.error("❌ Erro inesperado:", error);
            setMessage("Erro inesperado ao processar pagamento.");
        }
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

                    {message && <p className="mensagem-pagamento">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default VisaModal;
