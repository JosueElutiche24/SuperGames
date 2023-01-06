import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import MyLevel from './SM_my_level';
import MenuLevel from './SM_menu_level';
import mineArray from './SM_create_array';

export default function SearchMinesIndex() {
  const router = useRouter();
  const [Level, setLevel] = useState(null)

  let myObject;
  const [mapArray, setMapArray] = useState(myObject)
  useEffect(() => {
    if(Level !== null){
      myObject = new mineArray(Level);
      setMapArray(myObject.mapArray)
    }else{
      myObject = null;
      setMapArray(myObject)
    }
  }, [Level])

//  funciones por defecto 
  function Return(){
    router.push("/")
  }
  function funcPuntuacion(){
    router.push("/Games/Puntuaciones")
  }
  return (
    <section className='text-white w-5/6 h-5/6 outline outline-2 outline-white'>
        <div className='w-full h-1/6 flex items-center justify-around'>
            <div className='w-1/4 h-full flex justify-center items-center'>
                <button className='margins h-full w-full BoxOpaque hover:BoxRed' onClick={Return}>Abandonar</button>
            </div>
            <div className='w-2/4 h-full flex justify-center items-center'>
                <p>Busca Minas Nivel : {Level}</p>
            </div>
            <div className='w-1/4 h-full flex justify-center  items-center'>
                <button onClick={funcPuntuacion} className='margins h-full w-full BoxOpaque hover:BoxYellow'>Marcadores</button>
            </div>
        </div>
        <div className='w-full h-5/6'>
            {Level == null && 
              <MenuLevel selectLevel={(num)=>(setLevel(num))}/>}
            {Level !== null &&
            <MyLevel Level={Level} selectLevel={()=>(setLevel(null))} arrayMap={mapArray}/>}
        </div>

    </section>
  )
}