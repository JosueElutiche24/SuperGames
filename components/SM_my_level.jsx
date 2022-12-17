import React from 'react'
import { useState } from 'react'
import Card from './SM_card'
import Modal from './SM_modal';
import { maxPuntaje } from '../servicesClient/conectWhitApi';
import { useRouter } from 'next/router';

export default function MyLevel({Level, selectLevel, arrayMap}) {
    const router = useRouter();
    let cantBoombs ;
    if(Level == 1) cantBoombs = 3;
    if(Level == 2) cantBoombs = 5;
    if(Level == 3) cantBoombs = 8;

    function desactiveModal(){
        setModalActive(null)
        router.push("/");
    }

    const [Puntuacion, setPuntuacion] = useState(0)
    const [btnsDisconect, setBtnsDisconect] = useState("hidden")
    const [modalActive, setModalActive] = useState(null)
      // abandona partida
      function acabar(){
        selectLevel(null)
    }
    // funcion que conecta con los onClicks de las cards
    async function sePuntuacion(isBomb){
        if(isBomb !== true){
            setPuntuacion(Puntuacion+(50+(Level*50)))
        }else{
            document.querySelector("#MinesDiv").classList.add("notClick")
            setBtnsDisconect("BoxRed")
            const resp = await maxPuntaje(Puntuacion, "mines", Level);
            if(resp == "siRecord")setModalActive("Felicitaciones!!");
            if(resp == "noRecord")setModalActive("Mala suerte!!")
            if(resp == "createNewRegister")setModalActive("Hemos guardado su primer registro!!")
            if(resp == false)setModalActive("Ha ocurrido un error inesperado")

        }
    }
    let NumCards = [];
    if(arrayMap !== null){
        for(let row = 1; row <= Level+3; row++){
            for(let col = 1; col <= Level+3; col++){
                let key =row.toString()+col.toString()
                NumCards.push(<Card key={key} id={key} Level={Level} funcOnClick={sePuntuacion} value={arrayMap[row-1][col-1]} classDisconect={btnsDisconect}/>)
            }
        }
    }
    return (
    <div className='w-full h-full flex justify-center items-center margins'>
        <div className='w-1/6 h-full margins text-sm'>
            <div className='w-full h-4/5 flex flex-col justify-center items-center'>
                <p className='my-2'>Tus puntos : {Puntuacion}</p>
                <p className='my-2'>Si fallas : pierdes :P</p>
                <p className='my-2'>Si aciertas : +{50+(Level*50)}</p>
                <p className='my-2'>Minas ocultas : {cantBoombs} </p>
            </div>
            <div className="w-full h-1/5 flex justify-center items-center ">
                <button className='BoxOpaque p-1 hover:BoxRed' onClick={acabar}>Abandonar partida</button>
            </div>
        </div>
        <div id='MinesDiv' className='w-5/6 h-full margins flex items-center justify-center flex-wrap'>
            {NumCards}
        </div>
            {modalActive !== null &&
            <Modal desactive ={desactiveModal} mode="mines" puntuacion={Puntuacion} level={Level} title={modalActive}/>}
    </div>
  )
}
