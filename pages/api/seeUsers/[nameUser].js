import pool from "../../../services/Pool";

class endPoint{
  req;
  constructor(req){
      this.req = req;
  }

  async Main(){
      if(this.req.method === "GET"){
          return await endPoint.tryCatch(endPoint.get, this.req);
      }
      return endPoint.notFound();
  }
  
  // metodos funcuionalidades de los mains
  static async get(thisReq){
    const {nameUser} =  thisReq.query;
    const [userEncontrado] = await pool.query("SELECT * FROM users where userName = ?", [nameUser]);
    //devolvemos el status 204 para indicar que no hay coincidencias
    if(userEncontrado.length <= 0){
      return {status:404}
    }
    // si se encontraron coincidencias debemos notidicarlo con un codigo 200
    return {status:200, data: userEncontrado}
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
      let res = {status: 500, message:"Ha ocurrido un error inesperado"};
      return res;
  }
  static notFound(){
      let res = {status: 404, message:"Que diablos haces?"};
      return res;
  }
}

export default async function handler(req, res) {

  const myPoint = new endPoint(req);
  const {status, message} = await myPoint.Main();

  if(status == 404){
      return res.status(status).json("no hay coincidencias");
  }

  return res.status(status).json("el usuario existe");


}
