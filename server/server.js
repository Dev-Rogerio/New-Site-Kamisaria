// ==========================================
// server.js — KAMISARIA ZANUTO (PRODUÇÃO)
// ==========================================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mercadopago from "mercadopago";
import { Resend } from "resend";

import { gerarTemplatePedido } from "./emailTemplate.js";
import { gerarTemplateCliente } from "./emailTemplateCliente.js";

// ==========================================
// CONFIG
// ==========================================
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ==========================================
// MIDDLEWARES
// ==========================================
app.use(express.json());

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://new-site-kamisaria-1.onrender.com",
            "https://kamisariazanuto.com.br",
        ],
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Preflight
app.options("*", cors());

// ==========================================
// LOG DE VARIÁVEIS (DEBUG SEGURO)
// ==========================================
console.log("\x1b[36m");
console.log("===== VARIÁVEIS CARREGADAS =====");
console.log({
    PORT,
    ORDER_TO: process.env.ORDER_TO,
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    MP_ACCESS_TOKEN: !!process.env.MP_ACCESS_TOKEN,
    WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER,
});
console.log("=================================\n");
console.log("\x1b[0m");

// ==========================================
// MERCADO PAGO — SDK ANTIGO (CORRETO)
// ==========================================
mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
});

// ==========================================
// RESEND
// ==========================================
const resend = new Resend(process.env.RESEND_API_KEY);

// ==========================================
// EMAIL — ADMIN + CLIENTE
// ==========================================
async function sendOrderEmail(dados) {
    console.log("\x1b[33m[EMAIL] Enviando e-mails...\x1b[0m");

    try {
        // ADMIN
        await resend.emails.send({
            from: "Kamisaria Zanuto <onboarding@resend.dev>",
            to: process.env.ORDER_TO,
            subject: "📦 Novo Pedido — Kamisaria Zanuto",
            html: gerarTemplatePedido(dados),
        });

        console.log("\x1b[32m✔ Email enviado para ADMIN\x1b[0m");

        // CLIENTE
        await resend.emails.send({
            from: "Kamisaria Zanuto <onboarding@resend.dev>",
            to: dados.email,
            subject: "Seu Pedido foi Recebido - Kamisaria Zanuto",
            html: gerarTemplateCliente(dados),
        });

        console.log("\x1b[32m✔ Email enviado para CLIENTE\x1b[0m");
        return true;
    } catch (err) {
        console.error("\x1b[31m❌ ERRO EMAIL:\x1b[0m", err);
        return false;
    }
}

// ==========================================
// ROTAS
// ==========================================

// 🔎 Root
app.get("/", (req, res) => {
    res.send("API Kamisaria Zanuto rodando OK 🚀");
});

// 📧 Teste Resend
app.get("/test-resend", async (req, res) => {
    try {
        await resend.emails.send({
            from: "Kamisaria Zanuto <onboarding@resend.dev>",
            to: process.env.ORDER_TO,
            subject: "🔥 Teste Resend OK",
            html: "<h2>Servidor enviando emails corretamente 🚀</h2>",
        });

        res.send("📧 Email de teste enviado!");
    } catch (err) {
        console.error("❌ Erro Resend:", err);
        res.status(500).send("Erro ao testar email.");
    }
});

// 📦 Enviar Pedido (Email)
app.post("/send-email", async (req, res) => {
    console.log("\x1b[35m[PEDIDO RECEBIDO]\x1b[0m", req.body);

    const ok = await sendOrderEmail(req.body);

    if (!ok) {
        return res.status(500).json({
            status: "erro",
            message: "Falha ao enviar emails",
        });
    }

    return res.json({
        status: "ok",
        message: "Emails enviados com sucesso!",
    });
});

// 💳 Checkout Pro — Mercado Pago
app.post("/checkout_pro", async (req, res) => {
    console.log("\x1b[36m[CHECKOUT]\x1b[0m", req.body);

    try {
        const { titulo, quantidade, valorUnitario, emailPagador } = req.body;

        if (!titulo || !emailPagador || quantidade <= 0 || valorUnitario <= 0) {
            return res.status(400).json({ error: "Dados inválidos" });
        }

        const preference = {
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
                success: "https://kamisariazanuto.com.br/sucesso",
                failure: "https://kamisariazanuto.com.br/falha",
                pending: "https://kamisariazanuto.com.br/pendente",
            },
            auto_return: "approved",
        };

        const response = await mercadopago.preferences.create(preference);

        console.log("\x1b[32m✔ Preference criada\x1b[0m");

        return res.json({
            init_point: response.body.init_point,
        });
    } catch (err) {
        console.error("\x1b[31m❌ ERRO MERCADO PAGO:\x1b[0m", err);
        return res.status(500).json({
            error: "Erro ao criar pagamento Mercado Pago",
        });
    }
});

// ==========================================
// START SERVER
// ==========================================
app.listen(PORT, () => {
    console.log("\x1b[32m");
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log("\x1b[0m");
});
