// server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import mercadopago from "mercadopago";
import dotenv from "dotenv";
import path from "path";

// ======================================================
// 🔵 CARREGAR VARIÁVEIS DO .env
// ======================================================
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ======================================================
// 🔵 HELPERS
// ======================================================
const formatBRL = (v) =>
    `R$ ${Number(v || 0)
        .toFixed(2)
        .replace(".", ",")}`;
const safeNumber = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);

function buildWhatsAppUrl(phone, text) {
    let cleaned = String(phone || "")
        .replace(/\D/g, "")
        .replace(/^0+/, "");
    if (!cleaned) return null;
    if (!cleaned.startsWith("55")) cleaned = `55${cleaned}`;
    return `https://wa.me/${cleaned}?text=${encodeURIComponent(text)}`;
}

// ======================================================
// 🔵 MERCADO PAGO CONFIG
// ======================================================
if (process.env.MP_ACCESS_TOKEN) {
    mercadopago.configure({ access_token: process.env.MP_ACCESS_TOKEN });
    console.log("✔ Mercado Pago configurado");
} else {
    console.warn("❌ MP_ACCESS_TOKEN NÃO CONFIGURADO");
}

// ======================================================
// 🔵 HEALTHCHECK
// ======================================================
app.get("/ping", (_, res) => res.send("pong"));
app.get("/", (_, res) => res.send("Kamisaria Zanuto - API online ✔"));

// ======================================================
// 🔵 CHECKOUT PRO - MERCADO PAGO
// ======================================================
app.post("/checkout_pro", async (req, res) => {
    try {
        const {
            titulo,
            quantidade,
            valorUnitario,
            emailPagador,
            nomeCartao,
            nomeCliente,
            telefone,
            cor,
            tamanho,
        } = req.body;

        if (!titulo || !quantidade || !valorUnitario || !emailPagador) {
            return res.status(400).json({
                error: "titulo, quantidade, valorUnitario e emailPagador são obrigatórios",
            });
        }

        // == Criar preferência Mercado Pago ==
        const preference = {
            payer: {
                email: emailPagador,
                name: nomeCartao || nomeCliente || "Cliente",
            },
            items: [
                {
                    title: titulo,
                    quantity: safeNumber(quantidade),
                    unit_price: safeNumber(valorUnitario),
                },
            ],
            back_urls: {
                success: process.env.MP_BACK_SUCCESS,
                failure: process.env.MP_BACK_FAILURE,
                pending: process.env.MP_BACK_PENDING,
            },
            auto_return: "approved",
        };

        const mp = await mercadopago.preferences.create(preference);
        const checkoutUrl = mp.body.init_point;

        console.log("🔥 Preferência MP criada:", mp.body.id);

        // ============================================================
        // 📧 ENVIO IMEDIATO DO PEDIDO — ANTES DE PAGAR
        // ============================================================
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.ORDER_TO,
                subject: "🧾 Novo Pedido Iniciado - Kamisaria Zanuto",
                html: `
                    <h2>Pedido Iniciado (Ainda Não Pago)</h2>
                    <p><strong>Produto:</strong> ${titulo}</p>
                    <p><strong>Cor:</strong> ${cor || "-"}</p>
                    <p><strong>Tamanho:</strong> ${tamanho || "-"}</p>
                    <p><strong>Quantidade:</strong> ${quantidade}</p>
                    <p><strong>Valor Unitário:</strong> R$ ${valorUnitario}</p>
                    <hr>
                    <p><strong>Cliente:</strong> ${
                        nomeCliente || "Não informado"
                    }</p>
                    <p><strong>Email:</strong> ${emailPagador}</p>
                    <p><strong>Telefone:</strong> ${
                        telefone || "Não informado"
                    }</p>

                    <p><strong>Link para Pagamento:</strong> 
                        <a href="${checkoutUrl}">ABRIR CHECKOUT</a>
                    </p>

                    <p style="color:#999">O cliente ainda NÃO finalizou o pagamento.</p>
                `,
            });

            console.log("📧 Email enviado ANTES do pagamento ✔️");
        } else {
            console.warn("⚠ EMAIL_USER ou EMAIL_PASS não configurados");
        }

        return res.json({ init_point: checkoutUrl });
    } catch (err) {
        console.error("Erro /checkout_pro:", err);
        return res.status(500).json({ error: "Erro ao criar preferência" });
    }
});

