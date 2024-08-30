import { Header } from "./components";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { setUser } from "./store/auth/authSlice";

const App = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
          }),
        );
      } else {
        dispatch(setUser(null));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return (
    <div
      className={
        "flex h-screen w-screen flex-col justify-center bg-bgLight dark:bg-bgDark " +
        (theme === "dark" ? "dark" : "")
      }
    >
      <div className="App container h-[700px] lg:w-[700px] ">
        <Header theme={theme} />
        <main className="flex flex-col gap-y-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
