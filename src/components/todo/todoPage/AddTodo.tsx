import { memo, useRef } from "react";
import { TLoading } from "../../../types";

type TProps = {
  handleAdd: (value: string) => void;
  loading: TLoading;
};

const AddTodo = memo(({ handleAdd, loading }: TProps) => {
  const val = useRef("");
  return (
    <div className="relative">
      <input
        onChange={(e) => (val.current = e.target.value)}
        type="text"
        placeholder="Create a new todo"
        className="w-full rounded-lg bg-mainBgLight px-6 py-4 pl-12 text-base font-normal text-textInputLight focus:outline-none dark:bg-mainBgDark dark:text-textInputDark"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            handleAdd(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
        disabled={loading === "pending"}
      />
      <button
        onClick={() => handleAdd(val.current)}
        className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-notActiveLight dark:border-notActiveDark"
        disabled={loading === "pending"}
      ></button>
    </div>
  );
});

export default AddTodo;
