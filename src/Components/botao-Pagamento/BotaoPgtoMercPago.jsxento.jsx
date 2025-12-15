import React from "react";
import axios from "axios";

const BotaoPagamento = ({ pedidoPayload }) => {
    const API_URL =
        window.location.hostname === "localhost"
            ? "http://localhost:3001"
            : "https://new-site-kamisaria-1.onrender.com";

    // Função para chamar a API
    const apiPost = async (route, data) => {
        try {
            const res = await axios.post(`${API_URL}/${route}`, data);
            return res.data;
        } catch (err) {
            console.error(
                `❌ Erro na rota ${route}:`,
                err.response?.data || err
            );
            return null;
        }
    };

    // Função para validar campos obrigatórios do pedido
    const validarPayload = (payload) => {
        const camposObrigatorios = [
            "nome",
            "email",
            "telefone",
            "endereco",
            "numero",
            "bairro",
            "cidade",
            "estado",
            "cep",
            "cor",
            "tamanho",
            "quantidade",
            "valorTotal",
        ];
        for (let campo of camposObrigatorios) {
            if (!payload[campo]) return campo;
        }
        return null;
    };

    const handleEnvioEmail = async () => {
        try {
            // 0️⃣ Valida payload
            const campoFaltando = validarPayload(pedidoPayload);
            if (campoFaltando) {
                alert(`❌ Campo obrigatório faltando: ${campoFaltando}`);
                return;
            }

            console.log("📦 Enviando pedido:", pedidoPayload);

            // 1️⃣ Envia email e espera resposta
            const emailRes = await apiPost("send-email", pedidoPayload);

            if (emailRes?.status === "ok") {
                console.log("📧 Email enviado com sucesso!");
                alert(
                    "✅ Pedido enviado! Verifique seu email para confirmação."
                );
            } else {
                console.warn("⚠️ Falha ao enviar email:", emailRes);
                alert("❌ Falha ao enviar pedido. Tente novamente.");
            }
        } catch (error) {
            console.error("🔥 Erro geral ao enviar email:", error);
            alert("❌ Erro ao enviar pedido. Tente novamente.");
        }
    };

    return (
        <button
            onClick={handleEnvioEmail}
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
            Enviar Pedido por Email
        </button>
    );
};

export default BotaoPagamento;
