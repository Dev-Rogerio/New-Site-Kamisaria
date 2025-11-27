// src/Order/Order.jsx
import React, { useState } from "react";
import "../Order/order.css";
import VisaModal from "../CartaoVisa/VisaModal";
import ModalPagamento from "../modalPagamento/ModalPagamento";

// const API_URL = "https://new-site-kamisaria-1.onrender.com"; // backend no Render
const API_URL = "http://localhost:3001";

const Order = ({
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
}) => {
    const [showPagamento, setShowPagamento] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const closeModal = () => {
        setShowModal(false);
        setHideAddress(false);
    };

    const formatBRL = (v) =>
        `R$ ${Number(v || 0)
            .toFixed(2)
            .replace(".", ",")}`;

    const calcularTotalCompra = () => {
        const valorProdutos = Number(String(valCamisa || 0).replace(",", "."));
        const valorFrete = frete ? Number(frete) : 0;
        return (valorProdutos + valorFrete).toFixed(2).replace(".", ",");
    };

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

    const enviarPedido = async () => {
        const payload = buildPedidoPayload();
        try {
            const res = await fetch(`${API_URL}/send-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Erro ao enviar e-mail.");
            return true;
        } catch (err) {
            console.error("enviarPedido:", err);
            setError("Erro ao enviar pedido. Tente novamente.");
            return false;
        }
    };

    const enviarWhatsApp = async () => {
        const payload = buildPedidoPayload();
        try {
            const res = await fetch(`${API_URL}/send-whatsapp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Erro ao criar link do WhatsApp.");
            const data = await res.json();
            return data.url;
        } catch (err) {
            console.error("enviarWhatsApp:", err);
            setError("Erro ao preparar mensagem no WhatsApp.");
            return null;
        }
    };

    const checkoutMercadoPago = async () => {
        setLoading(true);
        const payload = {
            titulo: "Camisa Social",
            quantidade: quantidade || 1,
            valorUnitario: Number(valCamisa) || 0,
            emailPagador: email,
            nomeCartao: "Checkout Pro",
        };

        try {
            const res = await fetch(`${API_URL}/checkout_pro`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (res.ok && data.init_point) {
                window.location.href = data.init_point;
                return true;
            } else {
                console.error("checkoutMercadoPago:", data);
                setError("Erro ao iniciar pagamento (Mercado Pago).");
                return false;
            }
        } catch (err) {
            console.error("checkoutMercadoPago:", err);
            setError("Erro ao processar pagamento.");
            return false;
        }
    };

    // Handler principal ao clicar em "Pagar" (envia e-mail e abre WhatsApp)
    const handlePagar = async () => {
        setError("");
        setSuccessMsg("");
        setLoading(true);

        // 1) envia o pedido por e-mail (backoffice)
        const okEmail = await enviarPedido();
        if (!okEmail) {
            setLoading(false);
            return;
        }

        // 2) cria link do WhatsApp no backend e abre
        const whatsappUrl = await enviarWhatsApp();
        setLoading(false);

        if (whatsappUrl) {
            setSuccessMsg("Pedido pronto — abrindo WhatsApp...");
            window.open(whatsappUrl, "_blank");
        }
    };

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
                            Manga Longa Slim Fit Sem Bolso
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
                            {frete ? formatBRL(frete) : "Frete Grátis"}
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

                        <div className="botoesModal" style={{ marginTop: 12 }}>
                            <button
                                className="buttonConfirmar"
                                onClick={handlePagar}
                                disabled={loading}
                                aria-busy={loading}
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
