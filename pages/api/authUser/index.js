import pool from "../../../services/Pool";
import createToken from "../../../services/createToken";

class endPoint{
    req;
    constructor(req){
        this.req = req;
    }

    async Main(){
        if(this.req.method === "POST"){
            return await endPoint.tryCatch(endPoint.post, this.req);
        }
        return endPoint.notFound();
    }

    // metodos solicitados
    static async post(thisReq){
        const {nameUser, password} = thisReq.body;
        // buscamos el userName y comprobamos que lo encontró
        const [rows] = await pool.query("SELECT * FROM users where userName = ?",nameUser);
        if(rows.length == 0){
            return {status:401, message: "usuario o contraseña incorrecta"}
        }
        // extraemos los datos del array
        const dbUser = rows[0];
        // validamos la contraseña
        if(password !== dbUser.password){
            return {status:401, message: "usuario o contraseña incorrecta"}
        }
        
        // invocamos a la funcion para crear tokens
        const myToken = await createToken("user",{
            idUser : dbUser.idUser,
            nameUser: dbUser.userName,
            email : dbUser.email,
            password: dbUser.password
        })
        // console.log({1: password, 2 : dbUser.password, token : token, serializado : serialized})   
        return {status:200, message :"Succesfully login", myToken}
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
    const {status, message, myToken} = await myEndPoint.Main();

    if(myToken == undefined && status !== 200){
        return res.status(status).json(message);
    }

    return res.status(status).setHeader("set-Cookie", myToken).json(message);
}
