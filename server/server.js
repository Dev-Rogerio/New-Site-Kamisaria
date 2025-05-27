import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // carrega as variáveis do .env

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.post("/send-email", async (req, res) => {
    console.log("Dados recebidos no servidor:", req.body);

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
      <p><strong>Valor da Camisa:</strong> R$ ${valorCompra
          .toFixed(2)
          .replace(".", ",")}</p>
      <p><strong>Frete:</strong> R$ ${frete.toFixed(2).replace(".", ",")}</p>
      <p><strong>Total:</strong> <b>R$ ${valorTotal
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

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
