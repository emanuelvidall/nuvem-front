import React, { useState, useEffect } from 'react';
import Lista from './components/Lista/index.jsx';
import Modal from './components/Modal/index.jsx';
import ModalEdit from './components/ModalEdit/index.jsx';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

function App() {

  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState(null);

  async function handleDelete(id) {
    const response = await fetch(`http://localhost:3000/produtos/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    Swal.fire({
      title: 'Produto Deletado!',
      icon: 'warning',
      confirmButtonText: 'Cool'
    })
    setLista((prevLista) => prevLista.filter((item) => item.id !== id));
  }

  async function handleEditProduct() {
    const body = {
      descricao: descricao,
      preco: preco
    };

    try {
      const response = await fetch(`http://localhost:3000/produtos/edit/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Produto Editado!',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        getData();
        handleModalEditOpen();
      } else {
        throw new Error('Erro ao adicionar produto');
      }
    } catch (error) {
      console.log(error);
    }
  }


  async function getData() {
    const response = await fetch("http://localhost:3000/produtos");
    const data = await response.json();
    console.log('incoming data:', data);
    setLista(data)
    setLoading(false)
  }

  async function handleModalOpen() {
    setModalOpen(!modalOpen);
  }

  async function handleModalEditOpen() {
    setModalEditOpen(!modalEditOpen);
  }

  const handleItemIdChange = (newItemId) => {
    setItemId(newItemId);
  };

  const handleItemDescricaoChange = (newItemDescricao) => {
    setDescricao(newItemDescricao);
  };

  const handleItemPrecoChange = (newItemPreco) => {
    setPreco(newItemPreco);
  };

  useEffect(() => {
    setItemId(null);
    setDescricao('');
    setPreco(null);
    getData();
    if (modalOpen) {
      handleModalOpen();
    }
  }, [])

  return (
    <>
      <ModalEdit modalEditOpen={modalEditOpen} handleModalEditOpen={handleModalEditOpen} getData={getData} id={itemId} handleEditProduct={handleEditProduct} descricao={descricao} preco={preco} onItemDescricaoChange={handleItemDescricaoChange} onItemPrecoChange={handleItemPrecoChange} />
      <Modal modalOpen={modalOpen} handleModalOpen={handleModalOpen} getData={getData} />
      <div className='bg-slate-500 h-screen w-screen items-center justify-center flex flex-col'>
        <h1 className='font-bold text-white text-3xl mb-4 w-[600px] justify-between flex flex-row'>Lista App v1.0 🚀 <button className='' onClick={handleModalOpen}><img className='w-[50px] h-[50px] hover:scale-110 transition ease-in-out delay-150' src='./add.png' alt='addIcon'></img></button></h1>
        <div className='bg-white w-[600px] h-4/6 rounded-md border border-slate-100 drop-shadow-md flex flex-col items-center'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center font-bold text-2xl mb-2'>Estoque</h1>
          </div>
          <div className='flex flex-row w-[400px] justify-between px-2 font-bold text-xl'>
            <p>ID</p>
            <p className='ml-8'>Descricao</p>
            <p>Preco</p>
          </div>
          <div className='mt-4 w-5/6 h-5/6 flex flex-col overflow-y-scroll overflow-x-hidden items-center'>
            <Lista loading={loading} handleDelete={(id) => handleDelete(id)} lista={lista} getData={getData} modalEditOpen={modalEditOpen} handleModalEditOpen={handleModalEditOpen} onItemIdChange={handleItemIdChange} onItemDescricaoChange={handleItemDescricaoChange} onItemPrecoChange={handleItemPrecoChange} />
          </div>
        </div>
        <div className='text-white flex flex-row items-center mt-2 mb-2 justify-evenly w-[600px]'>
          <a href='https://github.com/emanuelvidall' target='_blank'><h1>Emanuel Vidal</h1></a>
          <a href='https://github.com/Fcsla' target='_blank'><h1>Fernando Custodio</h1></a>
          <a href='https://github.com/rafaelsaboiad' target='_blank'><h1>Rafael Saboia</h1></a>
        </div>
        <a href='https://unifor.br' target='_blank'><h1 className='text-white'>UNIFOR 2023</h1></a>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
