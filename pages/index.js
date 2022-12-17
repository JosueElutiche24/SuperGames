import React from 'react'

import BgParticulario from '../components/bg_particulario';
import Menu from '../components/HO_Menu';

export default function Home() {
  return (
    <section className="w-full h-screen">
      <div className='flex items-center justify-center absolute w-full h-full'>
        <Menu/>
      </div>
      <BgParticulario BgImage="url(/fondo1.jpg)" color=""/>
    </section>
  )
}
