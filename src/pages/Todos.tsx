import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  actAddTodo,
  actClearCompleted,
  actGetAllTodos,
  actRemoveTodo,
  actToggleActiveTodo,
} from "../store/todos/todosSlice";
import { AddTodo, FilterTodos, ListTodos } from "../components";
import { TTodo } from "../types";

const Todos = () => {
  const dispatch = useAppDispatch();
  const { todosFullInfo, loading } = useAppSelector((state) => state.todos);
  const user = useAppSelector((state) => state.auth.user);
  const [status, setStatus] = useState<"all" | "active" | "completed">("all");

  const handleDate = useCallback((ms: number) => {
    const date = new Date(ms);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }, []);
  const renderData = useMemo(
    () =>
      todosFullInfo.filter((todo) =>
        (status === "completed" && todo.active) ||
        (status === "active" && !todo.active)
          ? false
          : true,
      ),
    [status, todosFullInfo],
  );

  const handleAdd = useCallback(
    (value: string) => {
      const valueClean = value.trim();
      const repeat: boolean = todosFullInfo.some((t) => t.todo === valueClean);

      if (valueClean && !repeat) {
        dispatch(
          actAddTodo({
            todo: valueClean,
            active: true,
            createdAt: Date.now(),
            userId: user?.id,
          }),
        );
      }
    },
    [dispatch, todosFullInfo, user?.id],
  );
  const handleDel = useCallback(
    (id: string) => {
      dispatch(actRemoveTodo(id));
    },
    [dispatch],
  );
  const handleClearCompleted = useCallback(() => {
    dispatch(actClearCompleted());
  }, [dispatch]);
  const handleActive = useCallback(
    (id: string) => {
      dispatch(actToggleActiveTodo(id));
    },
    [dispatch],
  );
  const handleStatus = (s: "all" | "active" | "completed") => {
    setStatus(s);
  };
  useEffect(() => {
    dispatch(actGetAllTodos());
  }, [dispatch]);
  return (
    <>
      <AddTodo handleAdd={handleAdd} loading={loading} />
      <ListTodos
        todosFullInfo={renderData.length ? (renderData as TTodo[]) : []}
        handleDel={handleDel}
        loading={loading}
        handleActive={handleActive}
        handleClearCompleted={handleClearCompleted}
        handleDate={handleDate}
      />
      <FilterTodos
        handleStatus={handleStatus}
        loading={loading}
        status={status}
      />
      <span className="select-none  p-4 text-center font-normal text-notActiveLight line-through dark:text-notActiveDark">
        Drag and drop to reorder list
      </span>
    </>
  );
};

export default Todos;
