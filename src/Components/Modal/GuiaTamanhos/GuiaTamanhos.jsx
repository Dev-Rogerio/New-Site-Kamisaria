import React, { useState } from "react";
// import MeasurePersona from "../../Img/MeasurePersona.png";
// import MeasureMeasure from "../../Img/homemDesenho.png";
import "../GuiaTamanhos/GuiaTamanhos.css";
import { CornerUpLeftIcon } from "lucide-react";

const tamanhos = [
    {
        tamanho: "38",
        colarinho: "38 cm",
        pala: "45 cm",
        manga: "62 cm",
        comprimento: "74 cm",
        quadril: "94 cm",
        cintura: "88 cm",
        torax: "96 cm",
        punho: "22 cm",
    },
    {
        tamanho: "40",
        colarinho: "40 cm",
        pala: "46 cm",
        manga: "63 cm",
        comprimento: "75 cm",
        quadril: "98 cm",
        cintura: "92 cm",
        torax: "100 cm",
        punho: "23 cm",
    },
    {
        tamanho: "42",
        colarinho: "42 cm",
        pala: "47 cm",
        manga: "64 cm",
        comprimento: "76 cm",
        quadril: "102 cm",
        cintura: "96 cm",
        torax: "104 cm",
        punho: "24 cm",
    },
    {
        tamanho: "44",
        colarinho: "44 cm",
        pala: "48 cm",
        manga: "65 cm",
        comprimento: "77 cm",
        quadril: "106 cm",
        cintura: "100 cm",
        torax: "108 cm",
        punho: "25 cm",
    },
    {
        tamanho: "46",
        colarinho: "46 cm",
        pala: "49 cm",
        manga: "66 cm",
        comprimento: "78 cm",
        quadril: "110 cm",
        cintura: "104 cm",
        torax: "112 cm",
        punho: "26 cm",
    },
    {
        tamanho: "48",
        colarinho: "48 cm",
        pala: "50 cm",
        manga: "67 cm",
        comprimento: "79 cm",
        quadril: "114 cm",
        cintura: "108 cm",
        torax: "116 cm",
        punho: "27 cm",
    },
];

const ModalDetalhes = ({ tamanho, onClose }) => {
    return (
        <div className="luxo-modal-overlay" onClick={onClose}>
            <div className="luxo-modal" onClick={(e) => e.stopPropagation()}>
                <div className="luxo-modal-header">
                    <button className="luxo-voltar-btn" onClick={onClose}>
                        <CornerUpLeftIcon size={22} /> Voltar
                    </button>
                    <h3 className="luxo-modal-titulo">
                        Tamanho {tamanho.tamanho}
                    </h3>
                </div>

                <ul className="luxo-modal-lista">
                    <li>
                        <strong>Colarinho:</strong> {tamanho.colarinho}
                    </li>
                    <li>
                        <strong>Pala:</strong> {tamanho.pala}
                    </li>
                    <li>
                        <strong>Manga:</strong> {tamanho.manga}
                    </li>
                    <li>
                        <strong>Comprimento:</strong> {tamanho.comprimento}
                    </li>
                    <li>
                        <strong>Quadril:</strong> {tamanho.quadril}
                    </li>
                    <li>
                        <strong>Cintura:</strong> {tamanho.cintura}
                    </li>
                    <li>
                        <strong>Tórax:</strong> {tamanho.torax}
                    </li>
                    <li>
                        <strong>Punho:</strong> {tamanho.punho}
                    </li>
                </ul>

                <div className="luxo-modal-imagem">
                    <img
                        src={"MeasureMeasure"}
                        alt="Medidas do corpo masculino"
                    />
                </div>
            </div>
        </div>
    );
};

const GuiaTamanhosLuxo = ({ isOpen, setIsOpen }) => {
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);

    if (!isOpen) return null;

    return (
        <div className="luxo-container">
            <img
                src={"MeasurePersona"}
                alt="Guia de medidas"
                className="luxo-imagem"
            />
            <h2 className="luxo-titulo">
                Verifique a medida que mais se ajusta a você:
            </h2>

            <div className="luxo-botoes">
                {tamanhos.map((item) => (
                    <button
                        key={item.tamanho}
                        className={`luxo-botao-tamanho ${
                            tamanhoSelecionado?.tamanho === item.tamanho
                                ? "selecionado"
                                : ""
                        }`}
                        onClick={() => setTamanhoSelecionado(item)}
                    >
                        {item.tamanho}
                    </button>
                ))}
            </div>

            <button
                className="botao-voltar-principal"
                onClick={() => setIsOpen(false)}
            >
                Voltar
            </button>

            {tamanhoSelecionado && (
                <ModalDetalhes
                    tamanho={tamanhoSelecionado}
                    onClose={() => setTamanhoSelecionado(null)}
                />
            )}
        </div>
    );
};

export default GuiaTamanhosLuxo;
