import EventHero from "./components/events/EventHero";
import Layout from "./components/layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const App = () => {
  const router = createBrowserRouter([
    {
      // Main Page
      path: "/",
      element: (
        <Layout>
          <EventHero />
        </Layout>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
