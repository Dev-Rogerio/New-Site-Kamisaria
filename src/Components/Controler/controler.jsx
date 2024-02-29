import React, { useState } from 'react'

import "../Controler/controler.css";
import Sales from '../Pages/Sales/sales';

const Controler = ({ vl, setVl }) => {
    const [valor, setValor] = useState('');

    return (
        <React.Fragment>
            <div className="painel">
                <h1> Cadastro de Produto</h1>
                <div className="containerControler">
                    <div className="divDescription">
                        <label className='labelProd' htmlFor="">Descrição do Produto</label>
                        <select className='selectProd' name="" id="">
                            <option value="">Camisa Masculina Manga Longa Branca</option>
                            <option value="">Camisa Masculina Manga Longa Azul</option>
                            <option value="">Camisa Masculina Manga Longa Rosa</option>
                            <option value="">Camisa Masculina Manga Longa Cinza</option>
                        </select>
                    </div>
                    <div className="divQuantities">
                        <label htmlFor="" className="labelQuantities">Quantidade</label>
                        <input className='inputQuantities' name="fnome" type="text"
                        />
                    </div>
                    <div className="divValue">
                        <label htmlFor="" className="labelProd">Valor do Produto</label>

                        <input type="text" className="inputProd" value={valor} onChange={(e) => setValor(e.target.value)} />

                    </div>
                </div>

                <button className='cadastro'>Cadastrar</button>
                {valor}

            </div>

        </React.Fragment >
    )
}
export default Controler