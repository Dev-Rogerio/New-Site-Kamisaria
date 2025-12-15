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
        methods: ["GET", "POST"],
    })
);

app.use(express.json());

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
mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
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
    console.log("\x1b[36m[CHECKOUT] Dados recebidos:\x1b[0m", req.body);

    try {
        const { titulo, quantidade, valorUnitario, emailPagador } = req.body;

        const qtd = Number(quantidade);
        const unit = Number(valorUnitario);

        if (
            !titulo ||
            isNaN(qtd) ||
            isNaN(unit) ||
            !emailPagador ||
            qtd <= 0 ||
            unit <= 0
        ) {
            console.log("\x1b[31m❌ Dados inválidos no checkout.\x1b[0m");
            return res
                .status(400)
                .json({ error: "Dados inválidos para o checkout." });
        }

        console.log("\x1b[33m[EMAIL] Notificando pagamento iniciado...\x1b[0m");

        await resend.emails.send({
            from: "Kamisaria Zanuto <onboarding@resend.dev>",
            to: process.env.ORDER_TO,
            subject: "🛒 Pagamento Iniciado",
            html: `
                <h2>Pagamento iniciado</h2>
                <p><strong>Produto:</strong> ${titulo}</p>
                <p><strong>Quantidade:</strong> ${qtd}</p>
                <p><strong>Valor:</strong> R$ ${unit.toFixed(2)}</p>
                <p><strong>Email:</strong> ${emailPagador}</p>
            `,
        });

        console.log("\x1b[32m✔ Notificação enviada para o admin!\x1b[0m");

        console.log("\x1b[36m[MP] Criando preferência...\x1b[0m");

        const preference = {
            payer: { email: emailPagador },
            items: [
                {
                    title: titulo,
                    quantity: qtd,
                    unit_price: unit,
                },
            ],
            back_urls: {
                success: "https://kamisariazanuto.com.br/sucesso",
                failure: "https://kamisariazanuto.com.br/falha",
                pending: "https://kamisariazanuto.com.br/pendente",
            },
            auto_return: "approved",
        };

        const mpResponse = await mercadopago.preferences.create(preference);

        console.log("\x1b[32m✔ Preference criada com sucesso!\x1b[0m");
        return res.json({ init_point: mpResponse.body.init_point });
    } catch (error) {
        console.log("\x1b[31m❌ Erro no checkout:\x1b[0m", error);
        res.status(500).json({ error: "Falha no Checkout Pro." });
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
