import {redirect} from "react-router-dom";

export function deleteAuthAction(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    return redirect("/");
}