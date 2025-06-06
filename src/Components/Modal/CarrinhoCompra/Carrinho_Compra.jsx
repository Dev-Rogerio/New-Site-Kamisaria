import React, { useState } from "react";
import "../../Modal/CarrinhoCompra/Carrinho_Compra.css";
import ModalPagamentoCarrinho from "../PagamentoCarrinho/pagtocar";

const CarrinhoCompra = ({
    carrinho = [],
    removerItem,
    limparCarrinho,
    fecharCarrinho,
    quantidade,
}) => {
    const [mostrarPagamento, setMostrarPagamento] = useState(false);

    const calcularTotalUnitarios = () => {
        return carrinho.reduce((soma, item) => soma + item.preco, 0).toFixed(2);
    };

    return (
        <div className="modal-carrinho">
            <div className="carrinho-container">
                <div className="carrinho-header">
                    <h2>Seu Carrinho</h2>
                    <button className="fechar-btn" onClick={fecharCarrinho}>
                        Fechar
                    </button>
                </div>

                {carrinho.length === 0 ? (
                    <p className="carrinho-vazio">O carrinho está vazio.</p>
                ) : (
                    <>
                        <ul className="lista-carrinho">
                            {carrinho.map((item, index) => (
                                <li key={index} className="item-carrinho">
                                    <img
                                        src={item.imagem}
                                        alt={item.nome}
                                        className="item-imagem"
                                    />
                                    <div className="item-info">
                                        <p>
                                            <strong>{item.nome}</strong>
                                        </p>
                                        <p>Quantidade: {item.quantidade}</p>
                                        <p>
                                            Total do item: R${" "}
                                            {item.preco.toFixed(2)}
                                        </p>
                                        <p>Cor: {item.cor}</p>
                                        <p>Tamanho: {item.tamanho}</p>
                                        <button
                                            onClick={() => removerItem(index)}
                                            className="botao-remover"
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="carrinho-total">
                            <p>
                                Total da compra{" "}
                                <strong>R$ {calcularTotalUnitarios()}</strong>
                            </p>
                            <div className="buttonShopping">
                                <button
                                    onClick={limparCarrinho}
                                    className="botao-limpar"
                                >
                                    Limpar Carrinho
                                </button>

                                <button
                                    className="botao-finalizar"
                                    onClick={() => setMostrarPagamento(true)}
                                >
                                    Finalizar Compra
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {mostrarPagamento && (
                <ModalPagamentoCarrinho
                    onClose={() => setMostrarPagamento(false)}
                />
            )}
        </div>
    );
};

export default CarrinhoCompra;
