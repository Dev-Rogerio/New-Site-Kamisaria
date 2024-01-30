import React, { useState } from "react";

function Custom({ ativo, setAtivo }) {
    return (
        <divFragment>
            {ativo ? (
                <section id="modal-tailor">
                    <div className="modal-titlle">
                        <h2>Personalizada</h2>
                        <button
                            id="close-tailor"
                            className="button-tailor"
                            onClick={() => setAtivo(false)}
                        >
                            X
                        </button>
                    </div>
                    <section className="modal-tailor-boby">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Impedit, officia voluptates. Itaque, quae. Ab
                            harum sunt assumenda, dolore qui quae voluptatum
                            nulla facilis earum atque, explicabo in ad rerum
                            itaque.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Impedit, officia voluptates. Itaque, quae. Ab
                            harum sunt assumenda, dolore qui quae voluptatum
                            nulla facilis earum atque, explicabo in ad rerum
                            itaque.
                        </p>
                    </section>
                </section>
            ) : null}
        </divFragment>
    );
}
export default Custom;
