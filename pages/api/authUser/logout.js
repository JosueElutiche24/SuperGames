import { verify } from "jsonwebtoken"
import {serialize} from "cookie"

class endPoint{
    req;
    constructor(req){
        this.req = req;
    }

    async Main(){
        // comprobamos si existe token
        const verify = endPoint.tokenVerify(this.req);
        if(!verify){
            return endPoint.invalidToken();    
        }
        if(this.req.method === "POST"){
            return await endPoint.tryCatch(endPoint.post);
        }
        return endPoint.notFound();
    }
    
    // metodos funcuionalidades de los mains
    static async post(){
        // establecemos el token con valorews nulos y con fecha de expiración 0
        const myToken = serialize("myTokenName", null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge : 0,
            path : "/"
        })
        // lo establecemo en el header de la respuesta
        return {status:200, messsage:"Logout succesfully", myToken}
    }
    
    // Complementos
    static async tryCatch(instruction){        
        try {
            return await instruction();
        } catch (error) {
            return endPoint.serverError(error);
        }
    }
    static serverError(error){
        let res = {status: 500, message:"ha ocurrido un error inesperado, asegurese de tener coneccion a interet."};
        return res;
    }
    static notFound(){
        let res = {status: 404, message:"Que diablos haces?"};
        return res;
    }
    static invalidToken(){
        let res = {status: 400, message:"Token inalido o inexistente"};
        return res;
    }
    static tokenVerify(thisReq){
        try {            
            const {myTokenName} = thisReq.cookies
            if(!myTokenName){
                return false
            }
            verify(myTokenName, "secret")
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default async function handler(req, res){

    const myEndPoint = new endPoint(req);
    const {status, message, myToken} = await myEndPoint.Main();

    if(myToken == undefined && status !== 200){
        return res.status(status).json(message);
    }

    return res.status(status).setHeader("Set-Cookie", myToken).json(message)

}