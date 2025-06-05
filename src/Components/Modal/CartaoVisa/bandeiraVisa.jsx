import React from "react";
import "./BandeiraVisa.css";
// import Visa from "../../Img/visa.png";

const BandeiraVisa = ({ cardNumber, nomeCartao, expiry }) => {
    return (
        <div className="cartao-visual">
            <div className="cartao-frente">
                <div className="numero-cartao">
                    {cardNumber || "0000 0000 0000 0000"}
                </div>
                <div className="logoBandeiraVisa">
                    <img src={"Visa"} alt="Visa" />
                </div>
                <div className="nome-e-validade">
                    <span>{nomeCartao || "NOME NO CARTÃO"}</span>
                    <span>{expiry || "MM/AA"}</span>
                </div>
            </div>
        </div>
    );
};

export default BandeiraVisa;
