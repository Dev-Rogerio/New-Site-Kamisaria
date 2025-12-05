// ==========================================
// server.js — KAMISARIA ZANUTO (REFATORADO)
// ==========================================

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import mercadopago from "mercadopago";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ==========================================
// CONFIG INICIAL
// ==========================================

// __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar variáveis do .env
// dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// ==========================================
// LOG DAS VARIÁVEIS DE AMBIENTE
// ==========================================
console.log("\n===== VARIÁVEIS CARREGADAS =====");
console.log({
    PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: !!process.env.EMAIL_PASS,
    MP_ACCESS_TOKEN: !!process.env.MP_ACCESS_TOKEN,
});
console.log("=================================\n");

// ==========================================
// CONFIG MERCADO PAGO
// ==========================================
mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
});

console.log("Mercado Pago configurado com sucesso!");

// ==========================================
// CONFIGURAR NODEMAILER (GLOBAL)
// ==========================================
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // obrigatório para porta 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// =======================================================
// 1) ROTA DE TESTE
// =======================================================
app.get("/ping", (req, res) => res.send("pong"));

// =======================================================
// 2) ROTA DO BOTÃO DE PAGAMENTO SIMPLES (CHECKOUT MP BOTÃO)
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

        console.log("🔥 Preferência criada (BOTÃO MP):", mpResponse.body.id);

        return res.json({ id: mpResponse.body.id });
    } catch (error) {
        console.error("❌ Erro ao criar preferência:", error);
        res.status(500).json({ error: "Falha ao criar preferência." });
    }
});

// =======================================================
// 3) FUNÇÃO — ENVIAR EMAIL SIMPLES DE "ORDER"
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
            to: process.env.EMAIL_USER,
            subject: "🛒 Novo pedido iniciado (Mercado Pago)",
            html: `
                <h2>Um cliente iniciou um pagamento!</h2>
                <p><b>Produto:</b> ${titulo}</p>
                <p><b>Quantidade:</b> ${quantidade}</p>
                <p><b>Valor unitário:</b> R$ ${valorUnitario}</p>
                <p><b>Email informado:</b> ${emailPagador}</p>
                <hr/>
                <p>⚠ O cliente clicou em "Pagar", mesmo que não finalize o pagamento.</p>
            `,
        });

        console.log("📧 Email (Order) enviado com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao enviar email:", error);
    }
}

// =======================================================
// 4) ROTA — CHECKOUT PRO (PRINCIPAL)
// =======================================================
app.post("/checkout_pro", async (req, res) => {
    try {
        const { titulo, quantidade, valorUnitario, emailPagador } = req.body;

        if (!titulo || !quantidade || !valorUnitario || !emailPagador) {
            return res
                .status(400)
                .json({ error: "Dados incompletos para pagamento." });
        }

        // Bloquear pagamento com email do vendedor
        const EMAIL_VENDEDOR = "roger.ngt3494@gmail.com";
        if (emailPagador.toLowerCase() === EMAIL_VENDEDOR.toLowerCase()) {
            return res.status(400).json({
                error: "Você não pode pagar usando o e-mail do vendedor.",
            });
        }

        // Envio de email imediato (mesmo sem finalizar pagamento)
        await enviarPedidoEmail({
            titulo,
            quantidade,
            valorUnitario,
            emailPagador,
        });

        // Criar preferência MP
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

        console.log(
            "🔥 Preferência criada (CHECKOUT PRO):",
            mpResponse.body.id
        );

        return res.json({ init_point: mpResponse.body.init_point });
    } catch (error) {
        console.error("❌ Erro no Checkout PRO:", error);
        res.status(500).json({ error: "Falha ao criar pagamento." });
    }
});

// =======================================================
// 5) ROTA — ENVIO DE PEDIDO COMPLETO POR EMAIL
// =======================================================
app.post("/send-email", async (req, res) => {
    try {
        const dados = req.body;

        const html = `
            <h2>Novo Pedido Recebido</h2>
            <p><b>Nome:</b> ${dados.nome}</p>
            <p><b>CPF:</b> ${dados.cpf}</p>
            <p><b>Email:</b> ${dados.email}</p>
            <p><b>Telefone:</b> ${dados.telefone}</p>

            <h3>Endereço</h3>
            <p>${dados.endereco}, Nº ${dados.numero}</p>
            <p>${dados.bairro} — ${dados.cidade} / ${dados.estado}</p>
            <p><b>CEP:</b> ${dados.cep}</p>
            ${
                dados.complemento
                    ? `<p>Complemento: ${dados.complemento}</p>`
                    : ""
            }
            ${dados.observacao ? `<p>Observação: ${dados.observacao}</p>` : ""}

            <hr/>

            <h3>Produto</h3>
            <p><b>Camisa:</b> ${dados.cor}, Tamanho: ${dados.tamanho}</p>
            <p><b>Quantidade:</b> ${dados.quantidade}</p>
            <p><b>Valor unitário:</b> R$ ${Number(dados.valorCompra).toFixed(
                2
            )}</p>
            <p><b>Frete:</b> R$ ${Number(dados.frete).toFixed(2)}</p>
            <p><b>Total:</b> <b>R$ ${Number(dados.valorTotal).toFixed(
                2
            )}</b></p>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: ["roger.ngt@hotmail.com", "adri.ngt@hotmail.com"],
            subject: "Novo Pedido - Kamisaria Zanuto",
            html,
        });

        res.json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
        console.error("❌ Erro ao enviar pedido:", error);
        res.status(500).json({ error: "Falha ao enviar e-mail." });
    }
});

// =======================================================
// 6) WHATSAPP — GERAR LINK PARA ATENDIMENTO
// =======================================================
app.post("/send-whatsapp", async (req, res) => {
    try {
        const dados = req.body;

        const numeroWhats = "5511945599306";

        const texto = `
📦 *Novo Pedido - Kamisaria Zanuto*

👤 *${dados.nome}*
📞 ${dados.telefone}
📧 ${dados.email}

👕 *Camisa Slim Fit*
• Cor: ${dados.cor}
• Tamanho: ${dados.tamanho}
• Quantidade: ${dados.quantidade}
• Valor: R$ ${Number(dados.valorCompra).toFixed(2)}
• Frete: R$ ${Number(dados.frete).toFixed(2)}
• *Total:* R$ ${Number(dados.valorTotal).toFixed(2)}

🏠 *Endereço*
${dados.endereco}, Nº ${dados.numero}
${dados.bairro}, ${dados.cidade} - ${dados.estado}
CEP: ${dados.cep}

${dados.complemento ? `📌 Complemento: ${dados.complemento}` : ""}
${dados.observacao ? `📝 Obs: ${dados.observacao}` : ""}

🔗 _Gerado automaticamente_
        `;

        const url = `https://api.whatsapp.com/send?phone=${numeroWhats}&text=${encodeURIComponent(
            texto
        )}`;

        res.json({ url });
    } catch (error) {
        console.error("❌ Erro WhatsApp:", error);
        res.status(500).json({ error: "Falha ao gerar link" });
    }
});

// =======================================================
// ROTA RAIZ
// =======================================================
app.get("/", (req, res) => res.send("API rodando OK"));

// =======================================================
// ERRO GLOBAL
// =======================================================
app.use((err, req, res, next) => {
    console.error("❌ Erro geral:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
});

// =======================================================
// START SERVER
// =======================================================
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
