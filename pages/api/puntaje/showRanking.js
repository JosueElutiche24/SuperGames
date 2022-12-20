import { verify } from "jsonwebtoken";
import pool from "../../../services/Pool";

class endPoint{
    req;
    constructor(req){
        this.req = req;
    }

    async Main(){
        if(this.req.method === "POST" && this.req.body.ranking == "global"){
            return  await endPoint.tryCatch(endPoint.postGlobal, this.req);
        }
        if(this.req.method === "POST" && this.req.body.ranking == "mensual"){
            return  await endPoint.tryCatch(endPoint.postMensual, this.req);
        }
        return endPoint.notFound();
    }

    // metodos solicitados
    static async postGlobal(thisReq){ 
        // obtenemos los datos que necesitamos para validar
        const {myTokenName} = thisReq.cookies
        const {exp, idUser, nameUser, email, password} =verify(myTokenName,process.env.SECRET)
        const {ranking, mode} = thisReq.body;
        const date = Date.now();
        // generar busqueda de los mejores puntajes
        switch (mode) {
            case "memory":
                const top10 = await pool.query("select * from memory_ranck order by puntos desc limit 10;");
                if(nameUser == "guest"){
                    return {status:200, message:"datos enviados", data: {top:top10, myPosition:[[{
                        idUser: 0,
                        userName: 'Invitado',
                        puntos: 0,
                        date: 1671396905067,
                        level: 0
                      }]]
                    }}
                }else{
                    const myPosition = await pool.query("select * from memory_ranck where userName = ? ;", [nameUser]);
                    return {status:200, message:"datos enviados", data: {top:top10, myPosition:myPosition}}
                }
            case "mines":
                const top10_1 = await pool.query("select * from mine_ranck order by puntos desc limit 10;");
                if(nameUser == "guest"){
                    return {status:200, message:"datos enviados", data: {top:top10_1, myPosition:[[{
                        idUser: 0,
                        userName: 'Invitado',
                        puntos: 0,
                        date: 1671396905067,
                        level: 0
                      }]]
                    }}
                }else{
                    const myPosition_1 = await pool.query("select * from mine_ranck where userName = ? ;", [nameUser]);
                    return {status:200, message:"datos enviados", data: {top:top10_1, myPosition:myPosition_1}}
                }
            case "snake":
                const top10_2 = await pool.query("select * from snake_ranck order by puntos desc limit 10;");
                if(nameUser == "guest"){
                    return {status:200, message:"datos enviados", data: {top:top10_2, myPosition:[[{
                        idUser: 0,
                        userName: 'Invitado',
                        puntos: 0,
                        date: 1671396905067,
                        level: 0
                      }]]
                    }}
                }else{
                    const myPosition_2 = await pool.query("select * from snake_ranck where userName = ? ;", [nameUser]);
                    return {status:200, message:"datos enviados", data: {top:top10_2, myPosition:myPosition_2}}
                }
        
            default:
                return {status:400, message: "Esta enviando datos que no cumplen con nuestros parametros"}
        }
    }

    static async postMensual(thisReq){ 
        // obtenemos los datos que necesitamos para validar
        const {myTokenName} = thisReq.cookies
        const {exp, idUser, nameUser, email, password} =verify(myTokenName,process.env.SECRET)
        const {ranking, mode} = thisReq.body;
        // obtener fecha de hace un mes = 2629743
        const dateNow = Math.round(new Date().getTime()/1000.0)
        const latestMonth = dateNow - 2629743;
        // generar busqueda de los mejores puntajes
        switch (mode) {
            case "memory":
                const top10 = await pool.query("select * from memory_ranck where date >= ? order by puntos desc limit 10;", [latestMonth]);
                if(nameUser == "guest"){
                    return {status:200, message:"datos enviados", data: {top:top10, myPosition:[[{
                        idUser: 0,
                        userName: 'Invitado',
                        puntos: 0,
                        date: 1671396905067,
                        level: 0
                      }]]
                    }}
                }else{
                    const myPosition = await pool.query("select * from memory_ranck where userName = ? ;", [nameUser]);
                    return {status:200, message:"datos enviados", data: {top:top10, myPosition:myPosition}}
                }
            case "mines":
                const top10_1 = await pool.query("select * from mine_ranck where date >= ? order by puntos desc limit 10;",[latestMonth]);
                if(nameUser == "guest"){
                    return {status:200, message:"datos enviados", data: {top:top10_1, myPosition:[[{
                        idUser: 0,
                        userName: 'Invitado',
                        puntos: 0,
                        date: 1671396905067,
                        level: 0
                      }]]
                    }}
                }else{
                    const myPosition_1 = await pool.query("select * from mine_ranck where userName = ? ;", [nameUser]);
                    return {status:200, message:"datos enviados", data: {top:top10_1, myPosition:myPosition_1}}
                }
            case "snake":
                const top10_2 = await pool.query("select * from snake_ranck where date >= ? order by puntos desc limit 10;", [latestMonth]);
                if(nameUser == "guest"){
                    return {status:200, message:"datos enviados", data: {top:top10_2, myPosition:[[{
                        idUser: 0,
                        userName: 'Invitado',
                        puntos: 0,
                        date: 1671396905067,
                        level: 0
                      }]]
                    }}
                }else{
                    const myPosition_2 = await pool.query("select * from snake_ranck where userName = ? ;", [nameUser]);
                    return {status:200, message:"datos enviados", data: {top:top10_2, myPosition:myPosition_2}}
                }
        
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
    const {status, message, data} = await myEndPoint.Main();
    if(status !== 200){
        return res.status(status).json(message);    
    }

    return res.status(status).json(data);
    
}