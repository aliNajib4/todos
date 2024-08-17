import { TLoading, TTodo } from "../../../types";
import SingleTodo from "./SingleTodo";

type TProps = {
  todosFullInfo?: TTodo[];
  loading: TLoading;
  error: string | null;
  handleActive: (id: string) => void;
  handleDel: (id: string) => void;
  handleClearCompleted: () => void;
  handleDate: (ms: number) => string;
};

const ListTodo = ({
  todosFullInfo,
  loading,
  error,
  handleActive,
  handleDel,
  handleClearCompleted,
  handleDate,
}: TProps) => {
  return (
    <div className="rounded-lg bg-MLight dark:bg-vDesaturatedD ">
      <ul className="h-[328px] divide-y divide-vDark overflow-y-auto dark:divide-vD">
        {loading === "pending" ? (
          <p>Loading...</p>
        ) : loading === "failed" ? (
          <p>{error}</p>
        ) : (
          todosFullInfo?.map((todo) => (
            <SingleTodo
              {...todo}
              handleActive={handleActive}
              handleDel={handleDel}
              handleDate={handleDate}
            />
          ))
        )}
      </ul>
      <div className="flex select-none items-center  justify-between border-t border-t-dark p-4 text-sm text-vDark dark:border-t-vD dark:text-lightD">
        <span className="hover:text-lightD">
          {todosFullInfo?.length} items left
        </span>
        <button
          onClick={handleClearCompleted}
          className="dark:hover:text-lightHD"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default ListTodo;
