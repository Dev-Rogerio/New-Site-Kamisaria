import React, { useState, useEffect } from "react";
import axios from "axios";
import { CornerUpLeft } from "lucide-react";
import "../modalPagamento/ModalPagamento.css";

import Visa from "../../img/visa.png";
import MasterCard from "../../img/mastercard.png";
import Paypal from "../../img/Paypal.png";
import Pix from "../../img/pix.png";

import PixModal from "../Pix/ModalPix";
import VisaModal from "../CartaoVisa/VisaModal";

// ======================================
// CONFIG: URL automática (LOCAL / PROD)
// ======================================
const API_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:3001"
        : "https://new-site-kamisaria-1.onrender.com";

const ModalPagamento = ({
    fecharPagamento,
    descricao,
    valCamisa,
    quantidade,
    selectedSize,
    selectedColor,
    email,
}) => {
    const [paymentResponse, setPaymentResponse] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCartaoModal, setShowCartaoModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // ============================
    // Auto esconder modal sucesso
    // ============================
    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    // ============================
    // Handlers
    // ============================
    const abrirCartao = () => setShowCartaoModal(true);
    const fecharCartao = () => setShowCartaoModal(false);

    const handleConfirmarPagamentoVisa = () => {
        setShowCartaoModal(false);
        setShowSuccess(true);
    };

    // ============================
    // API: gerar PIX
    // ============================
    const handlePayment = async (e) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            alert("E-mail inválido.");
            return;
        }

        const payload = {
            transactionAmount: Number(valCamisa) * Number(quantidade),
            description: descricao,
            email,
            firstName: "Cliente",
            lastName: "Kamisaria",
        };

        try {
            const response = await axios.post(
                `${API_URL}/api/gerar-pix`,
                payload
            );

            if (response.data?.qr_code || response.data?.qr_code_base64) {
                setPaymentResponse(response.data);
                setShowModal(true);
            } else {
                console.error("QR Code não gerado:", response.data);
                alert("Erro ao gerar Pix.");
            }
        } catch (error) {
            console.error("Erro ao gerar Pix:", error);
            alert("Erro ao gerar Pix.");
        }
    };

    const handleCopyClick = () => {
        if (paymentResponse?.qr_code) {
            navigator.clipboard.writeText(paymentResponse.qr_code);
            alert("Chave Pix copiada!");
        }
    };

    const toggleDarkMode = () => {
        document.body.classList.toggle("dark-mode");
    };

    // ============================
    // RENDER
    // ============================
    return (
        <div className="pix-modal-overlay">
            <div className="pix-modal">
                {/* Voltar */}
                <button onClick={fecharPagamento} className="btn-back">
                    <CornerUpLeft size={22} /> Voltar
                </button>

                <h2 className="pix-title">Escolha a forma de Pagamento</h2>

                {/* FORM */}
                <form onSubmit={handlePayment} className="pix-form">
                    <input
                        type="text"
                        value={descricao}
                        className="pix-input"
                        readOnly
                    />
                    <input
                        type="text"
                        value={`R$ ${Number(valCamisa)
                            .toFixed(2)
                            .replace(".", ",")}`}
                        className="pix-input"
                        readOnly
                    />
                    <input
                        type="text"
                        value={`Quantidade: ${quantidade}`}
                        className="pix-input"
                        readOnly
                    />
                    <input
                        type="text"
                        value={`Tamanho: ${selectedSize}`}
                        className="pix-input"
                        readOnly
                    />
                    <input
                        type="text"
                        value={`Cor: ${selectedColor}`}
                        className="pix-input"
                        readOnly
                    />

                    {/* OPÇÕES DE PAGAMENTO */}
                    <div className="pix-button-container">
                        <button type="submit" className="pix-button">
                            <img src={Pix} alt="Pix" className="pix" />
                        </button>

                        <button
                            type="button"
                            className="pix-card-button"
                            onClick={abrirCartao}
                        >
                            <img src={Visa} alt="Visa" className="visa" />
                        </button>

                        <button type="button" className="pix-card-button">
                            <img
                                src={MasterCard}
                                alt="MasterCard"
                                className="imgMasterCard"
                            />
                        </button>

                        <button type="button" className="pix-card-button">
                            <img src={Paypal} alt="Paypal" className="paypal" />
                        </button>
                    </div>
                </form>

                {/* MODAL PIX */}
                <PixModal
                    show={showModal}
                    paymentResponse={paymentResponse}
                    fecharPagamento={fecharPagamento}
                    handleCopyClick={handleCopyClick}
                    toggleDarkMode={toggleDarkMode}
                />

                {/* MODAL VISA */}
                {showCartaoModal && (
                    <VisaModal
                        fecharCartao={fecharCartao}
                        onConfirmarPagamento={handleConfirmarPagamentoVisa}
                        email={email}
                        valor={Number(valCamisa) * Number(quantidade)}
                    />
                )}

                {/* MODAL SUCESSO */}
                {showSuccess && (
                    <div className="modal-sucesso-overlay">
                        <div className="modal-sucesso">
                            <h2>✅ Pagamento realizado com sucesso!</h2>
                            <button onClick={() => setShowSuccess(false)}>
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalPagamento;
