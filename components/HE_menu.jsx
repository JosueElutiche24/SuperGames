import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Menu() {
    const [handleTab, setHandleTab] = useState(1)
    function changeTab(num){
        setHandleTab(num)
    }
    const router = useRouter()
    function fnReturn(){
        router.push("/")
    }

  return (
    <div className='relative w-3/4 h-5/6 flex flex-col bg-gray-300 margins outline-2 text-lg'>
        <button onClick={fnReturn} className='absolute p-2 BoxRed outline-slate-900 left-2 top-2'>Regresar</button>
        <div className='w-full h-1/4'>
            <h3 className='font-bold text-4xl text-center text-slate-900 my-3'>Información</h3>
            <p className='text-lg mx-32 my-1 text-center'>Gracias por visitar esta sección, aquí puedes aprender las instrucciones para jugar, puedes recuperar tu contraseña o si estas interesado puedes aprender sobre la ceración de este sitio.</p>
        </div>
        <div className='w-full h-3/4 overflow-hidden'>
            <div className='w-full mt-2 flex justify-end'>
                <button className={'text-white p-2 ' + (handleTab == 1? " w-1/6 shadowInside text-slate-900 font-semibold margins outline-slate-900":"bg-slate-900 w-1/6")} onClick={()=>changeTab(1)}>Como jugar</button>
                <button className={'text-white p-2 ' + (handleTab == 2? " w-1/6 shadowInside text-slate-900 font-semibold margins outline-slate-900":"bg-slate-900 w-1/6")} onClick={()=>changeTab(2)}>Soporte</button>
                <button className={'text-white p-2 ' + (handleTab == 3? " w-1/6 shadowInside text-slate-900 font-semibold margins outline-slate-900":"bg-slate-900 w-1/6")} onClick={()=>changeTab(3)}>Sobre este sitio</button>
            </div>
            <div className='w-full h-full'>
                <div className={handleTab == 1? "shadowInside w-full h-full p-2 overflow-auto": "hidden"}>
                    <p className='text-center font-semibold text-3xl'>Como jugar</p>
                    <div className='margins outline-black rounded-sm my-2 mx-12 p-5 px-10'>
                        <p className='text-center text-xl font-semibold'>Como jugar memoria:</p>
                        <p>- En cada turno puedes voltear dos cartas.</p>
                        <p>- si las cartas que descubres son iguales, anotarás puntos.</p>
                        <p>- si las cartas que descubres no son iguales se te restaran puntos.</p>
                        <p>Segun el nivel que juegues se sumaran o restaran diferentes cantidades:</p>
                        <p>Nivel 1 : +3 o -1</p>
                        <p>Nivel 2 : +6 o -2</p>
                        <p>Nivel 3 : +9 o -3</p>
                    </div>
                    <div className='margins outline-black rounded-sm my-2 mx-12 p-5 px-10'>
                        <p className='text-center text-xl font-semibold'>Como jugar Busca minas:</p>
                        <p>- Es tan simple como ir tocando las casillas para descubrir que es lo que ocultan.</p>
                        <p>- Cada casilla puede ocultar una bomba o un numero.</p>
                        <p>- Si descubres una casilla sin bomba acumulas puntos.</p>
                        <p>- Si descubres una bomba pierdes.</p>
                        <p>- Los numeros en las casillas indican la cantidad de bombas a su alrededor.</p>
                        <p>Mientras mayor sea el nivel al que juegas, mas bombas habrán ocultas.</p>
                        <p>Nivel 1 : 3 bombas ocultas</p>
                        <p>Nivel 2 : 5 bombas ocultas</p>
                        <p>Nivel 3 : 8 bombas ocultas</p>
                    </div>
                    <div className='margins outline-black rounded-sm my-2 mx-12 p-5 px-10 mb-14'>
                        <p className='text-center text-xl font-semibold'>Como jugar Snake:</p>
                        <p>- Tu objetivoes comer las amburguesas.</p>
                        <p>- Para controlar el movimiento del snake debes pulsar A,S,D, y W</p>
                        <p>- No debes estrellarte con las paredes</p>
                        <p>- No debes morderte a ti mismo</p>
                    </div>
                </div>
                <div className={handleTab == 2? "shadowInside w-full h-full p-2 overflow-auto": "hidden"}>
                    <p className='text-center font-semibold text-3xl'>Soporte</p>
                    <div className='margins outline-black rounded-sm my-2 mx-12 p-5 px-10 mb-14'>
                        <p>En estos momentos la unica manera de ayudarte que te ofrezco es que me contactes por medio de mi correo electronico y me comentes en que puedo ayudarte.</p>
                        <p> - JosueG.guzman24@gmail.com</p>
                    </div>
                </div>
                <div className={handleTab == 3? "shadowInside w-full h-full p-2 overflow-auto": "hidden"}>
                    <p className='text-center font-semibold text-3xl'>Sobre este sitio</p>
                    <div className='margins outline-black rounded-sm my-2 mx-12 p-5 px-10 mb-14'>
                        <p>Este sitio fue creado por Josue Guzman, con el proposito de aprender por medio de la practica.</p>
                        <p>El proyecto etá desarrollado con las siguientes tecnologías:</p>
                        <p className='ml-5'>- NodeJs  - NextJs  - React</p>
                        <p className='ml-5'>- Tailwind  - JsonWebToken  - MySql2</p>
                        <p>Y se utilizaron los siguients servicios para su despliegue:</p>
                        <p  className='ml-5'>- PlanetScale  - Vercel</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
