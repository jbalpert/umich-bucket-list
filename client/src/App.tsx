import EventHero from "./components/events/EventHero";
import Layout from "./components/layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { UserProvider } from "./contexts/UserContext";

const App = () => {
  const router = createBrowserRouter([
    {
      // Main Page

      path: "/",
      element: (
        <UserProvider>
          <GoogleOAuthProvider clientId="547050767462-1fqgve22mt23cc84v7k6rlhnoa06athm.apps.googleusercontent.com">
            <Layout>
              <EventHero />
            </Layout>
          </GoogleOAuthProvider>
        </UserProvider>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
