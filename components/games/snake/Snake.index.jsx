import React, {useState} from 'react'
import { useRouter } from 'next/router'
import MyLevel from './my_level';

export default function SnakeIndex() {
  const router = useRouter();
  function Return(){
    router.push("/")
}
function funcPuntuacion(){
  router.push("/Games/Puntuaciones")
}

const [start, setStart] = useState(null)

function fncStart(){
    setStart(true)
}
function fncRestart(){
  setStart(false)
}
  return (
    <section className='text-white w-5/6 h-5/6 outline outline-2 outline-white'>
        <div className='w-full h-1/6 flex items-center justify-around'>
            <div className='w-1/4 h-full flex justify-center items-center'>
                <button className='margins h-full w-full BoxOpaque hover:BoxRed' onClick={Return}>Abandonar</button>
            </div>
            <div className='w-2/4 h-full flex justify-around items-center margins'>
                <button className={start == false || start == null ? "BoxGreen w-1/3 h-1/2" : ""} onClick={fncStart}>{start == false || start == null ? "Comenzar": "Juegue"}</button>             
            </div>
            <div className='w-1/4 h-full flex justify-center  items-center'>
                <button onClick={funcPuntuacion} className='margins h-full w-full BoxOpaque hover:BoxYellow'>Marcadores</button>
            </div>
        </div>
        <div className='w-full h-5/6'>
            <MyLevel acabar={()=>Return()} btnStart={start} btnRestart={fncRestart}/>
        </div>

    </section>
  )
}
