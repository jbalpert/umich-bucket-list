import Layout from "./components/layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import EventHero from "./components/events/EventHero";
import { UserProvider } from "./contexts/UserContext";
import { GlobalStateProvider } from "./contexts/GlobalStateContext";

const App = () => {
  const router = createBrowserRouter([
    {
      // Main Page

      path: "/",
      element: (
        <UserProvider>
          <GoogleOAuthProvider clientId="547050767462-1fqgve22mt23cc84v7k6rlhnoa06athm.apps.googleusercontent.com">
            <GlobalStateProvider>
              <Layout>
                <EventHero />
              </Layout>
            </GlobalStateProvider>
          </GoogleOAuthProvider>
        </UserProvider>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
