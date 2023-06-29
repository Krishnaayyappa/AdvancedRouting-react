import { useNavigate,Form, useNavigation, useActionData, json, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();
  const isSubmitting = navigation.state === 'submitting';
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method = {method} className={classes.form}>
      {data && data.errors && (<ul>
        {Object.values(data.errors).map( err => <li key = {err}>{err}</li>)}
      </ul>)}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" defaultValue = {event ? event.title:""} required />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" defaultValue = {event ? event.image:""} required />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" defaultValue = {event ? event.date:""} required />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" defaultValue = {event ? event.description:""} required />
      </p>
      <div className={classes.actions}>
        <button disabled = {isSubmitting} type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled = {isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export async function action({request, params}){

  const data = await request.formData();
  const eventData = {
      title:data.get("title"),
      image:data.get("image"),
      date:data.get("date"),
      description: data.get("description")
  };

  const method = request.method

  let url = "http://localhost:8080/events";

  if(method === "PATCH"){
    const eventId = params.eventId;
    url = "http://localhost:8080/events/" + eventId;
  }

  const response = await fetch(url, {
      method:method,
      headers: {
          "Content-Type":"application/json"
      },
      body: JSON.stringify(eventData),
  })

  if (response.status === 422){
      return response;
  }

  if (!response.ok){
      throw json({message:"Unable to send the data"}, {status:500});
  }

  return redirect("/events")
}


export default EventForm;
