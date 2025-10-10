import React, { useState } from "react";
import "./camisa.css";

const Modelos = () => {
    const [selectedColor, setSelectedColor] = useState(null);

    const camisas = [
        {
            id: 1,
            nome: "Camisa Branca",
            cor: "#ffffff",
            imagem: "/img/camisa-branca.png",
        },
        {
            id: 2,
            nome: "Camisa Azul",
            cor: "#1e90ff",
            imagem: "/img/camisa-azul.png",
        },
        {
            id: 3,
            nome: "Camisa Preta",
            cor: "#000000",
            imagem: "/img/camisa-preta.png",
        },
        {
            id: 4,
            nome: "Camisa Cinza",
            cor: "#808080",
            imagem: "/img/camisa-cinza.png",
        },
    ];

    return (
        <div className="modelos-container">
            <h1>Escolha sua camisa</h1>

            <div className="camisas-grid">
                {camisas.map((camisa) => (
                    <div
                        key={camisa.id}
                        className={`camisa-card ${
                            selectedColor === camisa.id ? "selected" : ""
                        }`}
                        onClick={() => setSelectedColor(camisa.id)}
                    >
                        <img
                            src={camisa.imagem}
                            alt={camisa.nome}
                            className="camisa-img"
                        />
                        <h3>{camisa.nome}</h3>
                        <div
                            className="cor-indicador"
                            style={{ backgroundColor: camisa.cor }}
                        />
                    </div>
                ))}
            </div>

            {selectedColor && (
                <div className="confirmacao">
                    <p>
                        Você selecionou:{" "}
                        <strong>
                            {camisas.find((c) => c.id === selectedColor).nome}
                        </strong>
                    </p>
                    <button className="btn-confirmar">Confirmar Escolha</button>
                </div>
            )}
        </div>
    );
};

export default Modelos;
