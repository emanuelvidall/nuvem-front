import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function List({ loading, lista, handleDelete, modalEditOpen, handleModalEditOpen, handleEditProduct }) {

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            {loading ? (
                <h1>Carregando dados...</h1>
            ) : (<div>
                {lista.map((item, index) => {
                    return (
                        <div key={item.id} className="bg-white border border-slate-200 w-[390px] flex flex-row justify-between h-[50px] ml-px rounded-md items-center mb-4 mt-4 animate__animated animate__fadeInUp cursor-pointer hover:bg-blue-100">
                            <p className="mr-12 ml-2 font-bold">{item.id}</p>
                            <div className='text-left justify-left align-left w-[150px] absolute left-10'><p>{capitalizeFirstLetter(item.descricao)}</p></div>
                            <p className='text-right absolute right-20'>R$ {item.preco.toFixed(2)}</p>
                            <div className=''>
                                <button className='mr-2 hover:scale-110' onClick={() => handleModalEditOpen(item.id)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                <button className='mr-2 hover:scale-110' onClick={() => handleDelete(item.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                            </div>
                        </div>
                    )
                })}
            </div>)}
        </>
    )
}