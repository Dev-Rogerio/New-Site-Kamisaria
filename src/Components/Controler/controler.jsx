import React, { useState } from "react";

import "../Controler/controler.css";

import Tabela from "../Modal/Tabela/tabela";

const Controler = ({ onValueChange, setPrice }) => {
    const [valor, setValor] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [table, setTable] = useState(false);
    const [atualId, setAtualId] = useState(0);
    const [lojas, setLojas] = useState([]);
    const [loja, setLoja] = useState({
        id: atualId,
        data: null,
        descricao: null,
        quantidade: null,
        valor: null,
        acoes: null,
    });
    const [deletedIndices, setDeletedIndices] = useState([]);
    const handleClick = (e) => {
        setPrice(loja.valor);
        const novaLoja = { ...loja, id: atualId };
        setLojas([novaLoja, ...lojas]);
        setAtualId((atualId) => atualId + 1);
    };
    const handleDelete = (index) => {
        const updatedLojas = lojas.map((item, i) =>
            i === index
                ? { ...item, deleted: true, color: "rgb(224, 48, 48)" }
                : item
        );
        setLojas(updatedLojas);
        setDeletedIndices([...deletedIndices, index]);
        // const updatedLojas = [...lojas];
        // updatedLojas.splice(index, 1);
        // setLojas(updatedLojas);
    };
    return (
        <React.Fragment>
            <div className="painel">
                <h1> Cadastro de Produto</h1>
                <div className="containerControler">
                    <div className="divId">
                        <label htmlFor="id" className="labelProd">
                            Id
                        </label>
                        <div id="id" type="text" className="inputId">
                            {atualId}
                        </div>
                    </div>
                    <div className="divDate">
                        <label htmlFor="" className="labelDate">
                            Data
                        </label>
                        <input
                            id="data"
                            type="date"
                            className="inputDate inputProd"
                            onChange={(e) => {
                                setLoja({ ...loja, data: e.target.value });
                            }}
                        />
                    </div>
                    <div className="divDescription">
                        <label className="labelProd" htmlFor="">
                            Descrição do Produto
                        </label>
                        <input
                            className="inputProd"
                            name=""
                            type="text"
                            onChange={(e) => {
                                setLoja({ ...loja, descricao: e.target.value });
                            }}
                        ></input>
                    </div>
                    <div className="divQuantities">
                        <label htmlFor="" className="labelQuantities">
                            Quantidade
                        </label>
                        <input
                            className="inputQuantities inputProd"
                            name="fnome"
                            type="text"
                            onChange={(e) => {
                                setLoja({
                                    ...loja,
                                    quantidade: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="divValue">
                        <label htmlFor="" className="labelProd">
                            Valor do Produto
                        </label>
                        <input
                            type="text"
                            className="inputProd"
                            onChange={(e) => {
                                setLoja({ ...loja, valor: e.target.value });
                            }}
                        />
                    </div>
                </div>
                <div className="buttonCad">
                    <button className="cadastro" onClick={handleClick}>
                        Cadastrar
                    </button>
                    <button className="save" onClick={handleClick}>
                        Salvar
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Data</th>
                            <th>Desc. do Produto</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {lojas.map((marca, index) => (
                            <Tabela
                                marca={marca}
                                onDelete={() => handleDelete(index)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};
export default Controler;
