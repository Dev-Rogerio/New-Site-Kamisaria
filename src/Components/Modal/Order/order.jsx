// src/Order/Order.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Order/order.css";
import ModalPagamento from "../Pagamento/ModalPagamento";
import VisaModal from "../CartaoVisa/ModalCartaoVisa";

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
}) => {
    const [showPagamento, setShowPagamento] = useState(false);

    const handlePagar = () => setShowPagamento(true);

    const handleVoltar = () => {
        setShowModal(false);
        setHideAddress(false);
    };

    return (
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
                        {`R$ ${Number(valCamisa).toFixed(2).replace(".", ",")}`}
                    </p>

                    <div className="botoesModal">
                        <button
                            className="buttonConfirmar"
                            onClick={handlePagar}
                        >
                            Confirma Pedido
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

            {showPagamento && (
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
            )}
        </div>
    );
};

export default Order;
