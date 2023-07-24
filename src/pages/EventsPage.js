
import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { useLoaderData,json,defer, Await } from "react-router-dom";




const EventsPage = () => {
    const {events} = useLoaderData();
    
    return (
        <Suspense fallback = {<p style={{textAlign:"center"}}>Loading...</p>}>
            <Await resolve = {events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>
        
    );
}

export async function loaderEvents(){
    const response = await fetch("https://rest-api-express-js-nine.vercel.app/events");
    if (!response.ok){
        throw json({message:"Unable to fetch the data"}, {status:500});
    }else {
        const data = await response.json();
        return data.events
    }
}

export function loader(){
    return defer({
        events:loaderEvents()
    })
}


export default EventsPage