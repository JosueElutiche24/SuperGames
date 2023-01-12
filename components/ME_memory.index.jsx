import React, { useState } from 'react'
import { useRouter } from 'next/router'
import MenuLevel from './ME_menu_level';
import MyLevel from './ME_my_level';

export default function MemoryIndex() {
    const router = useRouter();
    const [Level, setLevel] = useState(null)

    function Return(){
        router.push("/")
    }
    function funcPuntuacion(){
        router.push("/games/Puntuaciones")
      }
    function selectLevel(value){
        setLevel(value)
    }

    function randomizeArray(cantidad){
        function randomize(cantidad){
            return Math.floor(Math.random()*cantidad)+1
        }
        let myArr = [];
        for(let i = 1; i<= cantidad; i++){
            let random = randomize(cantidad)
            while (myArr.includes(random)) {
                random = randomize(cantidad)
            }
            myArr.push(random)
        }
        return myArr
    }
    const idRandomizeds = randomizeArray(Level*8)

  return (
    <section className='text-white w-5/6 h-5/6 outline outline-2 outline-white'>
        <div className='w-full h-1/6 flex items-center justify-around'>
            <div className='w-1/4 h-full flex justify-center items-center'>
                <button className='margins h-full w-full BoxOpaque hover:BoxRed' onClick={Return}>Volver</button>
            </div>
            <div className='w-2/4 h-full flex justify-center items-center'>
                <p>Memoria Nivel : {Level}</p>
            </div>
            <div className='w-1/4 h-full flex justify-center items-center'>
                <button onClick={funcPuntuacion} className='margins h-full w-full BoxOpaque hover:BoxYellow'>Marcadores</button>
            </div>
        </div>
        <div className='w-full h-5/6'>
            {Level == null && 
            <MenuLevel selectLevel={selectLevel}/>}
            {Level !== null &&
            <MyLevel Level={Level} selectLevel={selectLevel} idRandomizeds={idRandomizeds}/>}
        </div>

    </section>
  )
}
