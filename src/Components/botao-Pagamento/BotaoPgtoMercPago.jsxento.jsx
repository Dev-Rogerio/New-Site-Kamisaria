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

            const url = response.data.init_point;

            window.location.href = url;
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
