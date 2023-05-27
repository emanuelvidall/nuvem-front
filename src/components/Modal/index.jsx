import React from 'react';

export default function Modal({ modalOpen, handleModalOpen }) {

    return (
        <>
            {modalOpen &&
                <div className=' absolute top-0 left-0 items-center justify-center w-screen h-screen flex flex-col z-10 backdrop-blur-md'>
                    <div className='w-[200px] h-[200px] rounded-md p-4 bg-white'>
                        <div>
                            <h1 className='font-bold text-black text-md mb-4'>Adicione a Lista 📥 <button className='absolute ml-6' onClick={handleModalOpen}>X</button></h1>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}