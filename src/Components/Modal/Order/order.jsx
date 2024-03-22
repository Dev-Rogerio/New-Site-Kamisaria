import React from 'react'
import '../Order/order.css'
import Sales from '../../Pages/Sales/sales'

const Order = ({
    formataData,
    setShowModal,
    setHideAddress,
    setAtivado,
    nome,
    estado,
    cidade,
    bairro,
    endereco,
    numero,
    complemento,
    observacao,
    telefone,
    local,
    tamanho,
}) => {
    const handleConfirm = () => {
        setAtivado(false)
    }
    const capitalize = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    const [updateData, setUpdateData] = React.useState({
        descricao: 'Camisa Social T40 MLon Social Slin Importado 100% Alg',
        modelo: 'Social',
        tipo: 'Algodão',
        tamanho: tamanho,
        valor: '890,00',
        nome: nome,
        estado: estado,
        cidade: cidade,
        bairro: bairro,
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        observacao: observacao,
        telefone: telefone,
        cartao: 'Visa',
        banco: 'Safra',
        agencia: '123-9',
        contacorrente: '123123123-3',
        local: local,
    })
    console.log("Observação no Address (antes de passar para Order):", observacao);
    return (
        <div className='order'>
            <div className="orderPage">
                <div className="dadosCompras">
                    <p>Descrição: {updateData.descricao}</p>
                    <p>Modelo: {updateData.modelo}</p>
                    <p>Tipo: {updateData.tipo}</p>
                    <sale />
                    <p>Cor:   </p>
                    <p>Tamanho: {updateData.tamanho}</p>
                    <p>Valor: {updateData.valor}</p>
                    <div className="stripe"></div>
                    <p>Nome: {capitalize(nome)}</p>
                    <p>Endereço: {capitalize(endereco)}</p>
                    <p>Número: {updateData.numero}</p>
                    <p>Complemento: {capitalize(complemento)}</p>
                    <p>Bairro: {capitalize(bairro)}</p>
                    <p>Cidade: {capitalize(cidade)}</p>
                    <p>Estado: {capitalize(estado)}</p>
                    <p>Telefone: {updateData.telefone}</p>
                    <p>Receber: {updateData.local}</p>
                    <p>Observacao: {capitalize(observacao)}</p>
                    <div className="stripe"></div>
                    <p>Cartão: {updateData.cartao}</p>
                    <p>Banco: {updateData.banco}</p>
                    <p>Agência: {updateData.agencia}</p>
                    <p>Conta corrente: {updateData.contacorrente}</p>
                    <button className='buttonConfirmar' onClick={handleConfirm}>Terminar</button>
                </div>
            </div>
        </div>
    )
}
export default Order