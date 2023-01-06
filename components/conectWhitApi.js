import axios from "axios";

export async function searchAllUsers() {
    const result = await axios.get("/api/seeUsers");
    return result.data;
}

export async function searchOneUser(nameUser) {
    try {
        const result = await axios.get("/api/seeUsers/"+nameUser);
        return true
    } catch (error) {
        return false;
    }

}

export async function authUser(nameUser, password) {
    try {
        const result = await axios.post("/api/authUser", {nameUser, password});
        return result        
    } catch (error) {
        return false;        
    }
}

export async function postUser(nameUser, email, password){
    try {
        const result = await axios.post("/api/postUser", {nameUser, email, password})
        return result;        
    } catch (error) {
        return false;
    }
}

export async function guests(){
    try {
        const token = await axios.post("/api/authUser/guests", "guest")
        return token;        
    } catch (error) {
        return false;        
    }
}

export async function maxPuntaje(puntuacion, mode, level){
    try {
        const resp = await axios.post("/api/puntaje/validateMax", {puntuacion, mode, level});
        // resp = status, data
        return resp.data
    } catch (error) {
        return false;        
    }

}

export async function exportPuntaje(mode, puntuacion, level){
    try {
        const resp = await axios.post("/api/puntaje/savePuntaje", {puntuacion, mode, level});
        return true
    } catch (error) {
        return false
    }
}

export async function showRanking(ranking, mode){
    try {
        const resp = await axios.post("/api/puntaje/showRanking", {ranking, mode});
        return resp;
    } catch (error) {
        return false;
    }
}