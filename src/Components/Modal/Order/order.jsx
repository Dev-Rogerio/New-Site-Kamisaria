// src/Order/Order.jsx
import React, { useState } from "react";
import "../Order/order.css";
import ModalPagamento from "../modalPagamento/ModalPagamento";

// =======================================
// API LOCAL (ambiente de desenvolvimento)
// =======================================
const API_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:3001"
        : "https://new-site-kamisaria-1.onrender.com";

const Order = (props) => {
    const {
        nome,
        cpf,
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
        setShowModal,
        setHideAddress,
        selectedSize,
        selectedColor,
        quantidade,
        valCamisa,
        email,
        frete,
    } = props;

    const [showPagamento, setShowPagamento] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // -------------------------------
    // Funções utilitárias
    // -------------------------------
    const formatBRL = (v) =>
        `R$ ${Number(v || 0)
            .toFixed(2)
            .replace(".", ",")}`;

    const calcularTotalCompra = () => {
        const valorProdutos = Number(String(valCamisa || 0).replace(",", "."));
        const valorFrete = frete ? Number(frete) : 0;
        return (valorProdutos + valorFrete).toFixed(2).replace(".", ",");
    };

    const closeModal = () => {
        setShowModal(false);
        setHideAddress(false);
    };

    // -------------------------------
    // Payload único para API
    // -------------------------------
    const buildPedidoPayload = () => ({
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
        tamanho: selectedSize,
        cor: selectedColor,
        quantidade,
        valorCompra: Number(valCamisa),
        frete: frete ? Number(frete) : 0,
        valorTotal: Number(valCamisa) + (frete ? Number(frete) : 0),
    });

    // -------------------------------
    // Requisição POST padrão
    // -------------------------------
    const apiPost = async (route, payload) => {
        try {
            const res = await fetch(`${API_URL}/${route}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error(`Erro na rota ${route}`);
            return await res.json();
        } catch (err) {
            console.error(`❌ Erro na rota ${route}:`, err);
            return null;
        }
    };

    // -------------------------------
    // Enviar E-MAIL
    // -------------------------------
    const enviarPedido = async () => {
        const ok = await apiPost("send-email", buildPedidoPayload());
        if (!ok) {
            setError("Erro ao enviar pedido. Tente novamente.");
            return false;
        }
        return true;
    };

    // -------------------------------
    // Enviar WHATSAPP
    // -------------------------------
    const enviarWhatsApp = async () => {
        const data = await apiPost("send-whatsapp", buildPedidoPayload());
        if (!data?.url) {
            setError("Erro ao preparar mensagem no WhatsApp.");
            return null;
        }
        return data.url;
    };

    // -------------------------------
    // Mercado Pago — Checkout Pro
    // -------------------------------

    const checkoutMercadoPago = async () => {
        setLoading(true);
        setError("");

        const qtd = Number(quantidade);

        // 🔥 valor total REAL (sem vírgula)
        const total = Number(String(calcularTotalCompra()).replace(",", "."));

        if (!qtd || !total || total <= 0) {
            setError("Valor inválido para pagamento.");
            setLoading(false);
            return;
        }

        const valorUnitario = Number((total / qtd).toFixed(2));

        const payload = {
            titulo: "Camisa Social Masculina",
            quantidade: qtd,
            valorUnitario,
            emailPagador: email,
        };

        console.log("🟢 PAYLOAD MERCADO PAGO:", payload);

        const data = await apiPost("checkout_pro", payload);

        setLoading(false);

        if (data?.init_point) {
            window.location.href = data.init_point;
            return;
        }

        console.error("❌ Resposta Mercado Pago inválida:", data);
        setError("Erro ao iniciar pagamento (Mercado Pago).");
    };

    // -------------------------------
    // Handler principal (WhatsApp)
    // -------------------------------
    const handlePagar = async () => {
        setError("");
        setSuccessMsg("");
        setLoading(true);

        const emailOK = await enviarPedido();
        if (!emailOK) {
            setLoading(false);
            return;
        }

        const whatsappUrl = await enviarWhatsApp();
        setLoading(false);

        if (whatsappUrl) {
            setSuccessMsg("Pedido pronto — abrindo WhatsApp...");
            window.open(whatsappUrl, "_blank");
        }
    };

    // -------------------------------
    // JSX
    // -------------------------------
    return (
        <div className="modal-backdrop">
            <div className="order" role="dialog" aria-modal="true">
                <div className="orderPage">
                    <div className="dadosCompras">
                        <h2>Confirmação do Pedido</h2>

                        {/* Dados pessoais */}
                        <p>
                            <strong>Nome:</strong> {nome}
                        </p>
                        <p>
                            <strong>CPF:</strong> {cpf}
                        </p>
                        <p>
                            <strong>Email:</strong> {email}
                        </p>
                        <p>
                            <strong>CEP:</strong> {cep}
                        </p>
                        <p>
                            <strong>Estado:</strong> {estado}
                        </p>
                        <p>
                            <strong>Cidade:</strong> {cidade}
                        </p>
                        <p>
                            <strong>Bairro:</strong> {bairro}
                        </p>
                        <p>
                            <strong>Endereço:</strong> {endereco}, Nº {numero}
                        </p>

                        {complemento && (
                            <p>
                                <strong>Complemento:</strong> {complemento}
                            </p>
                        )}
                        {observacao && (
                            <p>
                                <strong>Observação:</strong> {observacao}
                            </p>
                        )}

                        <p>
                            <strong>Telefone:</strong> {telefone}
                        </p>
                        <p>
                            <strong>Local:</strong> {local}
                        </p>

                        <hr />

                        {/* Produto */}
                        <p>
                            <strong>Produto:</strong> Camisa Social Masculina
                            Slim Fit
                        </p>
                        <p>
                            <strong>Tamanho:</strong> {selectedSize}
                        </p>
                        <p>
                            <strong>Cor:</strong> {selectedColor}
                        </p>
                        <p>
                            <strong>Quantidade:</strong> {quantidade}
                        </p>
                        <p>
                            <strong>Valor da Compra:</strong>{" "}
                            {formatBRL(valCamisa)}
                        </p>
                        <p>
                            <strong>Frete:</strong>{" "}
                            {frete ? formatBRL(frete) : "Grátis"}
                        </p>

                        <p className="valor-total-compra">
                            <strong>
                                Valor Total da Compra: {calcularTotalCompra()}
                            </strong>
                        </p>

                        {error && (
                            <p
                                className="error-msg"
                                style={{ color: "crimson" }}
                            >
                                {error}
                            </p>
                        )}
                        {successMsg && (
                            <p
                                className="success-msg"
                                style={{ color: "green" }}
                            >
                                {successMsg}
                            </p>
                        )}

                        {/* Botões */}
                        <div className="botoesModal" style={{ marginTop: 12 }}>
                            <button
                                className="buttonConfirmar"
                                onClick={handlePagar}
                                disabled={loading}
                            >
                                {loading
                                    ? "Processando..."
                                    : "Pagar (WhatsApp)"}
                            </button>

                            <button
                                className="buttonConfirmar"
                                onClick={checkoutMercadoPago}
                                disabled={loading}
                                style={{ marginLeft: 8 }}
                            >
                                Pagar com Mercado Pago
                            </button>

                            <button
                                className="buttonCancelar"
                                onClick={closeModal}
                                style={{ marginLeft: 8 }}
                            >
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>

                {showPagamento && (
                    <ModalPagamento
                        descricao="Camisa Personalizada"
                        valCamisa={valCamisa}
                        quantidade={quantidade}
                        selectedSize={selectedSize}
                        selectedColor={selectedColor}
                        email={email}
                        fecharPagamento={() => setShowPagamento(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default Order;
