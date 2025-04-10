import React from "react";
import "../modalCep/modalCep.css";

const ModalCep = ({ isOpen, onClose, address }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-cep">
                <h2>Valor do Frete</h2>
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
