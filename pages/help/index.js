import React from 'react'
import BgParticulario from '../../components/bg_particulario'
import Menu from '../../components/HE_menu'

export default function help() {
  return (
    <section className="w-full h-screen overflow-hidden">
      <div className='flex items-center justify-center absolute w-full h-full'>
        <Menu/>
      </div>
      <BgParticulario BgImage="url(/fondo6.jpg)" color=""/>
    </section>
  )
}
