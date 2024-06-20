import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";

import ErrorPage from "./components/ErrorPage";
import Dashboard from "./components/Dashboard";
import Status from "./components/Status";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "status",
        element: <Status />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
