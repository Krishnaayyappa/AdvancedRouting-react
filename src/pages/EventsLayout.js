import EventsNavigation from "../components/EventsNavigation"
import { Outlet } from "react-router-dom"


const EventsLayout = () => {
    return (
        <>
            <EventsNavigation />
            <Outlet />
        </>
    )
}

export default EventsLayout