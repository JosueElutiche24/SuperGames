import jwt from "jsonwebtoken"
import {serialize} from "cookie"

export default async function createToken(type, values = null){

    let myToken;
    if(type == "user"){
        // creamos el token, exp es la fecha en que expira nuestro token, "secret" es la clave de encriptado(importnte no dejarla a la vista)
        let token = jwt.sign({
            exp: Math.floor(Date.now()/1000)+(60*60*24*1),
            idUser : values.idUser,
            nameUser: values.nameUser,
            email : values.email,
            password: values.password
        }, process.env.SECRET)

        // res.setHeader("Set-Cookie", token)
        // necesitaremos otra biblioteca para enviar nuestro token serializado, ya que es una mala pracrica enviarlo solo asi
        // serializando y colocandole tiempo de expiracion :
        myToken = serialize("myTokenName", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge : 1000*60*60*24*1,
            path : "/"
        })
    }
    if(type == "guest"){
        let token = jwt.sign({
            exp: Math.floor(Date.now()/1000)+(60*60*24*1),
            idUser : "0",
            nameUser: "guest",
        }, process.env.SECRET)

        myToken = serialize("myTokenName", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge : 1000*60*60*24*1,
            path : "/"
        })
    }
    return myToken;
}