// Alias antigo
app.post("/criar-preferencia", (req, res) => {
    req.url = "/checkout_pro";
    app._router.handle(req, res, () => {});
});

// ======================================================
// 🔵 ENVIO DO PEDIDO COMPLETO POR E-MAIL
// ======================================================
app.post("/send-email", async (req, res) => {
    try {
        const {
            nome,
            cpf,
            email,
            cep,
            estado,
            cidade,
            bairro,
            endereco,
            numero,
            complemento,
            observacao,
            telefone,
            local,
            tamanho,
            cor,
            quantidade,
            valorCompra,
            frete,
            valorTotal,
        } = req.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailHtml = `
            <h2>Novo Pedido Completo</h2>
            <h3>Cliente</h3>
            <p><b>Nome:</b> ${nome}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Telefone:</b> ${telefone}</p>

            <h3>Endereço</h3>
            <p>${endereco}, Nº ${numero} - ${bairro}, ${cidade} - ${estado}</p>
            <p>CEP: ${cep}</p>
            ${complemento ? `<p>Complemento: ${complemento}</p>` : ""}
            ${observacao ? `<p>Observação: ${observacao}</p>` : ""}

            <h3>Pedido</h3>
            <p><b>Produto:</b> Camisa DICE</p>
            <p><b>Cor:</b> ${cor}</p>
            <p><b>Tamanho:</b> ${tamanho}</p>
            <p><b>Quantidade:</b> ${quantidade}</p>
            <p><b>Valor:</b> ${formatBRL(valorCompra)}</p>
            <p><b>Frete:</b> ${formatBRL(frete)}</p>
            <p><b>Total:</b> <b>${formatBRL(valorTotal)}</b></p>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ORDER_TO,
            subject: "Novo Pedido Recebido - Kamisaria Zanuto",
            html: mailHtml,
        });

        console.log("📧 Email completo enviado");

        return res.json({ ok: true });
    } catch (err) {
        console.error("Erro /send-email:", err);
        return res.status(500).json({ error: "Erro ao enviar e-mail" });
    }
});

// ======================================================
// 🔵 GERAR LINK DO WHATSAPP
// ======================================================
app.post("/send-whatsapp", (req, res) => {
    try {
        const {
            nome,
            telefone,
            cep,
            estado,
            cidade,
            bairro,
            endereco,
            numero,
            complemento,
            observacao,
            tamanho,
            cor,
            quantidade,
            valorCompra,
            frete,
            valorTotal,
        } = req.body;

        const vendedor = process.env.WHATSAPP_NUMBER;

        const texto =
            `📦 *Novo Pedido Kamisaria Zanuto*\n\n` +
            `👤 *Cliente:* ${nome}\n📞 *Telefone:* ${telefone}\n\n` +
            `🧵 *Produto:* Camisa DICE (${cor}, ${tamanho})\n` +
            `📦 *Quantidade:* ${quantidade}\n` +
            `💰 *Valor:* ${formatBRL(valorCompra)}\n` +
            `🚚 *Frete:* ${formatBRL(frete)}\n` +
            `💳 *Total:* ${formatBRL(valorTotal)}\n\n` +
            `🏠 Endereço: ${endereco}, Nº ${numero}, ${bairro}, ${cidade} - ${estado}\nCEP: ${cep}\n` +
            (observacao ? `📝 Observação: ${observacao}\n\n` : "");

        return res.json({
            url: buildWhatsAppUrl(vendedor, texto),
        });
    } catch (err) {
        console.error("Erro /send-whatsapp:", err);
        return res.status(500).json({ error: "Erro ao gerar link WhatsApp" });
    }
});

// ======================================================
app.listen(PORT, () =>
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
);

export default app;
