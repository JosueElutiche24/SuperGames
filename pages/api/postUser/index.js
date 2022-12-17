import pool from "../../../services/Pool";
import createToken from "../../../services/createToken";

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
        const {nameUser, email, password} = thisReq.body;
        // Buscar indice
        const [searchId] = await pool.query("SELECT MAX(idUser) AS lastId FROM users")
        const NewId = await searchId[0].lastId
        
        // grabar nuevo usuario
        const [result] = await pool.query("INSERT INTO  users(idUser, userName, email, password) VALUES (?, ?, ?, ?)", [NewId+1, nameUser, email, password])
        if(result.affectedRows < 1){
            let res = {status: 500, message:"ha ocurrido un error inesperado, asegurese de tener coneccion a interet."};
            return res;
        }
        // crear token
        const myToken = await createToken("user",{
            idUser : NewId+1,
            nameUser: nameUser,
            email : email,
            password: password
        })

        return {status:200, message : "todo ok", myToken}
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

    return res.status(status).setHeader("Set-Cookie", myToken).json(message)


}