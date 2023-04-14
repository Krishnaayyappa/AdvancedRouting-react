import EventForm from "../components/EventForm"
import { json, redirect} from "react-router-dom";


const NewEventPage = () => {
    return (
        <EventForm />
    )
}

export async function action({request, params}){

    const data = await request.formData();
    
    
    const eventData = {
        title:data.get("title"),
        image:data.get("image"),
        date:data.get("date"),
        description: data.get("description")
    };

    console.log(eventData)

    const response = await fetch("http://localhost:8080/events", {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(eventData),
    })

    if (!response.ok){
        throw json({message:"Unable to send the data"}, {status:500});
    }else{
        redirect("/events")
    }
}


export default NewEventPage