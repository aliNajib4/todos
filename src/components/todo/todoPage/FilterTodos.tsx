import { TLoading } from "../../../types";

type TProps = {
  handleStatus: (status: "all" | "active" | "completed") => void;
  loading: TLoading;
  status: string;
};

const FilterTodos = ({ handleStatus, loading, status }: TProps) => {
  return (
    <footer className="select-none rounded-lg bg-mainBgLight p-4 text-textTodoLight dark:bg-mainBgDark dark:text-textTodoDark ">
      <ul className="flex justify-center gap-x-4 ">
        <li>
          <button
            onClick={() => handleStatus("all")}
            className={
              "text-sm font-normal capitalize" +
              (status === "all"
                ? " active"
                : " hover:text-hoverLight dark:hover:text-hoverDark")
            }
            disabled={loading === "pending"}
          >
            all
          </button>
        </li>
        <li>
          <button
            onClick={() => handleStatus("active")}
            className={
              "text-sm font-normal capitalize " +
              (status === "active"
                ? " active"
                : "hover:text-hoverLight dark:hover:text-hoverDark")
            }
            disabled={loading === "pending"}
          >
            active
          </button>
        </li>
        <li>
          <button
            onClick={() => handleStatus("completed")}
            className={
              "text-sm font-normal capitalize " +
              (status === "completed"
                ? " active"
                : "hover:text-hoverLight dark:hover:text-hoverDark")
            }
            disabled={loading === "pending"}
          >
            completed
          </button>
        </li>
      </ul>
    </footer>
  );
};

export default FilterTodos;
