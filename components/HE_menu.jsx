import React from 'react'
import { useState } from 'react'

export default function Menu() {
    const [handleTab, setHandleTab] = useState(1)
    function changeTab(num){
        setHandleTab(num)
    }

    return (
        <div className='w-3/4 h-5/6 flex flex-col bg-gray-300'>
            <div className='w-full h-1/2'>
                <h3 className='font-bold text-4xl text-center text-neutral-600 my-3'>Esta seccion aun esta siendo desarrollada</h3>
            </div>
        </div>
      )
  return (
    <div className='w-3/4 h-5/6 flex flex-col bg-gray-300'>
        <div className='w-full h-1/2'>
            <h3 className='font-bold text-4xl text-center text-neutral-600 my-3'>De que trata esto</h3>
            <p className='text-xl mx-3 my-1 text-center'>Bienvenido a esta sección. Aqui podras encontrar información sobre la pagina, como jugar y como funcoiona el sistema de marcadores.</p>
            <p className='text-lg mx-3 my-1 text-center'>Si has olvidado tu usuario o contraseña y quieres recuperarlo entonces dirijete hacia esta secion, </p>
            <p className='text-lg mx-3 my-1 text-center'>O si quieres saber sobre como está construida la aplicación, entonces dirijete hacia esta sección.</p>
            <p className='text-lg mx-3 my-1 text-center'> Tambien podrás encontrar más informaciónsobre mi tranajo en mi página principal, visitala aquí. </p>
        </div>
        <div className='w-full h-2/3'>
            <div className='w-full mt-2 flex justify-end'>
                <button className={'text-white p-2 ' + (handleTab == 1? "bg-slate-600 ":"bg-slate-400")} onClick={()=>changeTab(1)}>Sobre los juegos</button>
                <button className={'text-white p-2 ' + (handleTab == 2? "bg-slate-600 ":"bg-slate-400")} onClick={()=>changeTab(2)}>¿Necesitas ayuda?</button>
                <button className={'text-white p-2 ' + (handleTab == 3? "bg-slate-600 ":"bg-slate-400")} onClick={()=>changeTab(3)}>Sobre la construccion de esta aplicación web</button>
            </div>
            <div className='w-full overflow-auto'>
                <div className={handleTab == 1? "bg-slate-500": "hidden"}>tab 1</div>
                <div className={handleTab == 2? "bg-slate-500": "hidden"}>tab 2</div>
                <div className={handleTab == 3? "bg-slate-500": "hidden"}>tab 3</div>
            </div>
        </div>
    </div>
  )
}
