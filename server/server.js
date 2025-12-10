// ==========================================
// server.js — KAMISARIA ZANUTO (BREVO READY)
// ==========================================

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import mercadopago from "mercadopago";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// PATH
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env
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

console.log("\n===== VARIÁVEIS CARREGADAS =====");
console.log({
    PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: !!process.env.EMAIL_PASS,
    ORDER_TO: process.env.ORDER_TO,
    MP_ACCESS_TOKEN: !!process.env.MP_ACCESS_TOKEN,
});
console.log("=================================\n");

// ==========================================
// MERCADO PAGO
// ==========================================
mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
});

// ==========================================
// NODEMAILER (BREVO SMTP)
// ==========================================
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, // CORRETO -> login SMTP da Brevo
        pass: process.env.EMAIL_PASS, // CORRETO -> chave SMTP
    },
});

// =======================================================
// 1) ROTA DE TESTE
// =======================================================
app.get("/ping", (req, res) => res.send("pong"));

// =======================================================
// 2) BOTÃO MERCADO PAGO
// =======================================================
app.post("/criar-preferencia", async (req, res) => {
    try {
        const { title, quantity, price } = req.body;

        if (!title || !quantity || !price) {
            return res.status(400).json({ error: "Dados inválidos." });
        }

        const preference = {
            items: [
                {
                    title,
                    quantity: Number(quantity),
                    unit_price: Number(price),
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
        return res.json({ id: mpResponse.body.id });
    } catch (error) {
        console.error("❌ Erro:", error);
        res.status(500).json({ error: "Falha ao criar preferência." });
    }
});

// =======================================================
// 3) EMAIL NOTIFICAÇÃO (INÍCIO CHECKOUT)
// =======================================================
async function enviarPedidoEmail({
    titulo,
    quantidade,
    valorUnitario,
    emailPagador,
}) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ORDER_TO,
            subject: "🛒 Novo pagamento iniciado",
            html: `
                <h2>Um cliente iniciou um pagamento!</h2>
                <p><b>Produto:</b> ${titulo}</p>
                <p><b>Quantidade:</b> ${quantidade}</p>
                <p><b>Valor unitário:</b> R$ ${valorUnitario}</p>
                <p><b>Email:</b> ${emailPagador}</p>
            `,
        });

        console.log("📧 Email enviado!");
    } catch (error) {
        console.error("❌ Erro ao enviar email:", error);
    }
}

// =======================================================
// 4) CHECKOUT PRO
// =======================================================
app.post("/checkout_pro", async (req, res) => {
    try {
        const { titulo, quantidade, valorUnitario, emailPagador } = req.body;

        if (!titulo || !quantidade || !valorUnitario || !emailPagador) {
            return res.status(400).json({ error: "Dados incompletos." });
        }

        const EMAIL_VENDEDOR = "roger.ngt3494@gmail.com";
        if (emailPagador.toLowerCase() === EMAIL_VENDEDOR.toLowerCase()) {
            return res
                .status(400)
                .json({ error: "E-mail do vendedor bloqueado." });
        }

        await enviarPedidoEmail({
            titulo,
            quantidade,
            valorUnitario,
            emailPagador,
        });

        const preference = {
            payer: { email: emailPagador },
            items: [
                {
                    title: titulo,
                    quantity: Number(quantidade),
                    unit_price: Number(valorUnitario),
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
        return res.json({ init_point: mpResponse.body.init_point });
    } catch (error) {
        console.error("❌ Erro:", error);
        res.status(500).json({ error: "Falha no Checkout Pro." });
    }
});

// =======================================================
// 5) ENVIO DE PEDIDO COMPLETO (CORRIGIDO)
// =======================================================
app.post("/send-email", async (req, res) => {
    console.log("Payload recebido:", req.body);

    try {
        const dados = req.body;

        const html = `
            <h2>Novo Pedido Recebido</h2>

            <h3>Dados do Cliente</h3>
            <p><b>Nome:</b> ${dados.nome}</p>
            <p><b>Email:</b> ${dados.email}</p>
            <p><b>Telefone:</b> ${dados.telefone}</p>

            <h3>Endereço</h3>
            <p>${dados.endereco}, Nº ${dados.numero}</p>
            <p>${dados.bairro} — ${dados.cidade}/${dados.estado}</p>
            <p>CEP: ${dados.cep}</p>

            <h3>Produto</h3>
            <p><b>Cor:</b> ${dados.cor}</p>
            <p><b>Tamanho:</b> ${dados.tamanho}</p>
            <p><b>Quantidade:</b> ${dados.quantidade}</p>
            <p><b>Total:</b> R$ ${Number(dados.valorTotal).toFixed(2)}</p>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER, // 🔥 BREVO EXIGE QUE SEJA O USER
            to: process.env.ORDER_TO,
            subject: "🛒 Novo Pedido Recebido",
            html,
        });

        console.log("📧 Email enviado com sucesso!");

        res.json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
        console.error("❌ Erro ao enviar email:", error);
        res.status(500).json({ error: "Falha ao enviar e-mail." });
    }
});

// =======================================================
// WHATSAPP
// =======================================================
app.post("/send-whatsapp", (req, res) => {
    try {
        const dados = req.body;

        const numero = process.env.WHATSAPP_NUMBER;

        const texto = `
Novo Pedido - Kamisaria Zanuto

${dados.nome}
${dados.telefone}
Camisa ${dados.cor} - Tam: ${dados.tamanho}
Total: R$ ${Number(dados.valorTotal).toFixed(2)}
        `;

        const url = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(
            texto
        )}`;

        res.json({ url });
    } catch (error) {
        console.error("❌ Erro WhatsApp:", error);
        res.status(500).json({ error: "Falha ao gerar link" });
    }
});

// ROOT
app.get("/", (req, res) => res.send("API rodando OK"));

// START
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
