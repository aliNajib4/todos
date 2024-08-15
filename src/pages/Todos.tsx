import { useEffect, useState } from "react";
// svgs
import CrossIcon from "../assets/images/icon-cross.svg?react";
import CheckIcon from "../assets/images/icon-check.svg?react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  actAddTodo,
  actClearCompleted,
  actGetAllTodos,
  actRemoveTodo,
  actToggleActiveTodo,
} from "../store/todos/todosSlice";

const Todos = () => {
  const dispatch = useAppDispatch();
  const { todosFullInfo, loading, error } = useAppSelector(
    (state) => state.todos,
  );
  const [value, setValue] = useState<string>("");
  const [status, setStatus] = useState<"all" | "active" | "completed">("all");

  const handleAdd = () => {
    const valueClean = value.trim();
    const repeat: boolean = todosFullInfo.some((t) => t.todo === valueClean);

    if (valueClean && !repeat) {
      dispatch(
        actAddTodo({ todo: valueClean, active: true, createdAt: Date.now() }),
      );
      setValue("");
    }
  };
  const handleDel = (id: string) => {
    dispatch(actRemoveTodo(id));
  };
  const handleClearCompleted = () => {
    dispatch(actClearCompleted());
  };
  const handleActive = (id: string) => {
    dispatch(actToggleActiveTodo(id));
  };
  const handleStatus = (s: "all" | "active" | "completed") => {
    setStatus(s);
  };
  useEffect(() => {
    dispatch(actGetAllTodos());
  }, [dispatch]);
  return (
    <>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Create a new todo"
          className="w-full rounded-lg bg-MLight px-6 py-4 pl-12 text-base font-extrabold text-dark focus:outline-none dark:bg-vDesaturatedD dark:text-lightHD"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
        />
        <button
          onClick={handleAdd}
          className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-vDark dark:border-darkD"
        ></button>
      </div>
      <div className="rounded-lg bg-MLight dark:bg-vDesaturatedD ">
        <ul className="h-[328px] divide-y divide-vDark overflow-y-auto dark:divide-vD">
          {loading === "pending" ? (
            <p>Loading...</p>
          ) : (
            todosFullInfo.map(({ todo, active, id }) => {
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
                  key={id}
                >
                  <div className="flex items-center gap-x-4">
                    <div className="h-[22px] w-[22px] select-none rounded-full bg-light p-px hover:bg-active dark:bg-darkD">
                      <button
                        className={
                          "flex h-5 w-5  items-center justify-center rounded-full bg-MLight dark:bg-vDesaturatedD " +
                          (!active ? "bg-active" : "")
                        }
                        onClick={() => (id ? handleActive(id) : null)}
                      >
                        <CheckIcon className={!active ? "block" : "hidden"} />
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
                    onClick={() => (id ? handleDel(id) : null)}
                  >
                    <CrossIcon />
                  </button>
                </li>
              );
            })
          )}
        </ul>
        <div className="flex select-none items-center  justify-between border-t border-t-dark p-4 text-sm text-vDark dark:border-t-vD dark:text-lightD">
          <span className="hover:text-lightD">
            {todosFullInfo.length} items left
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
                (status === "active" ? " active" : " dark:hover:text-lightHD")
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
      <footer className="select-none  p-4 text-center font-bold text-vDark line-through dark:text-vD">
        Drag and drop to reorder list
      </footer>
    </>
  );
};

export default Todos;
