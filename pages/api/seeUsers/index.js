import pool from "../../../services/Pool";

export default async function handler(req, res){
    if(req.method == "GET"){
        try {
            const [rows] = await pool.query("SELECT * FROM users");
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(500).json({message :"error en el servidor"})
        }
    }
    return res.status(404).json("no se que estas haciendo")
}