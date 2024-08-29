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
        "h-screen w-screen bg-light bg-mBg bg-contain bg-no-repeat lg:bg-bg dark:bg-mVD dark:bg-mBgD lg:dark:bg-bgD " +
        (theme === "dark" ? "dark" : "")
      }
    >
      <div className="App container flex h-screen flex-col justify-center bg-contain bg-no-repeat font-josefin lg:w-[700px] ">
        <Header theme={theme} />
        <main className="flex flex-col gap-y-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
