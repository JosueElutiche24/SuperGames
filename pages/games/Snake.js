import React from 'react'
import BgParticulario from "../../components/bg_particulario"
import SnakeIndex from '../../components/SN_snake.index.jsx'

export default function Memory() {
  return (
    <section className='w-full h-screen text-white'>
      <div className='flex items-center justify-center absolute w-full h-full'>
        <SnakeIndex/>
      </div>
      <BgParticulario BgImage="url(/fondo5.jpg)" color=""/>
    </section>
  )
}