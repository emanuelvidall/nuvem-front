import React, { useState } from 'react';
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Modal({ modalOpen, handleModalOpen, getData }) {

    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState(0);

    const handleDescricaoChange = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z\s]*$/;
        
        if (value.length > 13) {
            toast.warn('Descrição deve ter no máximo 13 caracteres');
            e.target.value = '';
        } else if (!regex.test(value)) {
            toast.warn('Descrição deve conter apenas letras e espaços');
            e.target.value = '';
        } else {
            setDescricao(value);
        }
    };    

    const handlePrecoChange = (e) => {
        const value = e.target.value;
        if (isNaN(value)) {
            toast.warn('Preco deve ser apenas numeros');
            e.target.value = '';
        } else {
            setPreco(value);
        }
    };    

    function handleAddProduct() {
        const body = {
            descricao: descricao,
            preco: preco
        };



        fetch("http://localhost:3000/produtos/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
            .then(response => {
                if (response.ok) {
                    alert(JSON.stringify(body))
                    //   alert('Produto adicionado com sucesso!');
                    getData();
                    handleModalOpen();
                } else {
                    throw new Error('Error ao adicionar produto');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            {modalOpen &&
                <div className=' absolute top-0 left-0 items-center justify-center w-screen h-screen flex flex-col z-10 backdrop-blur-md'>
                    <div className='middleContainer w-[200px] h-[200px] rounded-md p-4 bg-white animate__animated animate__fadeInUp'>
                        <div className='flex flex-col items-center justify-center'>
                            <h1 className='font-bold text-black text-md mb-4 '>Add a Lista <span className=''>📥</span> <button className='ml-10' onClick={handleModalOpen}><FontAwesomeIcon icon={faCircleXmark} color='#fc0303' /></button></h1>
                            <input onChange={handleDescricaoChange} placeholder='descricao' className='border w-[80%] border-slate-200 rounded-md mb-2 p-1'></input>
                            <input onChange={handlePrecoChange} placeholder='preco' className='mt-2 border w-[80%] border-slate-200 rounded-md mb-2 p-1'></input>
                            <button onClick={handleAddProduct} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>ADICIONAR</button>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}