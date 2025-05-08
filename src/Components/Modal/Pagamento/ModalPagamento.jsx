import React, { useState, useEffect } from "react";
import axios from "axios";
import { CornerUpLeft } from "lucide-react";
import "./ModalPagamento.css";

import Visa from "../../Img/visa.png";
import MasterCard from "../../Img/mastercard.png";
import Paypal from "../../Img/Paypal.png";
import Pix from "../../Img/pix.png";
import PixModal from "../Pix/ModalPix";
import VisaModal from "../CartaoVisa/ModalCartaoVisa";

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
    const [showSuccess, setShowSuccess] = useState(false); // controle modal de sucesso

    // este setEmail pode vir de algum formulário anterior

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    const abrirCartao = () => {
        setShowCartaoModal(true);
    };

    const fecharCartao = () => {
        setShowCartaoModal(false);
    };

    const handleConfirmarPagamentoVisa = () => {
        setShowCartaoModal(false);
        setShowSuccess(true);
        // ou poderia disparar um alert aqui também
        // alert("Pagamento realizado com sucesso via Cartão (teste)!");
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            alert("E-mail inválido ou vazio.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3001/api/gerar-pix",
                {
                    transactionAmount: Number(valCamisa) * Number(quantidade),
                    description: descricao,
                    email,
                    firstName: "Cliente",
                    lastName: "Kamisaria",
                }
            );

            if (response.data?.qr_code || response.data?.qr_code_base64) {
                setPaymentResponse(response.data);
                setShowModal(true);
            } else {
                console.error("QR Code não foi gerado.");
                alert("Erro ao gerar Pix. Verifique o console.");
            }
        } catch (error) {
            console.error("Erro ao gerar Pix:", error);
            alert("Erro ao gerar Pix. Verifique o console.");
        }
    };

    const handleCopyClick = () => {
        if (paymentResponse?.qr_code) {
            navigator.clipboard.writeText(paymentResponse.qr_code);
            alert("Chave Pix copiada com sucesso!");
        }
    };

    const toggleDarkMode = () => {
        document.body.classList.toggle("dark-mode");
    };

    return (
        <div className="pix-modal-overlay">
            <div className="pix-modal">
                <button
                    onClick={fecharPagamento}
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
                <h2 className="pix-title">Escolha a forma de Pagamento</h2>

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

                <PixModal
                    show={showModal}
                    paymentResponse={paymentResponse}
                    fecharPagamento={fecharPagamento}
                    handleCopyClick={handleCopyClick}
                    toggleDarkMode={toggleDarkMode}
                />

                {showCartaoModal && (
                    <VisaModal
                        fecharCartao={fecharCartao}
                        onConfirmarPagamento={handleConfirmarPagamentoVisa}
                        email={email} // aqui está passando o email corretamente!
                    />
                )}

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
