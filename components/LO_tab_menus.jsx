import React from 'react'
import { useState } from 'react'

import { searchOneUser, searchAllUsers, postUser, authUser, guests } from '../servicesClient/conectWhitApi'
import { ContextofUser } from '../context/user_context'
import Modal from './LO_modal'

export default function TabMenus() {
    const [btnDesactived, setBtnDesactived] = useState(false)
    const [myModal, setMyModal] = useState(null)

    // contexto global del usuario 
    const { changeUserSession}= ContextofUser();

    //  Controladores de Tabs
    const [stateTab, setstateTab] = useState(1)
    function handleTab(value){
        setstateTab(value)
    }
    function descativeModal(){
        setMyModal(null)
        setBtnDesactived(false)
    }
    // Manejadores de Formularios
    async function sendSubmit(event){
        event.preventDefault();
        setBtnDesactived(true)
        let userName = event.target[0].value;
        let password = event.target[1].value;
        if(userName == "" || password == ""){
            setMyModal({title:"Datos incompletos",text:"Necesitamos que ingrese todos los datos que se le solicitan",mode:"error"})
            return
        }
        // Buscar y validar usuario
        const queryuser = await authUser(userName, password);
        if(queryuser == false){
            setMyModal({title:"usuario o contraseña invalidos",text:"Puede que hayas ingresado mal tus datos, vuelve a intentarlo o ve a la seccion de ayuda para recuperar tu contraseña.",mode:"error"})
            setBtnDesactived(false)
            return
        }

        setMyModal({title:"Bienvenido "+userName,text:"",mode:"redirect"})
        changeUserSession(userName);
    }

    async function registerSubmit(event){
        event.preventDefault();
        setBtnDesactived(true)
        let userName = event.target[0].value;
        let email = event.target[1].value;
        let password = event.target[2].value;

        // verificar si no es un nombre de ususario repetido
        const queryuser = await searchOneUser(userName);
        if(queryuser == true){
            setMyModal({title:"Este nombre de usuario ya existe",text:"Intente con otro nombre de usuario, este ya está siendo utilizado por alguien mas.",mode:"error"})
            setBtnDesactived(false)
            return
        }
        setMyModal({title:"",text:"Asegurese de recordar sus datos, en breve terminaremos de crear su cuenta",mode:"alert"})
        // Guardar datos
        const querypost = await postUser(userName, email, password);
        // notifcar al usuario
        if(querypost == false){
            alert("no se ha guardado el registro")
            setMyModal({title:"No se ha guardado el registro",text:"Lo sentimos, ha ocurrido un error inesperado, puede que no tenga conección a internet.",mode:"error"})
            setBtnDesactived(false)
            return
        }

        setMyModal({title:"Todo correcto, bienvenido",text:"Su cuenta ha sido creada correctamente. Disfrute y sea feliz.",mode:"redirect"})
        changeUserSession(userName);
    }

    async function fncInvitado(event){
        event.preventDefault();
        setBtnDesactived(true)

        const invitToken = await guests()
        if(invitToken == false){
            setMyModal({title:"No se ha guardado el registro",text:"Lo sentimos, ha ocurrido un error inesperado, puede que no tenga conección a internet.",mode:"error"})
            setBtnDesactived(false)
            return
        }
        setMyModal({title:"Bienvenido",text:"Has iniciado secion como invitado, ten en cuenta que no podrás guardar tus puntuaciones si no creas una cuenta.",mode:"redirect"})
        changeUserSession("Invitado");

    }

  return (
    <>
    <div className="w-1/3 h-1/2">
        <div className='h-full w-full text-white text-xl'>
            <div className='w-full h-1/6 flex '>
                <button onClick={()=>handleTab(1)} className={stateTab==1? 'bg-indigo-700 w-1/3 h-full outline outline-white outline-1' : "w-1/3 h-full outline outline-white outline-1"}>Inicia Seción</button>
                <button onClick={()=>handleTab(2)} className={stateTab==2? 'bg-indigo-700 w-1/3 h-full outline outline-white outline-1' : "w-1/3 h-full outline outline-white outline-1"}>Registrarse</button>
                <button onClick={()=>handleTab(3)} className={stateTab==3? 'bg-indigo-700 w-1/3 h-full outline outline-white outline-1' : "w-1/3 h-full outline outline-white outline-1"}>Invitado</button>
            </div>
            <div className='w-full h-5/6'>
                <div className={stateTab==1? 'outline outline-white outline-1 w-full h-full ' : "hidden"}>
                    <form className='w-full' onSubmit={sendSubmit}>
                        <p className='py-3 m-2 text-center'>Iniciar Secion</p>
                        <div className='flex flex-col w-4/5 p-2 mx-auto'>
                            <label className='mr-3'>Name :</label>
                            <input className='text-stone-900' type="text"/>
                        </div>
                        <div className='flex flex-col w-4/5 p-2 mx-auto'>
                            <label className="mr-3">password :</label>
                            <input className='text-stone-900' type="text"/>
                        </div>
                        <div className='w-full flex justify-center'>
                            <input className={btnDesactived == false? 'block w-2/5 p-2 bg-indigo-700' : 'block w-2/5 p-2 bg-indigo-900 notClick'} type="submit" value={btnDesactived == false? "Enviar" : "Espere"}/>
                        </div>
                    </form>
                </div>
                <div className={stateTab==2? 'outline outline-white outline-1 w-full h-full ' : "hidden"}>
                    <form className='w-full' onSubmit={registerSubmit}>
                        <p className='py-1 m-2 text-center'>Registrarse</p>
                        <div className='flex flex-col w-4/5 px-2 mx-auto'>
                            <label className='mr-3'>Name :</label>
                            <input className='text-stone-900' type="text"/>
                        </div>
                        <div className='flex flex-col w-4/5 px-2 mx-auto'>
                            <label className="mr-3">email : </label>
                            <input className='text-stone-900' type="text"/>
                        </div>
                        <div className='flex flex-col w-4/5 px-2 mx-auto'>
                            <label className="mr-3">password :</label>
                            <input className='text-stone-900' type="text"/>
                        </div>
                        <div className='flex w-full justify-center'>
                        <input className={btnDesactived == false? 'block w-2/5 p-2 bg-indigo-700' : 'block w-2/5 p-2 bg-indigo-900 notClick'} type="submit" value={btnDesactived == false? "Registrarse" : "Espere"}/>
                        </div>
                    </form>
                </div>
                <div className={stateTab==3? 'outline outline-white outline-1 w-full h-full ' : "hidden"}>
                        <p className='py-3 m-2 text-center'>Entrar como invitado</p>
                        <div className='w-full h-full flex items-center justify-center'>
                            <button className={btnDesactived == false? 'block w-2/5 p-2 bg-indigo-700' : 'block w-2/5 p-2 bg-indigo-900 notClick'} onClick={fncInvitado}>{btnDesactived == false? "Entrar" : "Espere"}</button>
                        </div>
                </div>
            </div>
        </div>
    </div>
    {myModal !== null && <Modal desactive={descativeModal} data={myModal}/>}
    </>
  )
}
