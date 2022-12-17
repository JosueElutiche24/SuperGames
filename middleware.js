import { NextResponse } from "next/server"
import { jwtVerify} from "jose"

export async function middleware(request){

        // extraemos el token de las cookies
        const myToken = request.cookies.get("myTokenName")


        // utilizabamos el if para ejecutar codigo solo cuando se visitara la url de /Login
        // Comprobamos si el usuario esta autenticado para no dejarlo ingresar al login
        if(request.nextUrl.pathname.includes("/login")){
            if(myToken !== undefined){
                try {
                    const { payload } = await jwtVerify(myToken, new TextEncoder().encode("secret"));
                    return NextResponse.redirect(new URL("/", request.url))
                } catch (error) {
                    return NextResponse.next()
                } 
            }
            return NextResponse.next()
        }



        // verificamos que existe el token
        if(myToken === undefined){
            return NextResponse.redirect(new URL("/login", request.url))
        }
        // intentamos validar wque el token es nuestro, y si no, lo redireccionamos al login
        try {
            const { payload } = await jwtVerify(myToken, new TextEncoder().encode("secret"));
            return NextResponse.next()
        } catch (error) {
            return NextResponse.redirect(new URL("/login", request.url))
        }  
}

// En este objeto cofiguraremos las rutas en las que se ejecutará nuestro middleware
export const config = {
    // matcher: ["/", "/Home", "/Home/:path*"],
    matcher : [ "/","/games/:path*","/login"]
}