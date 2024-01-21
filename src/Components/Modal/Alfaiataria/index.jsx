import React, { useState } from "react";

import "../Alfaiataria/style.css";

function Alfaiataria() {
    const [hide, setHide] = useState("");
    const toggleModal = () => {
        console.log("test");
        if (hide) {
            setHide("");
        } else {
            setHide("hide");
        }
    };
    return (
        <div>
            <h1>JavaScript Modal</h1>
            <button className="button" id="open-modal" onClick={toggleModal}>
                Abrir
            </button>
            <div id="window-tailore" className={hide}></div>
            <section id="modal-tailor" className={hide}>
                <div className="modal-titlle">
                    <h2>Alfaiatária</h2>
                    <button
                        id="close-tailor"
                        className="button-tailor"
                        onClick={toggleModal}
                    >
                        X
                    </button>
                </div>
                <section className="modal-tailor-boby">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Impedit, officia voluptates. Itaque, quae. Ab harum sunt
                        assumenda, dolore qui quae voluptatum nulla facilis
                        earum atque, explicabo in ad rerum itaque.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Impedit, officia voluptates. Itaque, quae. Ab harum sunt
                        assumenda, dolore qui quae voluptatum nulla facilis
                        earum atque, explicabo in ad rerum itaque.
                    </p>
                </section>
            </section>
        </div>
    );
}
export default Alfaiataria;
