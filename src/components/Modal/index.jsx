import React, { useState } from 'react';
import 'animate.css';

export default function Modal({ modalOpen, handleModalOpen, getData }) {

    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState(0);

    const handleDescricaoChange = (e) => {
        setDescricao(e.target.value)
    }

    const handlePrecoChange = (e) => {
        setPreco(e.target.value)
    }

    const body = {descricao, preco}

    function handleAddProduct() {
        const body = {
            descricao: descricao,
            preco: preco
          };
        const response = fetch("http://localhost:3000/produtos/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
            body: JSON.stringify(body),
        })
            .catch((error) => {
                console.log(error);
            });
        alert('Produto adicionado com sucesso!')
        getData();
        handleModalOpen();
    }

    return (
        <>
            {modalOpen &&
                <div className=' absolute top-0 left-0 items-center justify-center w-screen h-screen flex flex-col z-10 backdrop-blur-md'>
                    <div className='middleContainer w-[200px] h-[200px] rounded-md p-4 bg-white animate__animated animate__fadeInUp'>
                        <div className='flex flex-col items-center justify-center'>
                            <h1 className='font-bold text-black text-md mb-4'>Adicione a Lista <span className='ml-4'>📥</span> <button className='absolute ml-6' onClick={handleModalOpen}>X</button></h1>
                            <input onChange={handleDescricaoChange} placeholder='descricao' className='border w-[80%] border-slate-200 rounded-md mb-2'></input>
                            <input onChange={handlePrecoChange} placeholder='preco' className='mt-2 border w-[80%] border-slate-200 rounded-md mb-2'></input>
                            <button onClick={handleAddProduct} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>ADICIONAR</button>

                        </div>
                        <button onClick={()=> {console.log("descricao_____",JSON.stringify(body))}}>testeeeeeee</button>
                    </div>
                </div>
            }
        </>
    )
}