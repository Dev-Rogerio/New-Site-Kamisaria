import React from "react";
import "../../Modal/CarrinhoCompra/Carrinho_Compra.css";

const CarrinhoCompra = ({
    carrinho = [],
    removerItem,
    limparCarrinho,
    fecharCarrinho,
    quantidade,
}) => {
    // Função que soma os preços unitários de todos os itens no carrinho
    const calcularTotalUnitarios = () => {
        return carrinho.reduce((soma, item) => soma + item.preco, 0).toFixed(2);
    };

    return (
        <div className="modal-carrinho">
            <div className="carrinho-container">
                {/* Cabeçalho do modal */}
                <div className="carrinho-header">
                    <h2>Seu Carrinho</h2>
                    <button className="fechar-btn" onClick={fecharCarrinho}>
                        Fechar
                    </button>
                </div>

                {/* Se o carrinho estiver vazio, exibe mensagem */}
                {carrinho.length === 0 ? (
                    <p>O carrinho está vazio.</p>
                ) : (
                    <>
                        {/* Lista de itens no carrinho */}
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
                                        <p>Quantidade: {item.quantidade} </p>
                                        <p>
                                            Total do item: R${" "}
                                            {item.preco.toFixed(2)}
                                        </p>
                                        <p>Cor: {item.cor} </p>
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

                        {/* Exibe o total da compra */}
                        <div className="carrinho-total">
                            <p>
                                Total da compra
                                <strong> R$ {calcularTotalUnitarios()}</strong>
                            </p>
                            <button
                                onClick={limparCarrinho}
                                className="botao-limpar"
                            >
                                Limpar Carrinho
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CarrinhoCompra;
