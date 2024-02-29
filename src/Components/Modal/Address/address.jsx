import React, { useState } from 'react'

import "../Address/address.css";
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';

const Address = ({ ativo, setAtivo }) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    // ==============================================================================
    function preencherCampos(apiViacep) {
        // console.log(endereco);
        const end = document.querySelector(".inputEndereco");
        const bairro = document.querySelector(".inputBairro");
        const cid = document.querySelector(".inputCidade");
        const est = document.querySelector(".inputEstado");
        end.value = apiViacep.logradouro;
        bairro.value = apiViacep.bairro;
        cid.value = apiViacep.localidade;
        est.value = apiViacep.uf;
        var num = document.querySelector(".inputFormname");
        num.focus();
    }
    // ==========================================================================

    function mcep(v) {
        var cepElement = window.document.querySelector(".inputCep");

        if (cepElement) {
            var r = v.replace(/\D/g, "");
            r = r.replace(/^0/, "0");

            if (r.length > 7) {
                r = r.replace(/^(\d{5})(\d{3}).*/, "$1-$2");

                const url = `https://viacep.com.br/ws/${r.replace("-", "")}/json`;
                fetch(url).then((resposta) => {
                    resposta.json().then((apiViacep) => {
                        preencherCampos(apiViacep);
                    });
                });
            }

        }
    }

    // function mcep(v) {
    //     // var res = window.document.querySelector(".res_cli");
    //     var cep = window.document.querySelector(".inputCep");
    //     var r = v.replace(/\D/g, "");
    //     r = r.replace(/^0/, "0");
    //     // res.innerHTML = "";
    //     if (r.length > 7) {
    //         r = r.replace(/^(\d{5})(\d{3}).*/, "$1-$2");

    //         const url = `https://viacep.com.br/ws/${r.replace("-", "")}/json`;
    //         fetch(url).then((resposta) => {
    //             resposta.json().then((apiViacep) => {
    //                 preencherCampos(apiViacep);
    //             });
    //         });
    //     }
    // }
    function mask3(target, calback) {
        setTimeout(() => {
            var v = calback(target.value);
            if (v != target.value) {
                target.value = v;
            }
        }, 0);
    }
    //   ==========================================================================================================
    return (
        <>
            <div className="formularioModal">
                <div className="containerModal">
                    <div className="dados">
                        <p className='pEndereco'>Cadastrar endereço</p>
                        <div className='dadosName'>
                            <label className='labelFormname' htmlFor="">Nome completo</label>
                            <input className='inputFormname' type="text" placeholder='Nome completo:' />
                            <p className='pFormname'>Como aparecem no seu RG ou CNH.</p>
                        </div>
                        <div className="dadosCep">
                            <label className='labelCep' htmlFor="">CEP</label>
                            <input className='inputCep' type="text" placeholder='99999-99' onBlur={(e) => mask3(e.target, mcep)} />
                        </div>
                        <div className="dadosEstado">
                            <div className="divEstado">
                                <label className='labelEstado' htmlFor="">Estado</label>
                                <input className='inputEstado' placeholder='Estado' type="text" />
                            </div>

                            <div className="divCidade">
                                <label className='labelCidade' htmlFor="">Cidade</label>
                                <input className="inputCidade" placeholder='Cidade' type="text" />
                            </div>
                        </div>
                        <div className="dadosBairro">
                            <label htmlFor="" className="labelBairro">Bairro</label>
                            <input className="inputBairro" placeholder='Bairro'></input>
                        </div>
                        <div className="dadosEndereco">
                            <div className="divEndereco">
                                <label className="labelEndereco">Endereço</label>
                                <input className="inputEndereco" placeholder="Endereço"></input>
                            </div>
                            <div className="dadosNumero">
                                <label className="labelNumero">Numero</label>
                                <input className="inputNumero" placeholder='Nº' type='text'>
                                </input>
                            </div>
                        </div>
                        <div>
                            <div className="dadosOpcional">
                                <label className='labelOpcional'>Complemento (opcional)</label>
                                <input className='inputOpcional' placeholder='Complemento' type="text" />
                            </div>
                        </div>
                        <div className="dadosLocal">
                            <label>Este é o seu trabalho ou sua casa? </label>
                            <div className="divWork">
                                <input className='inputRadio rt' type="radio" name='Reidencial' />
                                <img src="" alt="" /><WorkIcon /><label htmlFor="">Trabalho</label>
                                <input className='inputRadio rr, radioRes' type="radio" name='Reidencial' checked={isChecked}
                                    onChange={handleCheckboxChange} />
                                <img src="" alt="" />  <HomeIcon /><label htmlFor="">Residencia</label>
                            </div>
                        </div>
                        <div className="dadosPhone">
                            <label className='labelPhone' htmlFor="">Telefone de contato</label>
                            <input className='inputPhone' placeholder='55 (xx) 99999-9999' type="text" />
                        </div>
                        <div className="dadosAdicionais">
                            <label className='labelAdicional' htmlFor="">Informações adicionais deste endereço (opcional)</label>
                            <input className='inputAdicional' placeholder='Informações' type="text" />
                            <div className="divButton">
                                <button>Continuar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Address;


