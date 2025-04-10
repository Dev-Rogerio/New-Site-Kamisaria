// server.js
import express from "express";
import cors from "cors";
import mercadopago from "mercadopago";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Verifica se a variável de ambiente está presente
if (!process.env.MP_ACCESS_TOKEN) {
    console.error(
        "Access token do Mercado Pago não configurado. Verifique seu .env"
    );
    process.exit(1);
}

// Configura a Access Token de PRODUÇÃO do Mercado Pago
mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
});

// Rota básica para teste
app.get("/", (req, res) => {
    res.send("API Mercado Pago ativa");
});

// Rota para criar uma preferência de pagamento
app.post("/criar-pagamento", async (req, res) => {
    try {
        const { descricao, preco, quantidade } = req.body;

        if (!descricao || !preco || !quantidade) {
            return res
                .status(400)
                .json({
                    error: "Campos obrigatórios: descricao, preco, quantidade",
                });
        }

        const preference = {
            items: [
                {
                    title: descricao,
                    unit_price: Number(preco),
                    quantity: Number(quantidade),
                },
            ],
            back_urls: {
                success: "https://sua-loja.com/sucesso",
                failure: "https://sua-loja.com/erro",
                pending: "https://sua-loja.com/pendente",
            },
            notification_url: "https://seu-servidor.com/notificacoes",
            auto_return: "approved",
        };

        const response = await mercadopago.preferences.create(preference);
        res.json({ id: response.body.id });
    } catch (error) {
        console.error("Erro ao criar pagamento:", error);
        res.status(500).json({ error: "Erro ao criar pagamento" });
    }
});

// Rota para receber notificações de pagamento
app.post("/notificacoes", (req, res) => {
    const notificacao = req.body;
    console.log("🔔 Notificação recebida do Mercado Pago:", notificacao);
    // Você pode salvar essas informações em banco ou tratar conforme necessário
    res.sendStatus(200);
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
