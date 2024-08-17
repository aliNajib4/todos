type TProps = {
  handleStatus: (status: "all" | "active" | "completed") => void;
};

const FilterTodos = ({ handleStatus }: TProps) => {
  return (
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
  );
};

export default FilterTodos;
