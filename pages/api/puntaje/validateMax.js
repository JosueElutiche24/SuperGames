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
        const {exp, idUser, nameUser, email, password} =verify(myTokenName,process.env.SECRET)
        const {puntuacion, mode, level} = thisReq.body;
        const dateNow =new Date( Date.now());
        const DateFormated = dateNow.getTime();
        // const myOtherDate = new Date()
        // myOtherDate.setTime(myDate);

        // si el usuario es un invitado no hagas nada
        if(idUser == 0){
            return {status:200 ,message: "invitado"}
        }
        // bucamos el valor del ultimo mejor punteo en el modo de juego correspondiente
        switch (mode) {
            case "memory":
                {
                    const [rowM] = await pool.query("SELECT * FROM memory_ranck where idUser = ?", [idUser]);
                    // si aún no hay registros de este modo de juego, entonces creelos
                    if(rowM.length == 0){
                        const[resM] = await pool.query("INSERT INTO memory_ranck (idUser, userName, puntos, date, level) VALUES (?, ?, ?, ?, ?);", [idUser,nameUser,puntuacion,DateFormated,level ])
                        return {status:200,message:"createNewRegister"}
                    }else{
                        // si ya existe compare si es mayor
                        const [datesM] = rowM;
                        // rowM = {idUser, userName, puntos, date, level}
                        if(datesM.puntos >= puntuacion){
                            // si los datos almacenados son mayores que los nuevos datos
                            return {status:200, message:"noRecord"}
                        }else{
                            return {status:200, message:"siRecord"}
                        }
                    }
                }
            case "mines":
                {
                    const [rowMi] = await pool.query("SELECT * FROM mine_ranck where idUser = ?", [idUser]);
                    if(rowMi.length == 0){
                        const[resMi] = await pool.query("INSERT INTO mine_ranck (idUser, userName, puntos, date, level) VALUES (?, ?, ?, ?, ?);", [idUser,nameUser,puntuacion,DateFormated,level ])
                        return {status:200,message:"createNewRegister"}
                    }else{
                        const [datesMi] = rowMi;
                        if(datesMi.puntos >= puntuacion){
                            return {status:200, message:"noRecord"}
                        }else{
                            return {status:200, message:"siRecord"}
                        }
                    }
                }
            case "snake":
                {
                    const [rowS] = await pool.query("SELECT * FROM snake_ranck where idUser = ?", [idUser]);
                    if(rowS.length == 0){
                        const[resS] = await pool.query("INSERT INTO snake_ranck (idUser, userName, puntos, date) VALUES (?, ?, ?, ?);", [idUser,nameUser,puntuacion,DateFormated])
                        return {status:200,message:"createNewRegister"}
                    }else{
                        const [datesS] = rowS;
                        if(datesS.puntos >= puntuacion){
                            return {status:200, message:"noRecord"}
                        }else{
                            return {status:200, message:"siRecord"}
                        }
                    }
                }
            default:
                return {status:400, message:"Esta enviando datos que no cumplen con nuestros parametros"}
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
        console.log(error, " en el validatemax");
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