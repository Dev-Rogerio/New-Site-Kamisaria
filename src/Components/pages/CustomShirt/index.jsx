import React from "react";

function CustomShirt() {

    const produtos = [
        { cor: "Amarelo", qtde: "1" },
        { cor: "Branca", qtde: "2" },
        { cor: "Azul", qtde: "3" },
        { cor: "Preta", qtde: "4" }
    ];

    return (
        <React.Fragment>
            <h1></h1>

            <ul>
                {produtos.map(({ cor, qtde }) => (
                    <li key={cor}>{cor} , {qtde}</li>
                ))}
            </ul>

        </React.Fragment>
    )
}
export default CustomShirt;