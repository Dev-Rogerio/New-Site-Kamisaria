// src/Order/Order.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Order/order.css";
// import VisaModal from "../CartaoVisa/VisaModal";
// import ModalPagamento from "../modalPagamento/ModalPagamento";

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
    // const [showPagamento, setShowPagamento] = useState(false);
    // const handlePagar = () => setShowPagamento(true);
    const [emailPagador, setEmailPagador] = useState("");
    const [nomeCartao, setNomeCartao] = useState("");
    const [message, setMessage] = useState("");

    const handleVoltar = () => {
        setShowModal(false);
        setHideAddress(false);
    };

    const calcularTotalCompra = () => {
        const valorProdutos = Number(valCamisa);
        const valorFrete = frete ? Number(frete) : 0;
        const total = valorProdutos + valorFrete;
        return total.toFixed(2).replace(".", ",");
    };

    const enviarPedido = async () => {
        const pedido = {
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
        };

        try {
            const response = await fetch("http://localhost:3001/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pedido),
            });

            if (response.ok) {
                console.log("Pedido enviado com sucesso!");
            } else {
                console.error("Erro ao enviar pedido");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    const handleConfirmarPagamento = async () => {
        const pagamentoData = {
            titulo: "Camisa Social",
            quantidade: 1,
            valorUnitario: 1.0,
            valorUnitario: Number(valCamisa),
            emailPagador: email,
            emailPagador: "cliente@email.com", // você pode usar um email fixo se não for obrigatório
            nomeCartao: "Não necessário para checkout_pro",
        };

        try {
            const response = await fetch("http://localhost:3001/checkout_pro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pagamentoData),
            });

            const data = await response.json();

            if (response.ok && data.init_point) {
                window.location.href = data.init_point; // Redireciona direto pro Mercado Pago
            } else {
                console.error("Erro ao criar preferência:", data);
            }
        } catch (error) {
            console.error("Erro ao processar pagamento:", error);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="order">
                <div className="orderPage">
                    <div className="dadosCompras">
                        <h2>Confirmação do Pedido</h2>
                        <p>
                            <strong>Nome:</strong> {nome}
                        </p>
                        <p>
                            <strong>Cpf:</strong> {cpf}
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
                        <p>
                            <strong>
                                {" "}
                                Camisa Social Masculina Manga Longa Slim Fit Sem
                                Bolso
                            </strong>
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
                            {`R$ ${Number(valCamisa)
                                .toFixed(2)
                                .replace(".", ",")}`}
                        </p>

                        <p>
                            <strong>Frete:</strong> R${" "}
                            {frete
                                ? Number(frete).toFixed(2).replace(".", ",")
                                : "Frete Gratis"}
                        </p>

                        <p className="valor-total-compra">
                            <strong>
                                Valor Total da Compra: {calcularTotalCompra()}
                            </strong>
                        </p>

                        <div className="botoesModal">
                            {/* <button
                                className="buttonConfirmar"
                                onClick={() => {
                                    // handlePagar();
                                    // enviarPedido();
                                }}
                            >
                                Confirma Pedido
                            </button> */}

                            <button
                                className="buttonConfirmar"
                                onClick={async () => {
                                    await enviarPedido(); // envia os dados por e-mail
                                    await handleConfirmarPagamento(); // redireciona direto pro Mercado Pago
                                }}
                            >
                                Confirmar Pedido
                            </button>

                            <button
                                className="buttonCancelar"
                                onClick={handleVoltar}
                            >
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>

                {/* {showPagamento && (
                    <ModalPagamento
                        descricao="Camisa Personalizada"
                        valCamisa={valCamisa}
                        quantidade={quantidade}
                        selectedSize={selectedSize}
                        selectedColor={selectedColor}
                        email={email}
                        fecharPagamento={() => setShowPagamento(false)}
                        abrirVisaModal={() => {
                            setShowPagamento(false);
                        }}
                    />
                )} */}
            </div>
        </div>
    );
};

export default Order;
