import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mercadopago from "mercadopago";
import path from "path";

// ==========================================
// CONFIGURAÇÕES INICIAIS
// ==========================================

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Log básico das variáveis carregadas
console.log("Variáveis de ambiente carregadas:", {
    PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    MP_ACCESS_TOKEN: !!process.env.MP_ACCESS_TOKEN, // por segurança, evita exibir o token completo
});

// Configurar Mercado Pago
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

// ==========================================
// ROTA DE PAGAMENTO - MERCADO PAGO
// ==========================================
app.post("/checkout_pro", async (req, res) => {
    const { titulo, quantidade, valorUnitario, emailPagador, nomeCartao } =
        req.body;

    const MERCADO_PAGO_EMAIL = "roger.ngt3494@gmail.com"; // altere conforme sua conta

    if (!titulo || !quantidade || !valorUnitario || !emailPagador) {
        return res
            .status(400)
            .json({ error: "Dados incompletos para o pagamento" });
    }

    if (emailPagador.toLowerCase() === MERCADO_PAGO_EMAIL.toLowerCase()) {
        return res
            .status(400)
            .json({ error: "Não é possível pagar para você mesmo." });
    }

    try {
        const preference = {
            payer: {
                email: emailPagador,
                name: nomeCartao || "Cliente",
            },
            items: [
                {
                    title: titulo,
                    quantity: Number(quantidade),
                    unit_price: Number(valorUnitario),
                },
            ],
            payment_methods: {
                excluded_payment_types: [{ id: "ticket" }], // opcional: exclui boleto
            },
            back_urls: {
                success: "https://seusite.com/sucesso",
                failure: "https://seusite.com/falha",
                pending: "https://seusite.com/pendente",
            },
            auto_return: "approved",
        };

        const response = await mercadopago.preferences.create(preference);
        res.json({ init_point: response.body.init_point });
    } catch (error) {
        console.error("Erro ao criar preferência Mercado Pago:", error);
        res.status(500).json({
            error: "Erro ao criar preferência Mercado Pago",
        });
    }
});

// ==========================================
// ROTA DE ENVIO DE E-MAIL - CONFIRMAÇÃO DO PEDIDO
// ==========================================
app.post("/send-email", async (req, res) => {
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

    // Configuração do transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Corpo do e-mail
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: ["roger.ngt@hotmail.com", "adri.ngt@hotmail.com"],
        subject: "Novo Pedido Recebido - Kamisaria Zanuto",
        html: `
      <h2>Pedido Confirmado</h2>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>CPF:</strong> ${cpf}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Endereço:</strong> ${endereco}, Nº ${numero}, ${bairro}, ${cidade} - ${estado}</p>
      ${
          complemento
              ? `<p><strong>Complemento:</strong> ${complemento}</p>`
              : ""
      }
      ${observacao ? `<p><strong>Observação:</strong> ${observacao}</p>` : ""}
      <p><strong>Telefone:</strong> ${telefone}</p>
      <p><strong>Local de entrega:</strong> ${local}</p>
      <p><strong>Camisa:</strong> Tamanho ${tamanho}, Cor ${cor}</p>
      <p><strong>Quantidade:</strong> ${quantidade}</p>
      <p><strong>Valor da Camisa:</strong> R$ ${Number(valorCompra)
          .toFixed(2)
          .replace(".", ",")}</p>
      <p><strong>Frete:</strong> R$ ${Number(frete)
          .toFixed(2)
          .replace(".", ",")}</p>
      <p><strong>Total:</strong> <b>R$ ${Number(valorTotal)
          .toFixed(2)
          .replace(".", ",")}</b></p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email enviado com sucesso!");
        res.status(200).json({
            message: "Pedido enviado por e-mail com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        res.status(500).json({ error: "Erro ao enviar o e-mail" });
    }
});

// ==========================================
// INICIAR SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
