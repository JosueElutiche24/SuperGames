import React from 'react'

export default function Card({id, Level, funcOnClick, value, classDisconect}) {

  function Clikado(){
    document.querySelector("#mineCard_P"+id).classList.remove("hidden")
    if(value == 9){
      funcOnClick(true)
    }else{
      funcOnClick(false)
    }
  }

  if(Level == 1){return (
    <div id={"mineCard_Div"+id} onClick={Clikado} className='card1Mines'>
        {value == 9 &&
        <p id={"mineCard_P"+id} className={"w-full h-full centrado "+classDisconect}>*</p>}
        {value !== 9 &&
        <p id={"mineCard_P"+id} className={"w-full h-full centrado "+classDisconect}>{value}</p>}
    </div>
  )}
  if(Level ==2){return (
    <div id={"mineCard_Div"+id} onClick={Clikado} className='card2Mines'>
        {value == 9 &&
        <p id={"mineCard_P"+id} className={"w-full h-full centrado "+classDisconect}>*</p>}
        {value !== 9 &&
        <p id={"mineCard_P"+id} className={"w-full h-full centrado "+classDisconect}>{value}</p>}
    </div>
  )}
  if(Level == 3){return (
    <div id={"mineCard_Div"+id} onClick={Clikado} className='card3Mines'>
        {value == 9 &&
        <p id={"mineCard_P"+id} className={"w-full h-full centrado "+classDisconect}>*</p>}
        {value !== 9 &&
        <p id={"mineCard_P"+id} className={"w-full h-full centrado "+classDisconect}>{value}</p>}
    </div>
  )}
}
