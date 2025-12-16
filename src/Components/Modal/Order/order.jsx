import React, { useState } from "react";
import "../Order/order.css";

// =======================================
// API (DEV / PROD)
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

    // =======================================
    // STATES
    // =======================================
    const [loadingWhats, setLoadingWhats] = useState(false);
    const [loadingMP, setLoadingMP] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // =======================================
    // HELPERS
    // =======================================
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

    // =======================================
    // PAYLOAD BASE
    // =======================================
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

    // =======================================
    // API POST
    // =======================================
    const apiPost = async (route, payload) => {
        try {
            const res = await fetch(`${API_URL}/${route}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error(`❌ API ${route} erro:`, data);
                return null;
            }

            return data;
        } catch (err) {
            console.error(`❌ API ${route} falhou:`, err);
            return null;
        }
    };

    // =======================================
    // WHATSAPP
    // =======================================
    const handleWhatsApp = async () => {
        setError("");
        setSuccessMsg("");
        setLoadingWhats(true);

        console.log("📨 Enviando pedido por email...");
        const emailOK = await apiPost("send-email", buildPedidoPayload());

        if (!emailOK) {
            setError("Erro ao enviar pedido.");
            setLoadingWhats(false);
            return;
        }

        console.log("📲 Gerando WhatsApp...");
        const data = await apiPost("send-whatsapp", buildPedidoPayload());
        setLoadingWhats(false);

        if (!data?.url) {
            setError("Erro ao abrir WhatsApp.");
            return;
        }

        setSuccessMsg("Pedido pronto — abrindo WhatsApp...");
        window.open(data.url, "_blank");
    };

    // =======================================
    // MERCADO PAGO
    // =======================================
    const checkoutMercadoPago = async () => {
        setError("");
        setLoadingMP(true);

        const qtd = Number(quantidade);
        const total = Number(String(calcularTotalCompra()).replace(",", "."));

        if (!qtd || total <= 0) {
            setError("Valor inválido para pagamento.");
            setLoadingMP(false);
            return;
        }

        const payload = {
            titulo: "Camisa Social Masculina",
            quantidade: qtd,
            valorUnitario: Number((total / qtd).toFixed(2)),
            emailPagador: email,
        };

        console.log("💳 Mercado Pago payload:", payload);

        const data = await apiPost("checkout_pro", payload);
        setLoadingMP(false);

        if (data?.init_point) {
            console.log("✅ Redirecionando Mercado Pago");
            window.location.href = data.init_point;
            return;
        }

        setError("Erro ao iniciar pagamento (Mercado Pago).");
    };

    // =======================================
    // JSX
    // =======================================
    return (
        <div className="modal-backdrop">
            <div className="order">
                <div className="dadosCompras">
                    <h2>Confirmação do Pedido</h2>

                    <p>
                        <strong>Nome:</strong> {nome}
                    </p>
                    <p>
                        <strong>Email:</strong> {email}
                    </p>
                    <p>
                        <strong>Telefone:</strong> {telefone}
                    </p>
                    <p>
                        <strong>Cidade:</strong> {cidade}
                    </p>
                    <p>
                        <strong>Endereço:</strong> {endereco}, Nº {numero}
                    </p>

                    <hr />

                    <p>
                        <strong>Produto:</strong> Camisa Social Masculina
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
                        <strong>Valor Total:</strong> {calcularTotalCompra()}
                    </p>

                    {error && <p style={{ color: "crimson" }}>{error}</p>}
                    {successMsg && (
                        <p style={{ color: "green" }}>{successMsg}</p>
                    )}

                    <div className="botoesModal">
                        <button
                            onClick={handleWhatsApp}
                            disabled={loadingWhats}
                        >
                            {loadingWhats
                                ? "Processando..."
                                : "Pagar (WhatsApp)"}
                        </button>

                        <button
                            onClick={checkoutMercadoPago}
                            disabled={loadingMP}
                        >
                            {loadingMP
                                ? "Redirecionando..."
                                : "Pagar com Mercado Pago"}
                        </button>

                        <button onClick={closeModal}>Voltar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
