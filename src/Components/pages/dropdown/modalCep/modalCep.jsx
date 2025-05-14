import React from "react";
import "../modalCep/modalCep.css";
import Order from "../../../Modal/Order/order";

const ModalCep = ({ isOpen, onClose, address, frete, onFreteChange }) => {
    if (!isOpen) return null;

    // Função para fechar o modal e passar o frete de volta para o componente pai
    const handleClose = () => {
        onFreteChange(frete); // Passa o valor do frete para o componente pai
        onClose(); // Fecha o modal
    };

    return (
        <div className="modal-overlay">
            <div className="modal-cep">
                <h2>Valor do Frete</h2>
                <p>
                    <strong>Frete:</strong> R${" "}
                    {Number(frete).toFixed(2).replace(".", ",")}
                </p>
                <p>
                    <strong>Cep: {address.cep}</strong>
                </p>
                {address ? (
                    <>
                        <p>
                            <strong>Logradouro:</strong> {address.logradouro}
                        </p>
                        <p>
                            <strong>Bairro:</strong> {address.bairro}
                        </p>
                        <p>
                            <strong>Cidade:</strong> {address.localidade}
                        </p>
                        <p>
                            <strong>Estado:</strong> {address.uf}
                        </p>
                    </>
                ) : (
                    <p>
                        O endereço não foi encontrado. Verifique o CEP e tente
                        novamente.
                    </p>
                )}
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default ModalCep;
