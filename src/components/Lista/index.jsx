import React from  'react';

export default function List({loading, lista, handleDelete}) {

    return (        
        <>
            <div className="flex flex-col bg-green-500 items-center align-center justify-center w-full">
                {loading ? ( 
                    <h1>Carregando dados...</h1>
                ):(<div>
                    {lista.map((item, index) => {
                        return(
                            <div key={item.id} className="bg-blue-200 w-[390px] flex flex-row justify-between h-1/2 items-center">
                                <p className="mr-12">{item.id}</p>
                                <p>{item.descricao}</p>
                                <p>R${item.preco}</p>
                                <button onClick={() => handleDelete(item.id)}>X</button>
                            </div>
                        )
                    })}
                </div>)}
            </div>
        </>
    )
}