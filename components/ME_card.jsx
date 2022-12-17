import React from 'react'
import Image from 'next/image'

export default function Card({id, Level, funcOnClick, image}){

function cardClick(num){
  document.querySelector("#frontNo"+num).classList.add("frontFlip")
  document.querySelector("#backNo"+num).classList.add("backFlip")
  funcOnClick(num)
}

  if(Level == 1){
    return (
      <div onClick={()=>(cardClick(id))} id={"cardNo"+id} className='card1 m-4 relative'>
        <div id={"frontNo"+id} className='cardFace frontFace'>
        </div>
        <div id={"backNo"+id} className='cardFace backFace'>
          <Image src={image} layout='fill'/>
        </div>
      </div>
  )}
  if(Level == 2){
     return (
      <div onClick={()=>(cardClick(id))} id={"cardNo"+id} className='card2 m-1 relative'>
        <div id={"frontNo"+id} className='cardFace frontFace'>
        </div>
        <div id={"backNo"+id} className='cardFace backFace'>
          <Image src={image} layout='fill'/>
        </div>
      </div>
  )}
  if(Level == 3){
    return (
      <div onClick={()=>(cardClick(id))} id={"cardNo"+id} className='card3 m-1 relative'>
        <div id={"frontNo"+id} className='cardFace frontFace'>
        </div>
        <div id={"backNo"+id} className='cardFace backFace'>
          <Image src={image} layout='fill'/>
        </div>
      </div>
  )}
}

