import React from 'react'
import BgParticulario from "../../components/bg_particulario"
// import MemoryIndex from '../../components/games/memory/memory.index.jsx'

export default function Memory() {
  return (
    <section className='w-full h-screen'>
      <div className='flex items-center justify-center absolute w-full h-full'>
        {/* <MemoryIndex/> */}
      </div>
      <BgParticulario BgImage="url(/fondo3.jpg)" color=""/>
    </section>
  )
}
