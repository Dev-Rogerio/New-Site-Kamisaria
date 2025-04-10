import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Pedido/pedido.css"; // vamos criar esse depois

const Pedido = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:5000/pedidos")
            .then((response) => {
                setPedidos(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar pedidos:", error);
                setLoading(false);
            });
    }, []);

    const renderCampo = (label, valor) => {
        if (!valor || valor.trim() === "") return null;
        return (
            <p>
                <strong>{label}:</strong> {valor}
            </p>
        );
    };

    return (
        <div className="painel">
            <h1 className="titulo">📦 Painel de Pedidos</h1>
            {loading ? (
                <div className="carregando">🔄 Carregando pedidos...</div>
            ) : pedidos.length === 0 ? (
                <div className="nenhum">⚠️ Nenhum pedido encontrado.</div>
            ) : (
                pedidos.map((pedido, index) => (
                    <div key={index} className="card">
                        {renderCampo("Nome", pedido.nome)}
                        {renderCampo("Telefone", pedido.telefone)}
                        {renderCampo("Endereço", pedido.endereco)}
                        {renderCampo("Número", pedido.numero)}
                        {renderCampo("Complemento", pedido.complemento)}
                        {renderCampo("Bairro", pedido.bairro)}
                        {renderCampo("Cidade", pedido.cidade)}
                        {renderCampo("Estado", pedido.estado)}
                        {renderCampo("CEP", pedido.cep)}
                        {renderCampo("Local", pedido.local)}
                        {renderCampo("Observação", pedido.observacao)}
                        {renderCampo("Tamanho", pedido.tamanho)}
                    </div>
                ))
            )}
        </div>
    );
};

export default Pedido;
