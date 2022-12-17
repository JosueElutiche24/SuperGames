import React from 'react'
import BgParticulario from "../../components/bg_particulario"
// import SearchMinesIndex from '../../components/games/search_mines/search_mines.index.jsx'

export default function Memory() {
  return (
    <section className='w-full h-screen text-white'>
      <div className='flex items-center justify-center absolute w-full h-full'>
        {/* <SearchMinesIndex/> */}
      </div>
      <BgParticulario BgImage="url(/fondo4.jpg)" color=""/>
    </section>
  )
}