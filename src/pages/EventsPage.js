
import EventsList from "../components/EventsList";
import { useLoaderData,json } from "react-router-dom";




const EventsPage = () => {
    const events = useLoaderData();
    return (
        <EventsList events = {events} />
    )
}

export async function loader(){
    const response = await fetch("http://localhost:8080/events");
    if (!response.ok){
        throw json({message:"Unable to fetch the data"}, {status:500});
    }else {
        const data = await response.json();
        return data.events
    }
}


export default EventsPage