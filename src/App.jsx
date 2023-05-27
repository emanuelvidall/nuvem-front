import React, { useState, useEffect } from 'react';
import Lista from './components/Lista/index.jsx';
import Modal from './components/Modal/index.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {

  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  async function handleDelete(id) {
    const response = await fetch(`http://localhost:3000/produtos/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    alert(id, 'item deleted!')
    setLista((prevLista) => prevLista.filter((item) => item.id !== id));
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

  useEffect(() => {
    getData()
    if (modalOpen) {
      handleModalOpen();
    }
  }, [])

  return (
    <>
      <Modal modalOpen={modalOpen} handleModalOpen={handleModalOpen} getData={getData} />
      <div className='bg-slate-500 h-screen w-screen items-center justify-center flex flex-col'>
        <h1 className='font-bold text-white text-3xl mb-4'>Lista App v1.0 🚀 <button className='ml-56' onClick={handleModalOpen}><FontAwesomeIcon icon={faSquarePlus} color='#66fc03' /></button></h1>
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
            <Lista loading={loading} handleDelete={(id) => handleDelete(id)} lista={lista} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
