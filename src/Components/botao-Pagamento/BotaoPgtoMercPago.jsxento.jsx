import React from "react";
import axios from "axios";

const BotaoPagamento = () => {
    const handlePagamento = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3001/criar-preferencia",
                {
                    title: "Camisa Social Sob Medida",
                    quantity: 1,
                    price: 199.9,
                }
            );

            const preferenceId = response.data.id;
            // Redirecionar para o checkout do Mercado Pago
            window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}`;
        } catch (error) {
            console.error("Erro ao iniciar pagamento:", error);
            alert("Erro ao iniciar pagamento. Tente novamente.");
        }
    };

    return (
        <button
            onClick={handlePagamento}
            style={{
                padding: "12px 24px",
                fontSize: "16px",
                backgroundColor: "#3483fa",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
            }}
        >
            Pagar com Mercado Pago
        </button>
    );
};

export default BotaoPagamento;
