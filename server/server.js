import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import nodemailer from "nodemailer";

dotenv.config();

const app = express();

/* ===============================
   CONFIGURAÇÕES BÁSICAS
================================ */

app.use(express.json());

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:5173",
            "https://kamisariazanuto.com.br",
            "https://www.kamisariazanuto.com.br",
        ],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
    })
);

const PORT = process.env.PORT || 3001;

/* ===============================
   VALIDAÇÃO DE VARIÁVEIS
================================ */

const requiredEnvs = [
    "MP_ACCESS_TOKEN",
    "EMAIL_HOST",
    "EMAIL_PORT",
    "EMAIL_USER",
    "EMAIL_PASS",
    "ORDER_TO",
    "WHATSAPP_NUMBER",
];

requiredEnvs.forEach((env) => {
    if (!process.env[env]) {
        console.error(`❌ Variável de ambiente ausente: ${env}`);
    }
});

console.log("===== VARIÁVEIS CARREGADAS =====");
console.log({
    PORT,
    ORDER_TO: process.env.ORDER_TO,
    MP_ACCESS_TOKEN: !!process.env.MP_ACCESS_TOKEN,
    EMAIL_HOST: process.env.EMAIL_HOST,
    WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER,
});
console.log("=================================");

/* ===============================
   EMAIL (BREVO SMTP)
================================ */

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/* ===============================
   ROTAS
================================ */

// Healthcheck
app.get("/", (_, res) => {
    res.send("🚀 API Kamisaria Zanuto rodando");
});

/* ---------- EMAIL ---------- */
app.post("/send-email", async (req, res) => {
    try {
        const data = req.body;

        await transporter.sendMail({
            from: `"Kamisaria Zanuto" <${process.env.EMAIL_USER}>`,
            to: process.env.ORDER_TO,
            subject: "🧾 Novo Pedido - Kamisaria Zanuto",
            html: `
        <h2>Novo Pedido</h2>
        <p><strong>Cliente:</strong> ${data.nome}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefone:</strong> ${data.telefone}</p>
        <p><strong>Produto:</strong> Camisa Social</p>
        <p><strong>Tamanho:</strong> ${data.tamanho}</p>
        <p><strong>Cor:</strong> ${data.cor}</p>
        <p><strong>Quantidade:</strong> ${data.quantidade}</p>
        <p><strong>Total:</strong> R$ ${data.valorTotal}</p>
      `,
        });

        res.json({ success: true });
    } catch (err) {
        console.error("❌ Erro ao enviar email:", err);
        res.status(500).json({ error: "Erro ao enviar email" });
    }
});

/* ---------- WHATSAPP ---------- */
app.post("/send-whatsapp", async (req, res) => {
    try {
        const data = req.body;

        const msg = `
🧾 *Novo Pedido*
Cliente: ${data.nome}
Produto: Camisa Social
Tamanho: ${data.tamanho}
Cor: ${data.cor}
Quantidade: ${data.quantidade}
Total: R$ ${data.valorTotal}
`;

        const url = `https://wa.me/${
            process.env.WHATSAPP_NUMBER
        }?text=${encodeURIComponent(msg)}`;

        res.json({ url });
    } catch (err) {
        console.error("❌ Erro WhatsApp:", err);
        res.status(500).json({ error: "Erro WhatsApp" });
    }
});

/* ---------- MERCADO PAGO ---------- */
app.post("/checkout_pro", async (req, res) => {
    try {
        const { titulo, quantidade, valorUnitario, emailPagador } = req.body;

        const response = await fetch(
            "https://api.mercadopago.com/checkout/preferences",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: [
                        {
                            title: titulo,
                            quantity: Number(quantidade),
                            unit_price: Number(valorUnitario),
                            currency_id: "BRL",
                        },
                    ],
                    payer: {
                        email: emailPagador,
                    },
                    back_urls: {
                        success: "https://kamisariazanuto.com.br",
                        failure: "https://kamisariazanuto.com.br",
                        pending: "https://kamisariazanuto.com.br",
                    },
                    auto_return: "approved",
                }),
            }
        );

        const data = await response.json();

        if (!data.init_point) {
            console.error("❌ Mercado Pago erro:", data);
            return res.status(400).json(data);
        }

        res.json(data);
    } catch (err) {
        console.error("❌ Erro Mercado Pago:", err);
        res.status(500).json({ error: "Erro Mercado Pago" });
    }
});

/* ===============================
   START
================================ */

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
