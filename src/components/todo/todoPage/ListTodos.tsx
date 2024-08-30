import { TLoading, TTodo } from "../../../types";
import SingleTodo from "./SingleTodo";

type TProps = {
  todosFullInfo?: TTodo[];
  loading: TLoading;
  handleActive: (id: string) => void;
  handleDel: (id: string) => void;
  handleClearCompleted: () => void;
  handleDate: (ms: number) => string;
};

const ListTodo = ({
  todosFullInfo,
  loading,
  handleActive,
  handleDel,
  handleClearCompleted,
  handleDate,
}: TProps) => {
  return (
    <div className="rounded-lg bg-mainBgLight dark:bg-mainBgDark">
      <div className="h-[328px]">
        {loading === "pending" ? (
          <p className="flex h-full w-full items-center justify-center text-textTodoLight dark:text-textTodoDark">
            Loading...
          </p>
        ) : (
          <ul className="h-full divide-y divide-notActiveLight overflow-y-auto dark:divide-notActiveDark">
            {todosFullInfo?.map((todo) => (
              <SingleTodo
                {...todo}
                handleActive={handleActive}
                handleDel={handleDel}
                handleDate={handleDate}
                key={todo.id}
              />
            ))}
          </ul>
        )}
      </div>
      <div className="flex select-none items-center  justify-between border-t border-t-notActiveLight p-4  text-sm text-textTodoLight dark:border-t-notActiveDark dark:text-textTodoDark">
        <span className="hover:text-hoverLight dark:hover:text-hoverDark">
          {todosFullInfo?.length} items left
        </span>
        <button
          onClick={handleClearCompleted}
          className="hover:text-hoverLight dark:hover:text-hoverDark"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default ListTodo;
