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
          className={"font-bold" + (!active ? " text-vDark line-through" : "")}
        >
          {todo}
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