import { useEffect, useState } from "react"

export default function List() {

    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(true);



    async function handleDelete(id){
       const response = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
       });
       const data =  await response.json;
       console.log(data);
       alert(id, 'item deleted!')
    }


    async function getData() {

        const response = await fetch("http://localhost:3000/produtos");
        const data = await response.json();
        console.log('incoming data:', data);
        lista.push(data);
        console.log('data stored:', lista);
        setLoading(false);

    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <>
            <div className="flex flex-col bg-green-500 items-center align-center justify-center w-full">
                {loading ? (
                    <h1>Carregando dados...</h1>
                ):(<div>
                    {lista[0].map((item, index) => {
                        return(
                            <div key={item.id} className="bg-blue-200 w-[390px] flex flex-row justify-between h-1/2 items-center">
                                <p className="mr-12" key={item.id}>{item.id}</p>
                                <p key={item.id}>{item.descricao}</p>
                                <p key={item.id}>R${item.preco}</p>
                                <button key={item.id}>X</button>
                            </div>
                        )
                    })}
                </div>)}
            </div>
        </>
    )
}