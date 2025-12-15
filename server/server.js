// ==========================================
// server.js — KAMISARIA ZANUTO (TESTE LOCAL OK)
// ==========================================

import express from "express";
import cors from "cors";
import mercadopago from "mercadopago";

import dotenv from "dotenv";
import { Resend } from "resend";

import { gerarTemplatePedido } from "./emailTemplate.js";
import { gerarTemplateCliente } from "./emailTemplateCliente.js";

const { MercadoPagoConfig, Preference } = mercadopago;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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

// 🔥 responder preflight manualmente
app.options("*", cors());

// ======================
// VARIÁVEIS
// ======================
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

// =======================================================
// MERCADO PAGO
// =======================================================
const mpClient = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
});

// =======================================================
// RESEND
// =======================================================
const resend = new Resend(process.env.RESEND_API_KEY);

// =======================================================
// FUNÇÃO DE EMAIL (ADMIN + CLIENTE)
// =======================================================
async function sendOrderEmail(dados) {
    console.log("\x1b[33m[EMAIL] Enviando e-mails... \x1b[0m");

    try {
        // ADMIN
        await resend.emails.send({
            from: "Kamisaria Zanuto <onboarding@resend.dev>",
            to: process.env.ORDER_TO,
            subject: "📦 Novo Pedido — Kamisaria Zanuto",
            html: gerarTemplatePedido(dados),
        });

        console.log("\x1b[32m✔ Email enviado para o ADMIN\x1b[0m");

        // CLIENTE
        await resend.emails.send({
            from: "Kamisaria Zanuto <onboarding@resend.dev>",
            to: dados.email,
            subject: "Seu Pedido foi Recebido - Kamisaria Zanuto",
            html: gerarTemplateCliente(dados),
        });

        console.log("\x1b[32m✔ Email enviado para o CLIENTE\x1b[0m");
        return true;
    } catch (err) {
        console.log("\x1b[31m❌ ERRO AO ENVIAR EMAIL:\x1b[0m", err);
        return false;
    }
}

// =======================================================
// ROTA DE TESTE DO RESEND
// =======================================================
app.get("/test-resend", async (req, res) => {
    console.log("\x1b[34m[Teste] Disparando email de teste...\x1b[0m");

    try {
        await resend.emails.send({
            from: "Kamisaria Zanuto <onboarding@resend.dev>",
            to: process.env.ORDER_TO,
            subject: "🔥 Teste Resend Funcionando!",
            html: "<h2>Seu servidor está enviando e-mails com RESEND! 🚀</h2>",
        });

        console.log("\x1b[32m✔ Teste enviado com sucesso!\x1b[0m");
        res.send("📧 Teste enviado com sucesso!");
    } catch (error) {
        console.log("\x1b[31m❌ Erro teste Resend:\x1b[0m", error);
        res.status(500).send("Erro ao enviar email de teste.");
    }
});

// =======================================================
// ROTA REAL /send-email — FORM CLIENTE
// =======================================================
app.post("/send-email", async (req, res) => {
    console.log("\x1b[35m[ORDER RECEIVED]\x1b[0m", req.body);

    const ok = await sendOrderEmail(req.body);

    if (ok) {
        console.log("\x1b[32m✔ Emails enviados com sucesso!\x1b[0m");
        return res.json({ status: "ok", message: "Email enviado!" });
    }

    console.log("\x1b[31m❌ Falha ao enviar emails.\x1b[0m");
    return res.status(500).json({
        status: "erro",
        message: "Falha ao enviar email",
    });
});

// =======================================================
// CHECKOUT PRO
// =======================================================

app.post("/checkout_pro", async (req, res) => {
    console.log("\x1b[36m[CHECKOUT] BODY RECEBIDO:\x1b[0m", req.body);

    try {
        const { titulo, quantidade, valorUnitario, emailPagador } = req.body;

        const qtd = Number(quantidade);
        const unit = Number(valorUnitario);

        if (!titulo || !emailPagador || qtd <= 0 || unit <= 0) {
            return res.status(400).json({ error: "Dados inválidos" });
        }

        const preference = new Preference(mpClient);

        const result = await preference.create({
            body: {
                items: [
                    {
                        title: titulo,
                        quantity: qtd,
                        unit_price: unit,
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
            },
        });

        console.log("\x1b[32m✔ Preference criada!\x1b[0m");

        return res.json({
            init_point: result.body.init_point,
        });
    } catch (error) {
        console.error("\x1b[31m❌ ERRO MP:\x1b[0m", error);
        return res.status(500).json({
            error: "Erro ao criar pagamento Mercado Pago",
        });
    }
});

// ROOT
app.get("/", (req, res) => {
    console.log("\x1b[32m[ROOT] API acessada.\x1b[0m");
    res.send("API rodando OK — TESTE LOCAL RESEND 🚀");
});

// START
app.listen(PORT, () => {
    console.log("\x1b[32m");
    console.log(`🚀 Servidor rodando na porta ${PORT} — TESTE LOCAL RESEND OK`);
    console.log("\x1b[0m");
});
