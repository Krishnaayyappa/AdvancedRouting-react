// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import {createBrowserRouter, RouterProvider} from "react-router-dom"
import EditEventPage from "./pages/EditEventPage";
import EventDetailPage, {loader as eventDetailLoader, action as deleteAction} from "./pages/EventsDetailsPage";
import EventsPage, {loader} from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import NewEventPage from "./pages/NewEventPage";
import Layout from "./pages/Layout";
import EventsLayout from "./pages/EventsLayout";
import ErrorPage from "./components/error";
import {action as newOrUpdateAction} from "./components/EventForm"
import NewsletterPage from "./components/Newsletter";
import {action as newsletterAction} from "./components/Newsletter"
import AuthenticationPage, {action as authAction} from "./pages/Authentication";
import {deleteAuthAction} from "./pages/logout";
import {tokenLoader, checkAuthLoader} from "./utils/auth";


const routes = createBrowserRouter([{
  path:"/", 
  element:<Layout />,
  errorElement:<ErrorPage />,
  id:"root",
  loader:tokenLoader,
  children:[
    {index:true, element:<HomePage />},
    {
      path:"events", 
      element:<EventsLayout />,
      errorElement:<ErrorPage />,
      children: [
        {index:true, element:<EventsPage />, loader:loader},
        {
          path:":eventId",
          id:"event-details",
          loader:eventDetailLoader,
          children:[
            {index:true, element:<EventDetailPage />, action:deleteAction},
            {path:"edit", element:<EditEventPage />, loader:checkAuthLoader, action:newOrUpdateAction}
          ]
        },
        {path:"new", element:<NewEventPage />, loader:checkAuthLoader, action:newOrUpdateAction},
      ]
    },
    {path:"newsletter", element:<NewsletterPage />, action:newsletterAction},
    {path:"auth", element:<AuthenticationPage />, action:authAction},
    {path:"logout", action:deleteAuthAction}
  ]
}]);

function App() {
  return <RouterProvider router = {routes}/>
}

export default App;
