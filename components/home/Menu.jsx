import React from 'react'
import {useRouter} from 'next/router'
import { ContextofUser } from '../../context/user_context';
import axios from 'axios'

export default function Menu() {
    const router = useRouter();  
    const {userSession} = ContextofUser()

      // buttons of principals functions
    async function funLogout(){
      try {
<<<<<<< HEAD
        await axios.post("/api/authUser/Logout")
=======
        await axios.post("/api/authUser/logout")
>>>>>>> 2ba788948b471f1f6967cac718538c3f8f906372
        router.push("/login");
      } catch (error) {
        router.push("/login");      
      }
    }
    function funcPuntuacion(){
<<<<<<< HEAD
      router.push("/games/Puntuaciones")
=======
      router.push("/games/puntuaciones")
>>>>>>> 2ba788948b471f1f6967cac718538c3f8f906372
    }
    function fncHelp(){
        router.push("/help")
    }  

      // buttons of secundary functions
    function goMemory(){
<<<<<<< HEAD
      router.push("/games/Memory")
    }
    function goSearchmines(){
      router.push("/games/SearchMines")
    }
    function goSnake(){
      router.push("/games/Snake")
=======
      router.push("/games/memory")
    }
    function goSearchmines(){
      router.push("/games/search_mines")
    }
    function goSnake(){
      router.push("/games/snake")
>>>>>>> 2ba788948b471f1f6967cac718538c3f8f906372
    }

  return (
    <div className='w-3/4 h-1/2 flex flex-col'>
      <div className='text-white'>
        <p>Bienvenido : {userSession}</p>
      </div>
        <div className="text-white w-full h-2/3 flex items-center justify-center">
            <button onClick={goMemory} className="BoxOpaque m-4 w-1/4 h-1/2 text-lg hover:BoxViolet ">Memory</button>
            <button onClick={goSearchmines} className="BoxOpaque m-4 w-1/4 h-1/2 text-lg hover:BoxViolet ">SerachMines</button>
            <button onClick={goSnake} className="BoxOpaque m-4 w-1/4 h-1/2 text-lg hover:BoxViolet ">Snake</button>
        </div>
        <div className="text-white w-full h-1/3 flex items-center justify-between">
            <button onClick={funLogout} className="BoxOpaque m-4 w-1/4 h-1/2 text-lg hover:BoxRed ">cerrar sesion</button>
            <button onClick={funcPuntuacion} className='BoxOpaque m-4 w-1/4 h-1/2 text-lg hover:BoxYellow '>Mis puntuaciones</button>
            <button onClick={fncHelp} className="BoxOpaque m-4 w-1/4 h-1/2 text-lg hover:BoxViolet ">Help</button>
        </div>
    </div>
  )
}
