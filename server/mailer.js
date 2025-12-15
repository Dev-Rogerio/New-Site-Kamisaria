// mailer.js
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmail(data) {
    const {
        nomeCliente,
        telefone,
        cpf,
        endereco,
        bairro,
        cidade,
        estado,
        cep,
        tamanho,
        tecido,
        modelo,
        observacoes,
        quantidade,
        valor,
        email,
    } = data;

    try {
        const response = await resend.emails.send({
            from: "Kamisaria Zanuto <pedido@kamisariazanuto.com.br>",
            to: "rogerio.kamisaria@gmail.com",
            subject: "📦 Novo Pedido — Kamisaria Zanuto",
            html: `
        <h2>Novo pedido recebido pelo site</h2>

        <h3>Dados do Cliente</h3>
        <p><strong>Nome:</strong> ${nomeCliente}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>CPF:</strong> ${cpf}</p>
        <p><strong>Email:</strong> ${email}</p>

        <h3>Endereço</h3>
        <p>${endereco}, ${bairro}</p>
        <p>${cidade} - ${estado}</p>
        <p>CEP: ${cep}</p>

        <h3>Detalhes do Pedido</h3>
        <p><strong>Modelo:</strong> ${modelo}</p>
        <p><strong>Tecido:</strong> ${tecido}</p>
        <p><strong>Tamanho:</strong> ${tamanho}</p>
        <p><strong>Quantidade:</strong> ${quantidade}</p>
        <p><strong>Valor:</strong> R$ ${valor}</p>

        <h3>Observações</h3>
        <p>${observacoes || "Nenhuma"}</p>

        <hr>
        <p style="font-size:12px;color:#777;">Enviado automaticamente pelo site Kamisaria Zanuto.</p>
      `,
        });

        console.log("📧 Email enviado via Resend:", response);
        return true;
    } catch (error) {
        console.error("❌ Erro ao enviar email via Resend:", error);
        return false;
    }
}
