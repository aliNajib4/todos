import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
//redux
import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Todos from "./pages/Todos.tsx";
import Signin from "./pages/Signin.tsx";
import Signup from "./pages/Signup.tsx";
import ProtectPage from "./components/ProtectPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: "/todos",
        element: (
          <ProtectPage isUser={true}>
            <Todos />
          </ProtectPage>
        ),
      },
      {
        path: "/todos/signin",
        element: (
          <ProtectPage isUser={false}>
            <Signin />
          </ProtectPage>
        ),
      },
      {
        path: "/todos/signup",
        element: (
          <ProtectPage isUser={false}>
            <Signup />
          </ProtectPage>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
