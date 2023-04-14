import {json,useRouteLoaderData} from "react-router-dom"
import EventItem from "../components/EventItem"

const EventDetailPage = () => {
    const data = useRouteLoaderData('event-details')
    return (
        <EventItem event = {data.event}/>
    )
}

export async function loader({request, params}){
    const id = params.eventId
    const response = await fetch("http://localhost:8080/events/" + id)
    if(!response.ok){
        throw json({message:"Unable to fetch the event details"}, {status:500})
    }else {
        return response
    }
}


export default EventDetailPage