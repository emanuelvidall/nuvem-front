import React, { useState } from 'react';
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export default function ModalEdit({ modalEditOpen, handleModalEditOpen, id,  handleEditProduct }) {

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

    return (
        <>
            {modalEditOpen &&
                <div className=' absolute top-0 left-0 items-center justify-center w-screen h-screen flex flex-col z-10 backdrop-blur-md'>
                    <div className='middleContainer w-[200px] h-[300px] rounded-md p-4 bg-neutral-100 drop-shadow-xl animate__animated animate__fadeInUp'>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='w-full flex flex-row mb-2'><button className='self-end ml-auto' onClick={handleModalEditOpen}><FontAwesomeIcon icon={faCircleXmark} color='#fc0303' size='xl' /></button></div>
                            <h1 className='font-bold text-black text-md mb-4 w-full flex flex-col items-center justify-center'>Editar Produto 📝 <span className='text-3xl'></span> </h1>
                            <input onChange={handleDescricaoChange} placeholder='Descricao' className='border w-[80%] border-slate-200 rounded-md mb-2 p-1'></input>
                            <input onChange={handlePrecoChange} placeholder='Preco R$' className='mt-2 border w-[80%] border-slate-200 rounded-md mb-2 p-1'></input>
                            <button onClick={()=> {console.log('coisas:__', id, descricao, preco)}} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>SALVAR</button>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}