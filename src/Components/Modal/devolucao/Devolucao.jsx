import React, { useState, useEffect } from "react";
import "./Devolucao.css";

const Devolucao = ({ mostrarSaibaMais, setMostrarSaibaMais }) => {
    useEffect(() => {
        if (mostrarSaibaMais) {
            setConcordo(false); // Reseta o checkbox ao abrir a modal
        }
    }, [mostrarSaibaMais]);

    const [concordo, setConcordo] = useState(false);

    if (!mostrarSaibaMais) return null;

    return (
        <div className="modal-overlay">
            <div className="politica-container">
                <div className="closeButtonDevolucao">
                    <button onClick={() => setMostrarSaibaMais(false)}>
                        <span>✖</span>
                        <p>Fechar</p>
                    </button>
                </div>

                <div className="textPolitic">
                    <h2> Política de Devolução</h2>
                    <p>
                        Prezamos por sua satisfação! Se não estiver contente com
                        a compra, você pode solicitar devolução gratuita,
                        conforme os termos:
                    </p>
                </div>

                <div className="textPolitic">
                    <h2> Prazo</h2>
                    <p>
                        Até <strong>7 dias corridos</strong> após o recebimento.
                    </p>
                </div>

                <div className="textPolitic">
                    <h2> Requisitos</h2>
                    <ul>
                        <li>Peça sem uso;</li>
                        <li>Com etiquetas;</li>
                        <li>Embalagem original ou similar;</li>
                        <li>Nota fiscal ou comprovante do pedido.</li>
                    </ul>
                </div>

                <div className="textPolitic">
                    <h2> Recusas</h2>
                    <ul>
                        <li>Sinais de uso, perfume ou maquiagem;</li>
                        <li>Etiqueta removida;</li>
                        <li>Danos por lavagem ou mau uso.</li>
                    </ul>
                </div>

                <div className="textPolitic">
                    <h2> Solicitação</h2>
                    <ol>
                        <li>WhatsApp (11) 97341-8998 ou e-mail;</li>
                        <li>Informe número do pedido e motivo;</li>
                        <li>Receba etiqueta de devolução;</li>
                        <li>Após recebimento, realizamos reembolso.</li>
                    </ol>
                </div>

                <div className="textPolitic">
                    <h2>💡 Dica</h2>
                    <p>Prove sem perfume ou maquiagem. Não remova etiquetas.</p>
                </div>

                <p className="agradecimento">
                    🤝 Agradecemos por escolher a Kamisaria Zanuto!
                </p>

                <div className="checkbox-termo">
                    <input
                        type="checkbox"
                        id="concordo"
                        checked={concordo}
                        onChange={(e) => {
                            setConcordo(e.target.checked);
                            if (e.target.checked) {
                                setMostrarSaibaMais(false);
                            }
                        }}
                    />
                    <label htmlFor="concordo">
                        Concordo com os termos de devolução
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Devolucao;
