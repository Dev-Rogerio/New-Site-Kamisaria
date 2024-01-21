import React, { useEffect } from "react";

import "./style.css";
// import { click } from "@testing-library/user-event/dist/click";

function Sewing() {
        useEffect(() => {
        const openModalButton = document.querySelector("#open-modal");
        const closeModalButton = document.querySelector("#close-modal");
        const modal = document.querySelector("#modal");
        const window = document.querySelector("#window");

        const toggleModal = () => {
            [modal, window].forEach((el) => el.classList.toggle("hide"));
        };

        [openModalButton, closeModalButton, window].forEach((el) => {
            el.addEventListener("click", toggleModal);
        });

        return () => {
            // Remover os event listeners quando o componente for desmontado
            [openModalButton, closeModalButton, window].forEach((el) => {
                el.removeEventListener("click", toggleModal);
            });
        };
    }, []);

    // function Sewing() {
    //     // useEffect(() => {
    //         const openModalButton = document.querySelector("#open-modal");
    //         const closeModalButton = document.querySelector("#close-modal");
    //         const modal = document.querySelector("#modal");
    //         const window = document.querySelector("#window");

    //         const toggleModal = () => {
    //             [modal, window].forEach((el) => el.classList.toggle("hide"));
    //         };
    //         [openModalButton, closeModalButton, window].forEach((el) => {
    //             el.addEventListener('click', toggleModal);
    //         });

    // const tudo = [openModalButton, closeModalButton, window]
    //     function ativo (e) {
    //         console.log(e.currentTarget)
    //         alert("Obrigado")
    //     }
    //     tudo.forEach((i) => {
    //         i.addEventListener('click',() ativo())
    //     })
    // }, []);

    return (
        <body>
            <h1>JavaScript Modal</h1>
            <button className="button" id="open-modal">Abrir</button>
            
            <div id="window" className="hide"></div>
            <div id="modal" className="hide">
                <div className="modal-header">
                    <h2>Este é o modal</h2>
                    <button className="button" id="close-modal">Fechar</button>
                </div>
                <div className="modal-boby">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Exercitationem facere libero, ipsum corrupti odit unde
                        reprehenderit nulla cumque earum similique! Dolores
                        totam laudantium itaque omnis incidunt rerum ducimus,
                        minima quaerat?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Exercitationem facere libero, ipsum corrupti odit unde
                        reprehenderit nulla cumque earum similique! Dolores
                        totam laudantium itaque omnis incidunt rerum ducimus,
                        minima quaerat?
                    </p>
                </div>
            </div>
        </body>
    );
}
export default Sewing;
