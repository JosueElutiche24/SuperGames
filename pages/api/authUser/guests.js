import createToken from "../../../services/createToken"

class endPoint{
    req;
    constructor(req){
        this.req = req;
    }

    async Main(){
        if(this.req.method === "POST"){
            return await endPoint.tryCatch(endPoint.post);
        }
        return endPoint.notFound();
    }
    
    // metodos funcuionalidades de los mains
    static async post(){
        // invocamos a la funcion que crea tokens
        const myToken = await createToken("guest");
        let res = {status: 200, message:"Entregamos el token", myToken}
        return res;
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
        let res = {status: 500, message:"Ha ocurrido un error inesperado"};
        return res;
    }
    static notFound(){
        let res = {status: 400, message:"Mala peticion"};
        return res;
    }
}

export default async function handler(req, res){

    const myPoint = new endPoint(req);
    const {status, message, myToken} = await myPoint.Main();

    if(myToken == undefined && status !== 200){
        return res.status(status).json(message);
    }

    return res.status(status).setHeader("set-Cookie", myToken).json(message);
}