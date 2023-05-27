import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';

export default function List({ loading, lista, handleDelete }) {

    return (
        <>
            {loading ? (
                <h1>Carregando dados...</h1>
            ) : (<div>
                {lista.map((item, index) => {
                    return (
                        <div key={item.id} className="bg-blue-200 w-[390px] flex flex-row justify-between h-[50px] ml-px rounded-md items-center mb-4 mt-4 animate__animated animate__fadeInUp">
                            <p className="mr-12 ml-2 font-bold">{item.id}</p>
                            <div className='text-left justify-left align-left w-[150px] absolute left-10'><p>{item.descricao}</p></div>
                            <p className='text-right absolute right-10'>R$ {item.preco.toFixed(2)}</p>
                            <button className='mr-2' onClick={() => handleDelete(item.id)}><FontAwesomeIcon icon={faCircleXmark} color='#fc0303' /></button>
                        </div>
                    )
                })}
            </div>)}
        </>
    )
}