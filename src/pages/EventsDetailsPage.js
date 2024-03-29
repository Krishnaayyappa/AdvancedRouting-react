import {json,useRouteLoaderData,redirect} from "react-router-dom"
import getAuthToken from "../utils/auth"

import EventItem from "../components/EventItem"

const EventDetailPage = () => {
    const data = useRouteLoaderData('event-details')
    return (
        <EventItem event = {data.event[0]}/>
    )
}

export async function loader({request, params}){
    const id = params.eventId
    const response = await fetch("https://rest-api-express-js-nine.vercel.app/events/" + id)
    if(!response.ok){
        throw json({message:"Unable to fetch the event details"}, {status:500})
    }else {
        return response
    }
}

export async function action({request, params}){
    const eventId = params.eventId
    const token = getAuthToken();
    const response = await fetch("https://rest-api-express-js-nine.vercel.app/events/" + eventId, {
        method: request.method,
        headers:{
            "Authorization":"Bearer " + token      
        }
    });

    if (!response.ok){
        throw json({message: "unable to delete the event"}, {status: 500});
    }

    return redirect("/events");
}


export default EventDetailPage