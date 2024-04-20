import "./App.css";
import darkIcon from "./assets/images/icon-moon.svg";
import lightIcon from "./assets/images/icon-sun.svg";
import crossIcon from "./assets/images/icon-cross.svg";
import checkIcon from "./assets/images/icon-check.svg";
import { useState } from "react";

function App() {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<{ todo: string; active: boolean }[]>(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")!) : []);
  const [status, setStatus] = useState<"all" | "active" | "completed">("all");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const handleAdd = () => {
    const valueClean = value.trim();
    const repeat: boolean = todos.map((t) => t.todo).includes(valueClean);

    if (valueClean && !repeat) {
      setTodos([{ todo: valueClean, active: true }, ...todos]);
      localStorage.setItem("todos", JSON.stringify([...todos, { todo: valueClean, active: true }]))
      setValue("");
    }
  };
  const handleDel = (i: number) => {
    setTodos(todos.filter((_, iTodo) => iTodo !== i));
  };
  const handleClearCompleted = () => {
    setTodos(
      todos.filter((todo) => {
        if (todo.active) {
          return true;
        }
        return false;
      }),
    );
  };
  const handleActive = (i: number) => {
    setTodos(
      todos.map((t, iTodo) => {
        if (iTodo === i) {
          return { ...t, active: !t.active };
        }
        return t;
      }),
    );
  };
  const handleStatus = (s: "all" | "active" | "completed") => {
    setStatus(s);
  };
  const changeTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };
  return (
    <div
      className={
        "h-screen w-screen bg-light bg-mBg bg-contain bg-no-repeat lg:bg-bg dark:bg-mVD dark:bg-mBgD lg:dark:bg-bgD " +
        (theme === "dark" ? "dark" : "")
      }
    >
      <div
        className="App container flex h-screen flex-col justify-center bg-contain bg-no-repeat font-josefin lg:w-[700px] "
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
      >
        <header className="flex items-center justify-between py-8">
          <div className="text-3xl font-bold uppercase text-MLight">todo</div>
          <button className="select-none" onClick={changeTheme}>
            {theme === "dark" ? (
              <img src={lightIcon} alt="lightIcon" />
            ) : (
              <img src={darkIcon} alt="darkIcon" />
            )}
          </button>
        </header>
        <main className="flex flex-col gap-y-4">
          <div className="relative">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Create a new todo"
              className="w-full rounded-lg bg-MLight px-6 py-4 pl-12 text-base font-extrabold text-dark focus:outline-none dark:bg-vDesaturatedD dark:text-lightHD"
            />
            <button
              onClick={handleAdd}
              className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-vDark dark:border-darkD"
            ></button>
          </div>
          <div className="rounded-lg bg-MLight dark:bg-vDesaturatedD ">
            <ul className="h-[328px] divide-y divide-vDark overflow-y-auto dark:divide-vD">
              {todos.map(({ todo, active }, i) => {
                if (status === "completed") {
                  if (active) {
                    return null;
                  }
                } else if (status === "active") {
                  if (!active) {
                    return null;
                  }
                }
                return (
                  <li
                    className="flex items-center justify-between p-3 text-[13px] text-dark dark:text-lightD dark:hover:text-lightHD"
                    key={i}
                  >
                    <div className="flex items-center gap-x-4">
                      <div className="h-[22px] w-[22px] select-none rounded-full bg-light p-px hover:bg-active dark:bg-darkD">
                        <button
                          className={
                            "flex h-5 w-5  items-center justify-center rounded-full bg-MLight dark:bg-vDesaturatedD " +
                            (!active ? "bg-active" : "")
                          }
                          onClick={() => handleActive(i)}
                        >
                          <img
                            className={!active ? "block" : "hidden"}
                            src={checkIcon}
                            alt="check icon"
                          />
                        </button>
                      </div>
                      <p
                        className={
                          "font-bold" +
                          (!active ? " text-vDark line-through" : "")
                        }
                      >
                        {todo}
                      </p>
                    </div>
                    <button
                      className="h-4 w-3 select-none"
                      onClick={() => handleDel(i)}
                    >
                      <img src={crossIcon} alt="cross icon" />
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex select-none items-center  justify-between border-t border-t-dark p-4 text-sm text-vDark dark:border-t-vD dark:text-lightD">
              <span className="hover:text-lightD">
                {todos.length} items left
              </span>
              <button
                onClick={handleClearCompleted}
                className="dark:hover:text-lightHD"
              >
                Clear Completed
              </button>
            </div>
          </div>
          <footer className="select-none rounded-lg bg-MLight p-4 text-vDark dark:bg-vDesaturatedD dark:text-lightD ">
            <ul className="flex justify-center gap-x-4 ">
              <li>
                <button
                  onClick={() => handleStatus("all")}
                  className={
                    "text-sm font-bold capitalize" +
                    (status === "all" ? " active" : " dark:hover:text-lightHD")
                  }
                >
                  all
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleStatus("active")}
                  className={
                    "text-sm font-bold capitalize" +
                    (status === "active"
                      ? " active"
                      : " dark:hover:text-lightHD")
                  }
                >
                  active
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleStatus("completed")}
                  className={
                    "text-sm font-bold capitalize" +
                    (status === "completed" ? " active" : "")
                  }
                >
                  completed
                </button>
              </li>
            </ul>
          </footer>
        </main>
        <footer className="select-none  p-4 text-center font-bold text-vDark line-through dark:text-vD">
          Drag and drop to reorder list
        </footer>
      </div>
    </div>
  );
}

export default App;
