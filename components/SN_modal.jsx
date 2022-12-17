import React from 'react'
import { exportPuntaje } from './conectWhitApi';
import { useState } from 'react';

export default function Modal({desactive, mode, puntuacion, title}) {
  const [saved, setSaved] = useState(null)

  async function funcSi(){
    const resp = await exportPuntaje(mode, puntuacion);
    if(resp == false){
      setSaved({
        modaltitle: "Ha ocurrido un error",
        modaltext :"Lo sentimos, no hemos podido guardar su nueva puntuación :c. Revise su coneccion a internet"
      })
    }else{
      setSaved({
        modaltitle: "Hemos guardado su record",
        modaltext :""
      })
    }
  }

  function funcNo(){
    desactive();
  }
  return (
    <>
    {saved == null &&
    <div className='BoxOpaque text-white p-2 absolute modalWidht'>
        <p className='text-lg font-semibold text-center'>{title}</p>
        {title == "Felicitaciones!!" && <p className='text-center'>Has superado tu record de puntaje, ¿deseas guardar los datos de esta partida?</p>}
        {title == "Hemos guardado su primer registro!!" && <p className='text-center'>Buena partida, vuelve a intentarlo y supera tu record actual!</p>}
        {title == "Mala suerte!!" && <p className='text-center'>Has tenido mejores puntuaciones, suerte para la proxima.</p>}
        {title == "Ha ocurrido un error inesperado" && <p className='text-center'>Lo sentimos, hemos detectado un error. Puede que no tengas conexion a internet.</p>}
        <div className='flex justify-around m-2'>
            {title !== "Felicitaciones!!" && <button onClick={funcNo}>ok</button>}
            {title == "Felicitaciones!!" && <button onClick={funcSi}>Si</button>}
            {title == "Felicitaciones!!" && <button onClick={funcNo}>No</button>}
        </div>
    </div>
    }
    {saved !== null &&
    <div className='BoxOpaque text-white p-2 absolute modalWidht'>
      <p className='text-lg font-semibold text-center'>{saved.modaltitle}</p>
      <p className='text-center'>{saved.modaltext}</p>
      <div className='flex justify-around m-2'>
        <button className='' onClick={funcNo}>ok</button>
      </div>
    </div>
    }
    </>
  )
}
