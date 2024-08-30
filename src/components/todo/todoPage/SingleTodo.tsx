// svgs
import CrossIcon from "../../../assets/images/icon-cross.svg?react";
import CheckIcon from "../../../assets/images/icon-check.svg?react";

type TProps = {
  active: boolean;
  id?: string;
  todo: string;
  createdAt: number;
  handleDate: (ms: number) => string;
  handleActive: (id: string) => void;
  handleDel: (id: string) => void;
};

const SingleTodo = ({
  active,
  id,
  todo,
  createdAt,
  handleActive,
  handleDate,
  handleDel,
}: TProps) => {
  return (
    <li
      className="flex items-center justify-between p-3 text-[13px] text-textTodoLight hover:text-hoverLight dark:text-textTodoDark  dark:hover:text-hoverDark"
      key={id}
    >
      <div className="flex items-center gap-x-4">
        <div className="h-[22px] w-[22px] select-none rounded-full bg-notActiveLight p-px hover:bg-active dark:bg-notActiveDark">
          <button
            className={
              "flex h-5 w-5  items-center justify-center rounded-full bg-bgLight dark:bg-bgDark " +
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
            (!active
              ? " text-notActiveLight line-through hover:text-notActiveLight dark:text-notActiveDark"
              : "")
          }
          title={todo}
        >
          {todo.length > 25 ? todo.slice(0, 17) + "..." : todo}
        </p>
      </div>
      <div className="flex items-center gap-x-4">
        <span>{handleDate(createdAt)}</span>
        <button
          className="h-4 w-3 select-none"
          onClick={() => (id ? handleDel(id) : null)}
        >
          <CrossIcon />
        </button>
      </div>
    </li>
  );
};

export default SingleTodo;
