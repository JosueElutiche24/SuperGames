import React from 'react'
import Card from "./ME_card"
import Modal from './ME_modal';
import { useState, useEffect } from 'react';
import { maxPuntaje } from '../servicesClient/conectWhitApi';

function ComprobarPar(val1, val2, Level){
    if(val1 + val2 == Level*8+1){
        return true
    }
    return false
}

export default function MyLevel({Level, selectLevel, idRandomizeds}) {
    
    const sistemaPunteo = [Level*3, Level]
    /////// Aquí manejaremos el control de girar cartas depar en par
    const [BtnsPushed, setBtnsPushed] = useState([])
    const [Puntuacion, setPuntuacion] = useState(0)
    const [Parejas, setParejas] = useState(0)
    const [modalActive, setModalActive] = useState(null);
    useEffect(() => {
        // si hay 2 cartas levantadas
        if(BtnsPushed.length == 2){
            // desactive los botones
            document.querySelector("#MemoryDiv").classList.add("notClick")
            // valide si son pares
            let Valido = ComprobarPar(BtnsPushed[0], BtnsPushed[1], Level)
            // si son pares, de puntos y dejelas volteadas
            if(Valido == true){
                setPuntuacion(Puntuacion + sistemaPunteo[0])
                document.querySelector("#MemoryDiv").classList.remove("notClick")
                setBtnsPushed([])
                setParejas(Parejas + 1)
                // si no volteelas
            }else{
            setTimeout(()=>{
                setPuntuacion(Puntuacion - sistemaPunteo[1])
                document.querySelector("#frontNo"+BtnsPushed[0]).classList.remove("frontFlip")
                document.querySelector("#backNo"+BtnsPushed[0]).classList.remove("backFlip")
                document.querySelector("#frontNo"+BtnsPushed[1]).classList.remove("frontFlip")
                document.querySelector("#backNo"+BtnsPushed[1]).classList.remove("backFlip")
                setBtnsPushed([])
                document.querySelector("#MemoryDiv").classList.remove("notClick")
            },2000)}
        }
    }, [BtnsPushed])  

    useEffect(() => {
        async function verifyPoints(){
            const resp = await maxPuntaje(Puntuacion, "memory", Level);
            if(resp == "siRecord")setModalActive("Felicitaciones!!");
            if(resp == "noRecord")setModalActive("Mala suerte!!")
            if(resp == "createNewRegister")setModalActive("Hemos guardado su primer registro!!")
            if(resp == false)setModalActive("Ha ocurrido un error inesperado")
        }
        if(Parejas == (Level*8)/2){
            // verificamos si dejaremos que el usuario actualize a un mejor punteo
            // se activará el modal con el botón que lo permite o no
            verifyPoints();
        }
    }, [Parejas])
    
    
    function funcOnClick(num){
        setBtnsPushed([...BtnsPushed, num])
    }

    // preparamos numCards para almacenar las cards
    let NumCards = [];
    // organizamos un array con la imagen qwe corresponde a cada carta
    let ImageCards =[];
    // una vuelta por cada item de idRandomized
    for(let i=1;i<=idRandomizeds.length;i++){
        // simplificaos el nombre del numButton
        let numButton = idRandomizeds[i-1];
        // clasificamos en mayores o menores de la mitad
        if(numButton - idRandomizeds.length/2 <= 0){
            /// a los menores asignamos su mismo numero
            ImageCards.push(numButton)
        }else{
            // y a los mayores el numero de su contraparte menor
            ImageCards.push((idRandomizeds.length+1)-numButton)
        }
    }
    
    // cremaos los botrones y repartimos los numeros
    for(let i =1; i <= Level*8; i++){
        NumCards.push(<Card key={i} id={idRandomizeds[i-1]} Level={Level} funcOnClick={funcOnClick} image={"/Memory/Mandala"+ImageCards[i-1]+".png"}/>)
    }  
    // abandona partida
    function acabar(){
        selectLevel(null)
    }
  return (
    <div className='w-full h-full flex margins text-sm'>
        <div className='w-1/6 h-full margins'>
            <div className='w-full h-4/5 flex flex-col justify-center items-center'>
                <p className='my-2'>Tus puntos : {Puntuacion}</p>
                <p className='my-2'>Si fallas : -{sistemaPunteo[1]}</p>
                <p className='my-2'>Si aciertas : +{sistemaPunteo[0]}</p>
            </div>
            <div className="w-full h-1/5 flex justify-center items-center ">
                <button className='BoxOpaque p-1 hover:BoxRed' onClick={acabar}>Abandonar partida</button>
            </div>
        </div>
        <div id='MemoryDiv' className='w-5/6 h-full margins flex items-center justify-center flex-wrap'>
            {NumCards}
            {modalActive !== null && <Modal desactive={()=>{
                setModalActive(null)
                acabar()}}
                title={modalActive}
                mode={"memory"}
                puntuacion={Puntuacion}
                level={Level}
                />}
        </div>
    </div>
  )
}
