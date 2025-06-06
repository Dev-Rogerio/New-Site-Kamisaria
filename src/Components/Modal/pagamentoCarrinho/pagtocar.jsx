import React, { useState } from "react";
import "./pagtocar.css";

export default function ModalPagamentoCarrinho({ onClose }) {
    return (
        <div className="modal-pagamento-overlay">
            <div className="modal-pagamento-content">
                <h2>Pagamento</h2>
                <p>Formulário de pagamento aqui (ex: cartão, Pix, etc)</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
}
