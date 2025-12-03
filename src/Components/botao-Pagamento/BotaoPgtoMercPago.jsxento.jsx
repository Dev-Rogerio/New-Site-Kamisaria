import React from "react";
import axios from "axios";

const BotaoPagamento = ({
    titulo,
    quantidade,
    valorUnitario,
    emailPagador,
    pedidoPayload, // 👈 payload completo do pedido (nome, endereço, tamanho, etc.)
}) => {
    // const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

    // 🔥 Detecta produção x desenvolvimento automaticamente
    const API_URL =
        window.location.hostname === "localhost"
            ? "http://localhost:3001"
            : "https://new-site-kamisaria-1.onrender.com";

    // Função genérica de POST
    const apiPost = async (route, data) => {
        try {
            const res = await axios.post(`${API_URL}/${route}`, data);
            return res.data;
        } catch (err) {
            console.error(`Erro na rota ${route}:`, err);
            return null;
        }
    };

    const handlePagamento = async () => {
        try {
            // 1️⃣ Envia o pedido antes (mesmo se não pagar)
            const emailOk = await apiPost("send-email", pedidoPayload);
            if (!emailOk) {
                alert("Erro ao enviar pedido. Tente novamente.");
                return;
            }

            // 2️⃣ Cria checkout do Mercado Pago
            const checkout = await apiPost("checkout_pro", {
                titulo,
                quantidade,
                valorUnitario,
                emailPagador,
            });

            if (!checkout?.init_point) {
                alert("Erro ao iniciar pagamento.");
                return;
            }

            // 3️⃣ Redireciona
            window.location.href = checkout.init_point;
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
