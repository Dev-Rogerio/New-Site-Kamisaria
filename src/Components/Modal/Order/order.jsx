import React, { useState } from "react";
import "../Order/order.css";
import ModalPagamento from "../modalPagamento/ModalPagamento";

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

            if (!res.ok) throw new Error(`Erro na rota ${route}`);
            return await res.json();
        } catch (err) {
            console.error(`❌ API ${route}:`, err);
            return null;
        }
    };

    // =======================================
    // EMAIL
    // =======================================
    const enviarPedido = async () => {
        return await apiPost("send-email", buildPedidoPayload());
    };

    // =======================================
    // WHATSAPP
    // =======================================
    const handleWhatsApp = async () => {
        setError("");
        setSuccessMsg("");
        setLoadingWhats(true);

        const emailOK = await enviarPedido();
        if (!emailOK) {
            setError("Erro ao enviar pedido.");
            setLoadingWhats(false);
            return;
        }

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

        if (!qtd || !total || total <= 0) {
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

        const data = await apiPost("checkout_pro", payload);
        setLoadingMP(false);

        if (data?.init_point) {
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
            <div className="order" role="dialog" aria-modal="true">
                <div className="orderPage">
                    <div className="dadosCompras">
                        <h2>Confirmação do Pedido</h2>

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

                        {error && <p style={{ color: "crimson" }}>{error}</p>}
                        {successMsg && (
                            <p style={{ color: "green" }}>{successMsg}</p>
                        )}

                        <div className="botoesModal" style={{ marginTop: 12 }}>
                            <button
                                className="buttonConfirmar"
                                onClick={handleWhatsApp}
                                disabled={loadingWhats}
                            >
                                {loadingWhats
                                    ? "Processando..."
                                    : "Pagar (WhatsApp)"}
                            </button>

                            <button
                                className="buttonConfirmar"
                                onClick={checkoutMercadoPago}
                                disabled={loadingMP}
                                style={{ marginLeft: 8 }}
                            >
                                {loadingMP
                                    ? "Redirecionando..."
                                    : "Pagar com Mercado Pago"}
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
            </div>
        </div>
    );
};

export default Order;
