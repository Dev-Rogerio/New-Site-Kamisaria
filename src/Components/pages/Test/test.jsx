import React from 'react'
import '../Test/test.css'

const Test = ({ onColorChange }) => {
    const [mudarCor, setMudarCor] = React.useState('');
    const [items, setItems] = React.useState(true);
    const [conte, setConte] = React.useState(1);
    const [list, setList] = React.useState(['Número 1']);

    const handleButton = (event) => {
        const newColor = event.target.value;
        onColorChange(newColor);
        setMudarCor('Verde')
    };
    const handleClick = () => {
        setItems((y) => !y)
    }
    const handleSomar = () => {
        setConte((i) => {
            return conte + 1;
        })
        setList((n) => [...list, 'Number' + (conte + 1)])
    }
    const limpar = () => {
        setList([])
    }
    const zerar = () => {
        setConte(0);
        setList(['Número ' + (conte + 1)])
    }
    return (
        <>
            <div className='all'>
                <h1>Cor</h1>
                <p>Cor:{mudarCor} </p>
                <p>{list.map((list) => (
                    <li key={list}>{list}</li>
                ))}</p>
                <button onClick={handleButton} value={'Amarelo'}>Mostra cor</button>
                <button onClick={handleClick} value={'Amarelo'}>{items ? 'Ativo' : 'Desativado'}</button>
                <button onClick={handleSomar} value={'Amarelo'}>{conte}</button>
                <button onClick={limpar} value={'Amarelo'}>Limpar</button>
                <button onClick={zerar} value={'Amarelo'}>Zerar</button>
            </div>
        </>
    )
}
export default Test