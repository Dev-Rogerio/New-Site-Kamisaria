import React, { useState, useEffect, useRef } from "react";

import "../Address/address.css";
import Order from "../Order/order";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import InputMask from "react-input-mask";

const Address = ({ ativo, setAtivo, limpar }) => {
    const [orderData, setOrderData] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [hideAddress, setHideAddress] = useState(false);
    const [nome, setNome] = useState("");
    const [numero, setNumero] = useState("");
    const [endereco, setEndereco] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [telefone, setTelefone] = useState("");
    const [local, setLocal] = useState("Trabalho");
    const [observacao, setObservacao] = useState("");
    const [cep, setCep] = useState("");
    const [nomeError, setNomeError] = useState("");
    const [numeroError, setNumeroError] = useState("");
    const [cepError, setCepError] = useState("");
    const [telefoneError, setTelefoneError] = useState("");
    // const [cepValid, setCepValid] = useState(true);
    const inputNomeRef = useRef(null);
    const inputNumeroRef = useRef(null);
    const inputCepRef = useRef(null);
    const inputTelefoneRef = useRef(null);
    const [showSize, setShowSize] = useState("");

    // const validarTelefone = (telefone) => {
    //     const regexTelefone = /\(\d{2}\) \d{5}-\d{4}/;
    //     return regexTelefone.test(telefone);
    // };
    const handleTelefoneChange = (event) => {
        setTelefoneError("");
        let novoTelefone = event.target.value;
        // Remove todos os caracteres que não são números
        novoTelefone = novoTelefone.replace(/\D/g, "");
        // Verifica se o novo telefone tem no máximo 11 dígitos
        if (novoTelefone.length <= 11) {
            // Aplica a formatação do telefone (xx) xxxxx-xxxx
            novoTelefone = novoTelefone.replace(
                /^(\d{2})(\d{5})(\d{4}).*/,
                "($1) $2-$3"
            );
            // Atualiza o estado do telefone
            setTelefone(novoTelefone);
        }
    };
    useEffect(() => {
        inputNomeRef.current.focus();
    }, []);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const handleNomeChange = (event) => {
        setNome(event.target.value);
        setNomeError("");
    };

    const handleRadioChange = (event) => {
        setLocal(event.target.value);
    };

    function preencherCampos(apiViacep) {
        setCep(apiViacep.cep || "");
        setEndereco(apiViacep.logradouro || "");
        setBairro(apiViacep.bairro || "");
        setCidade(apiViacep.localidade || "");
        setEstado(apiViacep.uf || "");
        inputNumeroRef.current.focus();
    }
    const mcep = (v) => {
        var r = v.replace(/\D/g, "");
        r = r.replace(/^0/, "0");
        console.log("Valor do CEP formatado:", r);
        if (r.length >= 8) {
            r = r.replace(/^(\d{5})(\d{3}).*/, "$1-$2");
            const url = `https://viacep.com.br/ws/${r.replace("-", "")}/json`;
            fetch(url)
                .then((resposta) => resposta.json())
                .then((apiViacep) => {
                    setCep(apiViacep.cep || "");
                    preencherCampos(apiViacep);
                });
        }
    };
    function mask3(target, calback) {
        setTimeout(() => {
            var v = calback(target.value);
            if (v !== target.value || !cep) {
                target.value = v;
            }
        }, 0);
    }

    const handleCepChange = (event) => {
        setCep(event.target.value);
        if (cepError) setCepError("");
    };

    const handleBlurCep = () => {
        if (!cep.trim()) {
            setCepError("Favor, preencher o campo.");
            inputCepRef.current.focus();
        } else if (cep.length !== 9) {
            setCepError("CEP inválido, por favor, verifique.");
            inputCepRef.current.focus();
        } else {
            setCepError(""); // Limpa erro se o CEP for válido
            inputNumeroRef.current.focus();
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrderData((prevdata) => ({
            ...prevdata,
            [name]: value, // Aqui você usa 'name' como chave
        }));
        if (name === "nome") {
            setNome(value);
            setNomeError("");
        } else if (name === "numero") {
            setNumero(value);
            setNumeroError("");
        } else if (name === "endereco") {
            setEndereco(value);
        } else if (name === "complemento") {
            setComplemento(value);
        } else if (name === "bairro") {
            setBairro(value);
        } else if (name === "telefone") {
            setTelefone(value);
            setTelefoneError("");
        } else if (name === "estado") {
            setEstado(value);
        } else if (name === "local") {
            setLocal(value);
        } else if (name === "cidade") {
            setCidade(value);
        } else if (name === "observacao") {
            setObservacao(value);
        }
    };

    const handleContinue = () => {
        if (!nome.trim()) {
            setNomeError("Por favor, preencha este campo.");
            inputNomeRef.current.focus();
            return;
        }

        if (!cep.trim()) {
            setCepError("Favor, preencher o campo");
            inputCepRef.current.focus();
            return;
        }

        if (!numero.trim()) {
            setNumeroError("Por favor, preencha este campo");
            inputNumeroRef.current.focus();
            return;
        }

        const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (!telefone.trim()) {
            setTelefoneError("Por favor, preencha o telefone.");
            inputTelefoneRef.current.focus();
            return;
        } else if (!regexTelefone.test(telefone)) {
            setTelefoneError("Formato inválido. Use: (99) 99999-9999");
            inputTelefoneRef.current.focus();
            return;
        }

        // Limpa os erros ao passar nas validações
        setNomeError("");
        setCepError("");
        setNumeroError("");
        setTelefoneError("");
        setShowModal(true);
        setHideAddress(true);
    };

    return (
        <>
            <div className="address-and-order">
                <div
                    className={`formularioModal  ${
                        hideAddress ? "address-hidden" : ""
                    }`}
                >
                    <div className="containerModal">
                        <div className="dados">
                            <p className="pEndereco">Dados para cadastro.</p>
                            <div className="dadosName res">
                                <label className="labelFormname" htmlFor="">
                                    Nome completo
                                </label>
                                <input
                                    ref={inputNomeRef}
                                    className="inputFormname"
                                    type="text"
                                    placeholder="Nome completo:"
                                    value={nome}
                                    name="nome"
                                    required
                                    onChange={handleChange}
                                />
                                <p className="pFormname">
                                    Como aparecem no seu RG ou CNH.
                                </p>
                                <p>{nomeError}</p>
                            </div>
                            <div className="dadosCep">
                                <label className="labelCep" htmlFor="">
                                    CEP
                                </label>
                                <InputMask
                                    mask="99999-999"
                                    className="inputCep"
                                    type="text"
                                    required
                                    placeholder="99999-99"
                                    onChange={(e) => {
                                        mcep(e.target.value);
                                        handleCepChange(e);
                                    }}
                                    onBlur={handleBlurCep}
                                >
                                    {(inputProps) => (
                                        <input
                                            {...inputProps}
                                            ref={inputCepRef}
                                        />
                                    )}
                                </InputMask>
                                {cepError && (
                                    <p
                                        style={{
                                            color: "red",
                                            fontSize: "12px",
                                            marginTop: "5px",
                                        }}
                                    >
                                        {cepError}
                                    </p>
                                )}
                            </div>

                            <div className="dadosEstado">
                                <div className="divEstado">
                                    <label className="labelEstado" htmlFor="">
                                        Estado
                                    </label>
                                    <input
                                        className="inputEstado"
                                        placeholder="Estado"
                                        value={estado}
                                        nome="estado"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="divCidade">
                                    <label className="labelCidade" htmlFor="">
                                        Cidade
                                    </label>
                                    <input
                                        className="inputCidade"
                                        placeholder="Cidade"
                                        value={cidade}
                                        nome="cidade"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="dadosBairro">
                                <label htmlFor="" className="labelBairro">
                                    Bairro
                                </label>
                                <input
                                    className="inputBairro"
                                    placeholder="Bairro"
                                    type="text"
                                    name="bairro"
                                    value={bairro}
                                    onChange={handleChange}
                                ></input>
                            </div>
                            <div className="dadosEndereco">
                                <div className="divEndereco">
                                    <label className="labelEndereco">
                                        Endereço
                                    </label>
                                    <input
                                        className="inputEndereco"
                                        placeholder="Endereço"
                                        type="text"
                                        name="endereco"
                                        value={endereco}
                                        onChange={handleChange}
                                    ></input>
                                </div>
                                <div className="dadosNumero">
                                    <label className="labelNumero">
                                        Numero
                                    </label>
                                    <input
                                        ref={inputNumeroRef}
                                        className="inputNumero"
                                        placeholder="Nº"
                                        type="text"
                                        name="numero"
                                        required
                                        title="campo obrigatório"
                                        value={numero}
                                        onChange={handleChange}
                                    ></input>
                                    {numeroError && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {numeroError}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="dadosOpcional">
                                    <label className="labelOpcional">
                                        Complemento (opcional)
                                    </label>
                                    <input
                                        className="inputOpcional"
                                        placeholder="Complemento"
                                        type="text"
                                        value={complemento}
                                        name="complemento"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="dadosLocal">
                                <label>
                                    Este é o seu trabalho ou sua casa?{" "}
                                </label>
                                <div className="divWork">
                                    <input
                                        className="inputRadio rt"
                                        type="radio"
                                        name="local"
                                        value="Trabalho"
                                        checked={local === "Trabalho"}
                                        onChange={handleRadioChange}
                                    />
                                    <img src="" alt="" />
                                    <WorkIcon />
                                    <label htmlFor="">Trabalho</label>
                                    <input
                                        className="inputRadio rr, radioRes"
                                        type="radio"
                                        name="local"
                                        value="Residencia"
                                        checked={local === "Residencia"}
                                        onChange={handleRadioChange}
                                    />
                                    <img src="" alt="" /> <HomeIcon />
                                    <label htmlFor="">Residencia</label>
                                </div>
                            </div>
                            <div className="dadosPhone">
                                <label className="labelPhone" htmlFor="">
                                    Telefone de contato
                                </label>
                                <input
                                    ref={inputTelefoneRef}
                                    className="inputPhone"
                                    placeholder="(xx) 99999-9999"
                                    type="text"
                                    name="telefone"
                                    value={telefone}
                                    onChange={handleTelefoneChange}
                                />
                                {telefoneError && (
                                    <p
                                        style={{
                                            color: "red",
                                            fontSize: "12px",
                                        }}
                                    >
                                        {telefoneError}
                                    </p>
                                )}
                            </div>
                            <div className="dadosAdicionais">
                                <label className="labelAdicional" htmlFor="">
                                    Informações adicionais deste endereço
                                    (opcional)
                                </label>
                                <input
                                    className="inputAdicional"
                                    placeholder="Informações"
                                    type="text"
                                    name="observacao"
                                    value={observacao}
                                    onChange={(e) =>
                                        setObservacao(e.target.value)
                                    }
                                />
                                <div className="divButton">
                                    <button onClick={handleContinue}>
                                        Continuar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showModal && (
                    <Order
                        nome={nome}
                        cep={cep}
                        estado={estado}
                        cidade={cidade}
                        bairro={bairro}
                        endereco={endereco}
                        numero={numero}
                        complemento={complemento}
                        observacao={observacao}
                        telefone={telefone}
                        local={local}
                        setShowModal={setShowModal}
                        setHideAddress={setHideAddress}
                        orderData={orderData}
                        ativado={showModal}
                        setAtivado={setShowModal}
                    />
                )}
            </div>
        </>
    );
};
export default Address;
