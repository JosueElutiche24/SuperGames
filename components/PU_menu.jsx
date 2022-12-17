import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import PushInfo from './PU_pushinfo';

export default function Menu() {
    const router = useRouter();
    const [handleTab1, setHandleTab1] = useState(1)
    const [handleTab2_1, setHandleTab2_1] = useState(1)
    const [handleTab2_2, setHandleTab2_2] = useState(1)
    function changeTab1(num){
        setHandleTab1(num)
    }
    function changeTab2_1(num){
        setHandleTab2_1(num)
    }
    function changeTab2_2(num){
        setHandleTab2_2(num)
    }

    function Return(){
        router.push("/")
    }
  return (
    <div className='w-3/4 h-5/6 flex flex-col margins text-white'>
        <div className='w-full h-1/6'>
            <div className='flex h-full justify-around items-center'>
                <button className={'w-1/4 h-2/3 BoxOpaque '+(handleTab1 == 1? "bg-amber-500 text-black font-semibold":"")} onClick={()=>changeTab1(1)}>Ranking Global</button>
                <h3 className='font-bold text-4xl text-center text-amber-400 my-3'>Marcadores</h3>
                <button className={'w-1/4 h-2/3 BoxOpaque '+(handleTab1 == 2? "bg-amber-500 text-black font-semibold":"")} onClick={()=>changeTab1(2)}>Ranking Mensual</button>
            </div>
        </div>
        <div className='w-full h-5/6'>
            <div className={handleTab1 == 1? 'w-full' : "hidden"}>
                <div className='flex w-full justify-between'>
                    <div className='w-1/4 flex justify-center'>
                        <button className='BoxRed h-full w-2/3' onClick={Return}>Regresar</button>
                    </div>
                    <div className='flex justify-between w-2/4'>
                        <button className={'text-black font-semibold p-2 w-1/3 ' + (handleTab2_1 == 1? "bg-amber-500 ":"bg-amber-200")} onClick={()=>changeTab2_1(1)}>Memoria</button>
                        <button className={'text-black font-semibold p-2 w-1/3 ' + (handleTab2_1 == 2? "bg-amber-500 ":"bg-amber-200")} onClick={()=>changeTab2_1(2)}>BuscaMinas</button>
                        <button className={'text-black font-semibold p-2 w-1/3 ' + (handleTab2_1 == 3? "bg-amber-500 ":"bg-amber-200")} onClick={()=>changeTab2_1(3)}>Snake</button>
                    </div>
                </div>
                <div className='w-full overflow-auto mt-2'>
                    <div className={handleTab2_1 == 1? "bg-slate-500": "hidden"}><PushInfo ranking={"global"} modeGame={"Memory"}/></div>
                    <div className={handleTab2_1 == 2? "bg-slate-500": "hidden"}><PushInfo ranking={"global"} modeGame={"Mines"}/></div>
                    <div className={handleTab2_1 == 3? "bg-slate-500": "hidden"}><PushInfo ranking={"global"} modeGame={"Snake"}/></div>
                </div>
            </div>
            <div className={handleTab1 == 2? 'w-full' : "hidden"}>
                <div className='flex w-full justify-between'>
                    <div className='w-1/4 flex justify-center'>
                        <button className='BoxRed h-full w-2/3' onClick={Return}>Regresar</button>
                    </div>
                    <div className='flex justify-between w-2/4'>
                        <button className={'text-black font-semibold p-2  w-1/3 ' + (handleTab2_2 == 1? "bg-amber-500 ":"bg-amber-200")} onClick={()=>changeTab2_2(1)}>Memoria</button>
                        <button className={'text-black font-semibold p-2  w-1/3 ' + (handleTab2_2 == 2? "bg-amber-500 ":"bg-amber-200")} onClick={()=>changeTab2_2(2)}>BuscaMinas</button>
                        <button className={'text-black font-semibold p-2  w-1/3 ' + (handleTab2_2 == 3? "bg-amber-500 ":"bg-amber-200")} onClick={()=>changeTab2_2(3)}>Snake</button>
                    </div>
                </div>
                <div className='w-full overflow-auto mt-2'>
                    <div className={handleTab2_2 == 1? "bg-slate-500": "hidden"}><PushInfo ranking={"Mensual"} modeGame={"Memory"}/></div>
                    <div className={handleTab2_2 == 2? "bg-slate-500": "hidden"}><PushInfo ranking={"Mensual"} modeGame={"Mines"}/></div>
                    <div className={handleTab2_2 == 3? "bg-slate-500": "hidden"}><PushInfo ranking={"Mensual"} modeGame={"Snake"}/></div>
                </div>
            </div>
        </div>
    </div>
  )
}