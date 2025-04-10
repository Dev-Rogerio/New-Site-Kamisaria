import React from "react";
import axios from "axios";
import "../Order/order.css";

const Order = ({
    nome,
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
}) => {
    const handleClose = () => {
        setShowModal(false);
        setHideAddress(false);
    };

    const handleFinalizar = () => {
        // Aqui você pode montar o objeto com todos os dados para enviar ao backend, se desejar
        const pedido = {
            nome,
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
        };

        console.log("Pedido a ser enviado:", pedido);
        // Aqui você poderia usar axios para enviar ao servidor, por exemplo
        // axios.post('/api/enviar-pedido', pedido)

        // Fecha a modal após finalizar
        handleClose();
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

                    <div className="botoesModal">
                        <button
                            className="buttonConfirmar"
                            onClick={handleFinalizar}
                        >
                            Confirmar
                        </button>
                        <button className="buttonCancelar" onClick={""}>
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
