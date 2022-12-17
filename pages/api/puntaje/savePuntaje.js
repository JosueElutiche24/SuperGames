import { verify } from "jsonwebtoken";
import pool from "../../../services/Pool";

class endPoint{
    req;
    constructor(req){
        this.req = req;
    }

    async Main(){
        if(this.req.method === "POST"){
            return  await endPoint.tryCatch(endPoint.post, this.req);
        }
        return endPoint.notFound();
    }

    // metodos solicitados
    static async post(thisReq){ 
        // obtenemos los datos que necesitamos para validar
        const {myTokenName} = thisReq.cookies
        const {exp, idUser, nameUser, email, password} =verify(myTokenName, "secret")
        const {puntuacion, mode, level} = thisReq.body;
        const date = Date.now();
        // guardar valor de punteo
        switch (mode) {
            case "memory":
                const response = await pool.query("Update memory_ranck Set puntos =?, date=?, level=? where userName = ?;", [puntuacion, date, level, nameUser])    
                return {status:200, message: "hemos actualizado el registro"}
            case "mines":
                const response1 = await pool.query("Update mine_ranck Set puntos =?, date=?, level=? where userName = ?;", [puntuacion, date, level, nameUser])    
                return {status:200, message: "hemos actualizado el registro"}
            case "snake":
                const response2 = await pool.query("Update snake_ranck Set puntos =?, date=? where userName = ?;", [puntuacion, date, nameUser])    
                console.log(response2, " respuesta snake")
                return {status:200, message: "hemos actualizado el registro"}
        
            default:
                return {status:400, message: "Esta enviando datos que no cumplen con nuestros parametros"}
        }
    }

    // Complementos
    static async tryCatch(instruction, thisReq){        
        try {
            return await instruction(thisReq);
        } catch (error) {
            return endPoint.serverError(error);
        }
    }
    static serverError(error){
        let res = {status: 500, message:"ha ocurrido un error inesperado, asegurese de tener coneccion a interet."};
        return res;
    }
    static notFound(){
        let res = {status: 400, message:"Mala peticion"};
        return res;
    }
}

export default async function handler(req, res) {

    const myEndPoint = new endPoint(req);
    const {status, message} = await myEndPoint.Main();

    return res.status(status).json(message);
    
}