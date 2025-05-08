import React from "react";
import "../Pix/ModalPix.css";

const PixModal = ({
    show,
    paymentResponse,
    fecharPagamento,
    handleCopyClick,
    toggleDarkMode,
}) => {
    if (!show || !paymentResponse) return null;

    return (
        <div className="pix-modal-overlay">
            <div className="pix-modal">
                <button onClick={fecharPagamento} className="pix-close-button">
                    ×
                </button>

                <div className="pix-payment-result">
                    <h3>Escaneie o QR Code Pix</h3>

                    {paymentResponse.qr_code_base64 ? (
                        <img
                            src={`data:image/png;base64,${paymentResponse.qr_code_base64}`}
                            alt="QR Code Pix"
                            className="pix-qr"
                        />
                    ) : (
                        <p>Erro ao gerar QR Code Pix.</p>
                    )}

                    <p className="pix-info-text">
                        Ou copie e cole o código no app do seu banco:
                    </p>

                    <p className="pix-code">{paymentResponse.qr_code}</p>

                    <button
                        onClick={handleCopyClick}
                        className="pix-copy-button"
                    >
                        Copiar Código Pix
                    </button>

                    <button
                        onClick={toggleDarkMode}
                        className="toggle-theme-button"
                    >
                        🌙 Alternar Tema
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PixModal;
