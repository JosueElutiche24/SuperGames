import BgParticulario from "../../components/bg_particulario"
import TabMenus from "../../components/LO_tab_menus"
import { useRouter } from "next/router"

export default function Login() {
  const router = useRouter()

  function fncHelp(){
    router.push("/help")
  }

  return (
      <section className="w-full h-screen">
        <div className="flex flex-col items-center justify-center absolute w-full h-full">
          <h1 className="text-neutral-200 text-6xl mb-10">MiniJuegos Poc</h1>
          <TabMenus/>
        </div>
        <button onClick={fncHelp} className="absolute bg-indigo-600 p-2 w-20 margins text-white right-5 top-5">Help</button>
        <BgParticulario BgImage="url(/fondo2.jpg)" color=""/>
      </section>
  )
}