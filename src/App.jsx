import React, { useState, useEffect } from 'react';
import Lista from './components/Lista/index.jsx';
import Modal from './components/Modal/index.jsx';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';


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
    toast.success('Item deletado!');
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
            <Lista loading={loading} handleDelete={(id) => handleDelete(id)} lista={lista} />
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
