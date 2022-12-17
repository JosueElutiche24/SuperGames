import {createContext, useContext } from "react";
import { useState } from "react";

const UserContext = createContext()

export function ContextofUser(){
    return useContext(UserContext)
}


export function UserProvider({children}){

    /////////////////////////////////// Estado del usuario que inició sesion
    const [userSession, setUserSession] = useState(null)
    
    function changeUserSession(val_res){
        setUserSession(val_res)
    }

    return(
        <UserContext.Provider value={{userSession, changeUserSession}}>{children}</UserContext.Provider>
    )
 }
