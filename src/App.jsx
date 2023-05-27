import './App.css'
import Lista from './components/Lista/index.jsx'

function App() {

  return (
    <>
      <div className='bg-slate-500 h-screen w-screen items-center justify-center flex flex-col'>
        <h1 className='font-bold text-white text-3xl mb-4'>Lista App v1.0 🚀</h1>
        <div className='bg-white w-2/6 h-4/6 rounded-md border border-slate-100 drop-shadow-md flex flex-col items-center'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center font-bold text-2xl mb-2'>Estoque</h1>
            <hr className='w-4/6'/>
          </div>
          <div className='bg-red-500 mt-4 w-5/6 h-5/6 flex flex-col'>
            <Lista/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
