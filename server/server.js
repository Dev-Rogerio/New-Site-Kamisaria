import express from "express";
import cors from "cors";
import mercadopago from "mercadopago";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configura o Mercado Pago com seu access token
mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

app.get("/api/status/:id", (req, res) => {
    const { id } = req.params;

    // Aqui você consultaria a API de pagamento pelo status real
    // Exemplo fake:
    if (id === "123456") {
        res.json({ status: "approved" });
    } else {
        res.json({ status: "pending" });
    }
});

// Rota para gerar Pix
app.post("/api/gerar-pix", async (req, res) => {
    try {
        const { transactionAmount, description, email, firstName, lastName } =
            req.body;

        const payment_data = {
            transaction_amount: Number(transactionAmount),
            description,
            payment_method_id: "pix",
            payer: {
                email,
                first_name: firstName,
                last_name: lastName,
            },
        };

        const payment = await mercadopago.payment.create(payment_data);

        res.json({
            qr_code:
                payment.response.point_of_interaction.transaction_data.qr_code,
            qr_code_base64:
                payment.response.point_of_interaction.transaction_data
                    .qr_code_base64,
        });
    } catch (error) {
        console.error("Erro ao criar pagamento Pix:", error);
        res.status(500).send("Erro ao gerar Pix");
    }
});

// Inicia o servidor
app.listen(3001, () => {
    console.log("✅ Servidor rodando na porta 3001");
});
