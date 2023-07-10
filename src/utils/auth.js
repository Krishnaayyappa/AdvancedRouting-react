import { redirect } from "react-router-dom";


export default function getAuthToken(){
    const token = localStorage.getItem("token");

    if(!token){
        return null;
    }
    
    const duration = tokenDuration();

    if (duration<0){
        return "expired";
    }

    return token;
}

export function tokenLoader(){
    const token = getAuthToken();
    return token;
}

export function checkAuthLoader(){
    const token = getAuthToken();
    if (!token){
        return redirect("/auth");
    }
    return null
}

export function tokenDuration(){
    const storedExpiration = localStorage.getItem("expiration");
    const expiration = new Date(storedExpiration);
    const now = new Date();
    const duration = expiration.getTime() - now.getTime();
    return duration
}