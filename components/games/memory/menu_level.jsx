import React from 'react'

export default function MenuLevel({selectLevel}) {
  return (
    <div className='w-full h-full flex flex-col text-xl'>
        <div className='w-full h-1/5 flex justify-center items-end '>
            <p className='blackTrans px-2 py-2 rounded-sm'>Escoje el nivel al que quieres jugar :</p>
        </div>
        <div className='w-full h-4/5 flex justify-around items-center'>
            <button className='h-1/3 w-1/4 BoxOpaque hover:BoxPink' onClick={()=>(selectLevel(1))}>Nivel 1</button>
            <button className='h-1/3 w-1/4 BoxOpaque hover:BoxPink' onClick={()=>(selectLevel(2))}>Nivel 2</button>
            <button className='h-1/3 w-1/4 BoxOpaque hover:BoxPink' onClick={()=>(selectLevel(3))}>Nivel 3</button>
        </div>
    </div>
  )
}
