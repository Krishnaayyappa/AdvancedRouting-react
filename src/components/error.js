import ErrorContent from "./errorContent"
import { useRouteError } from "react-router-dom"


const ErrorPage = () => {
    const err = useRouteError();

    let title = "An error occured!"
    let message = "Something went wrong"
    
    if (err.status === 500){
        message=err.data.message
    }

    if (err.status === 404){
        message =err.data.message
    }

    return (
        <ErrorContent title = {title}>
            <p>{message}</p>
        </ErrorContent>
    )
}

export default ErrorPage