import { CreateTripPage } from "./pages/create-trip"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { TripDetailsPage } from "./pages/trip-details"

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export { App }
