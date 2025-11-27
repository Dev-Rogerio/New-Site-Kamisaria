// server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mercadopago from "mercadopago";
import path from "path";
import { fileURLToPath } from "url";

// ==========================================
// CONFIG INICIAL
// ==========================================

// Corrigir __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar .env
dotenv.config({ path: path.resolve(__dirname, ".env") });

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
// ROTA DE TESTE
// ==========================================
app.get("/ping", (_, res) => {
    res.send("pong");
});

// =======================================================
// 🔥 1) ROTA USADA PELO SEU COMPONENTE BotaoPagamento.jsx
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
        console.error("❌ Erro ao criar preferência (BOTÃO):", error);
        res.status(500).json({ error: "Falha ao criar preferência." });
    }
});

// =======================================================
// 🔥 2) ROTA DE PAGAMENTO COMPLETO (SEU CHECKOUT_PRO)
// =======================================================
app.post("/checkout_pro", async (req, res) => {
    try {
        const { titulo, quantidade, valorUnitario, emailPagador } = req.body;

        if (!titulo || !quantidade || !valorUnitario || !emailPagador) {
            return res.status(400).json({
                error: "Dados incompletos para pagamento.",
            });
        }

        const EMAIL_VENDEDOR = "roger.ngt3494@gmail.com";

        if (emailPagador.toLowerCase() === EMAIL_VENDEDOR.toLowerCase()) {
            return res.status(400).json({
                error: "Você não pode pagar usando o e-mail do vendedor.",
            });
        }

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
        console.error("❌ Erro no Mercado Pago:", error);
        res.status(500).json({ error: "Falha ao criar pagamento." });
    }
});

// =======================================================
// ENVIO DE E-MAIL - PEDIDO
// =======================================================
app.post("/send-email", async (req, res) => {
    try {
        const dados = req.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const html = `
            <h2>Novo Pedido Recebido</h2>
            <p><b>Nome:</b> ${dados.nome}</p>
            <p><b>CPF:</b> ${dados.cpf}</p>
            <p><b>Email:</b> ${dados.email}</p>
            <p><b>Telefone:</b> ${dados.telefone}</p>
            <p><b>Endereço:</b> ${dados.endereco}, Nº ${dados.numero} - ${
            dados.bairro
        }</p>
            <p>${dados.cidade} - ${dados.estado}</p>
            <p><b>CEP:</b> ${dados.cep}</p>
            ${
                dados.complemento
                    ? `<p><b>Complemento:</b> ${dados.complemento}</p>`
                    : ""
            }
            ${
                dados.observacao
                    ? `<p><b>Observação:</b> ${dados.observacao}</p>`
                    : ""
            }
            <hr />
            <h3>Produto</h3>
            <p><b>Camisa:</b> ${dados.cor}, Tam: ${dados.tamanho}</p>
            <p><b>Quantidade:</b> ${dados.quantidade}</p>
            <p><b>Valor Unitário:</b> R$ ${Number(dados.valorCompra)
                .toFixed(2)
                .replace(".", ",")}</p>
            <p><b>Frete:</b> R$ ${Number(dados.frete)
                .toFixed(2)
                .replace(".", ",")}</p>
            <p><b>Total:</b> <b>R$ ${Number(dados.valorTotal)
                .toFixed(2)
                .replace(".", ",")}</b></p>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: ["roger.ngt@hotmail.com", "adri.ngt@hotmail.com"],
            subject: "Novo Pedido - Kamisaria Zanuto",
            html,
        });

        return res.json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
        console.error("❌ Erro ao enviar e-mail:", error);
        res.status(500).json({ error: "Falha ao enviar e-mail." });
    }
});

// =======================================================
// WHATSAPP - LINK DO PEDIDO
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
• Valor: R$ ${Number(dados.valorCompra).toFixed(2).replace(".", ",")}
• Frete: R$ ${Number(dados.frete).toFixed(2).replace(".", ",")}
• *Total:* R$ ${Number(dados.valorTotal).toFixed(2).replace(".", ",")}

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

        return res.json({ url });
    } catch (error) {
        console.error("❌ Erro WhatsApp:", error);
        res.status(500).json({ error: "Falha ao criar link do WhatsApp." });
    }
});

// ==========================================
// HANDLER GLOBAL DE ERROS
// ==========================================
app.use((err, req, res, next) => {
    console.error("❌ Erro geral:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
});

// ==========================================
// INICIAR SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
