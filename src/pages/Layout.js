import { Fragment, useEffect } from "react"
import { Outlet, useLoaderData, useSubmit } from "react-router-dom"
import MainNavigation from "../components/MainNavigation"
import {tokenDuration } from "../utils/auth";


const Layout = () => {

    const submit = useSubmit();
    const token = useLoaderData();
    
    useEffect(()=>{
        if (!token){
            return;
        }

        if(token === 'expired'){
            console.log("test")
            submit(null, {action:"/logout", method:"post" });
            return;
        }

        const duration = tokenDuration();

        setTimeout(()=>{
            submit(null, {action:"/logout", method:"post"})
        }, duration)

    }, [token, submit])
    return (
        <Fragment>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
            
        </Fragment>
    )
}

export default Layout