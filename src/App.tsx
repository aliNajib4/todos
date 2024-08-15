import Todos from "./pages/Todos.tsx";
import { Header } from "./components";
import { useAppSelector } from "./store/hooks";
import "./App.css";

const App = () => {
  const theme = useAppSelector((state) => state.theme.theme);
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
          <Todos />
        </main>
      </div>
    </div>
  );
};

export default App;
