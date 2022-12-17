import React from 'react'
import { useRouter } from 'next/router'

export default function Modal({desactive, data}) {
const router = useRouter();

function redirect() {
  router.push("/")
}

  return (
    <div className={data.mode !== "error"? "text-white p-2 absolute BoxOpaque modalWidht" : "text-white p-2 absolute BoxRed modalWidht"}>
        <p className='text-center text-lg font-semibold'>{data.title}</p>
        <p className='text-center'>{data.text}</p>
        <div className='flex justify-around m-2'>
            <button className={data.mode !== "error"? 'w-2/5 p-2 bg-indigo-700' : "w-2/5 p-2 bg-orange-600 margins"} onClick={data.mode !== "redirect" ? desactive : redirect}>ok</button>
        </div>
    </div>
  )
}
