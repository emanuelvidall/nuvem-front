import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function List({ loading, lista, handleDelete }) {

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
                        <div key={item.id} className="bg-white border border-slate-200 w-[390px] flex flex-row justify-between h-[50px] ml-px rounded-md items-center mb-4 mt-4 animate__animated animate__fadeInUp cursor-pointer hover:drop-shadow-md transition ease-in-out delay-150">
                            <p className="mr-12 ml-2 font-bold">{item.id}</p>
                            <div className='text-left justify-left align-left w-[150px] absolute left-10'><p>{capitalizeFirstLetter(item.descricao)}</p></div>
                            <p className='text-right absolute right-10'>R$ {item.preco.toFixed(2)}</p>
                            <button className='mr-2' onClick={() => handleDelete(item.id)}><img className='w-[25px] h-[25px] hover:scale-110 transition ease-in-out delay-150' src='./delete.png' alt='addIcon'></img></button>
                        </div>
                    )
                })}
            </div>)}
        </>
    )
}