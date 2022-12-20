import React from 'react'
import { useEffect, useState } from 'react'
import { showRanking } from './conectWhitApi'

export default function PushInfo({ranking, modeGame}) {
  const [myInfo, setMyInfo] = useState([])
  const [theRanking, setTheRanking] = useState([])
  const [Error, setError] = useState(false)
  useEffect(() => {
    async function myQuery(){
      const resp = await showRanking(ranking, modeGame);
      if(resp == false){
        setError(true)
      }else{
        const {data} = resp;
        setTheRanking([...data.top[0]])
        setMyInfo(...data.myPosition[0])
      }
    }
    myQuery();

  }, [])
  
  function esPar(num){
    return (num%2) == 0;
  }

  function convertToDate(date){
      const myDate = new Date()
      myDate.setTime(date);
      return myDate.toLocaleDateString();
  }

  if(Error == false)
  return (
    <div className='mirenme relative w-full h-full'>
    <div className={ 'w-full ranckingCellHeight flex justify-between bg-amber-800 p-2 margins outline-black font-semibold sticky top-0'}>
        <div className='w-1/6 text-center'><p>userName</p></div>
        <div className='w-1/6 text-center'><p>Puntos</p></div>
        <div className='w-1/6 text-center'><p>Fecha</p></div>
        <div className='w-1/6 text-center'><p>Nivel</p></div>
    </div>
    <div className='overflow-y-auto w-full ranckingGridHeight'>
          {theRanking.map((item, index)=>{
            return(
              <div key={index} className={"p-2 margins outline-black flex justify-between "+(esPar(index)?" bg-yellow-500 ":'bg-amber-600 ')}>
                <div className='w-1/6 text-center'><p>{item.userName}</p></div>
                <div className='w-1/6 text-center'><p>{item.puntos}</p></div>
                <div className='w-1/6 text-center'><p>{convertToDate(item.date)}</p></div>
                <div className='w-1/6 text-center'><p>{item.level}</p></div>
              </div>
            )
          })}
    </div>
    <div className={"text-black p-2 margins outline-orange-700 outline-2 w-full ranckingCellHeight flex justify-between bg-yellow-300 absolute bottom-0"}>
        <div className='w-1/6 text-center'><p>{myInfo.userName}</p></div>
        <div className='w-1/6 text-center'><p>{myInfo.puntos}</p></div>
        <div className='w-1/6 text-center'><p>{convertToDate(myInfo.date)}</p></div>
        <div className='w-1/6 text-center'><p>{myInfo.level}</p></div>
    </div>
    </div>
  )
  if(Error == true)
  return(
    <div className='mirenme relative w-full h-full flex justify-center items-center'>
      <p className='font-bold text-center text-2xl text-red-200 bg-black p-2 rounded-sm'>Ha ocurrido un error al cargar los datos, revise su coneccion a internet y vuelva a cargar la pagina.</p>
    </div>
  )
}
