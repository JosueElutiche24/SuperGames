import React from 'react'
import InitGame from './SN_inicializar.js'
import { useState, useEffect, useRef } from 'react'
import { maxPuntaje } from './conectWhitApi.js'
import Modal from './SN_modal.jsx'

export default function MyLevel({acabar, btnStart, btnRestart}) {
  const [inputState, setInputState] = useState("")
  const [inputPoints, setInputPoints] = useState(0)
  const [myGame, setMyGame] = useState(null)
  const [modalActive, setModalActive] = useState(null);

    const canvasRef  = useRef(null);
  
    useEffect(() => {
      if(btnStart == true){
        console.log(btnStart)
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const gameInitialized = new InitGame(ConectorApp, context);
        setMyGame(gameInitialized)
        gameInitialized.InitializedGame();
        gameInitialized.startListener1(btnStart);
        setInputPoints(0)
      }
    }, [btnStart])
    

    async function ConectorApp(text, action){
      if(action == "State"){
        setInputState(text)
      }
      if(action == "eat"){
        console.log("colocando puntos ="+text)
        setInputPoints(text)
      }
      if(action == "over"){
        btnRestart();
        const resp = await maxPuntaje(text, "snake");
        if(resp == "siRecord")setModalActive("Felicitaciones!!");
        if(resp == "noRecord")setModalActive("Mala suerte!!")
        if(resp == "createNewRegister")setModalActive("Hemos guardado su primer registro!!")
        if(resp == false)setModalActive("Ha ocurrido un error inesperado")
      }      
    }

  return (
    <div className='w-full h-full flex margins'>
        <div className='w-1/6 h-full margins text-sm'>
          <div className='w-full h-4/5 flex flex-col justify-center items-center'>
            <p className='my-2'>Tus puntos : {inputPoints}</p>
            <p className='my-2' id='inputState'>{inputState}</p>
            <p>Muevase con :</p>
            <p> W, S, D, A</p>
          </div>
            <div className="w-full h-1/5 flex justify-center items-center ">
              <button className='BoxOpaque p-1 hover:BoxRed' onClick={acabar}>Abandonar partida</button>
            </div>
        </div>
        <div id='MinesDiv' className='w-5/6 h-full margins flex items-center justify-center flex-wrap'>
          <canvas ref={canvasRef} id='canvasSnake' width="375" height="375" className='margins blackTrans margins'/>
          {modalActive !== null && <Modal desactive={()=>{
                setModalActive(null)
              }}
                title={modalActive}
                mode={"snake"}
                puntuacion={inputPoints}
                />}
        </div>
    </div>
  )
}
