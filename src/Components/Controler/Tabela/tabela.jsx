import React, { useEffect, useState, useRef } from 'react'
import '../Tabela/tabela.css'

const Tabela = ({ marca, onDelete, onEdit }) => {
    const isDeleted = marca.deleted || false;
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescricao, setEditedDescricao] = useState(marca.descricao);
    const inputRef = useRef(null)

    const handleEdit = () => {
        setIsEditing(true);
    }
    const handleSave = () => {
        setIsEditing(false);
        onEdit('descricao', editedDescricao);
    }
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedDescricao(marca.descricao);
    }
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(editedDescricao.length, editedDescricao.length);
        }
    }, [isEditing, editedDescricao])

    console.log(marca)
    return (
        <tr style={{ color: marca.color }}>
            <td>{marca.id + 1}</td>
            <td>{marca.data}</td>
            <td style={{ textDecoration: isDeleted ? 'line-through' : 'none' }}>
                {isEditing ? (
                    <input
                        ref={inputRef}
                        className='edit'
                        type='text'
                        value={editedDescricao}
                        onChange={(e) => setEditedDescricao(e.target.value)} style={{ width: '100%' }} />
                ) : (<span style={{ textDecoration: marca.deleted ? 'line-through' : 'none', backgroundColor: 'transparent' }}> {marca.descricao}
                </span>
                )}
            </td>
            <td>{marca.quantidade}</td>
            <td>{marca.valor}</td>
            <td>{marca.acoes}
                <div className="button">
                    {isEditing ? (
                        <>
                            <button>Salvar</button>
                            <button onClick={handleCancelEdit}>Cancelar</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => isEditing ? 'salvar' : 'Editar'}>Editar</button>
                            <button onClick={onDelete}>Deletar</button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    )
}
export default Tabela