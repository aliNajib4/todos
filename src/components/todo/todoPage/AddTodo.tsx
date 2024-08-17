import { memo, useRef } from "react";

type TProps = {
  handleAdd: (value: string) => void;
};

const AddTodo = memo(({ handleAdd }: TProps) => {
  const val = useRef("");
  return (
    <div className="relative">
      <input
        onChange={(e) => (val.current = e.target.value)}
        type="text"
        placeholder="Create a new todo"
        className="w-full rounded-lg bg-MLight px-6 py-4 pl-12 text-base font-extrabold text-dark focus:outline-none dark:bg-vDesaturatedD dark:text-lightHD"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            handleAdd(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
      <button
        onClick={() => handleAdd(val.current)}
        className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-vDark dark:border-darkD"
      ></button>
    </div>
  );
});

export default AddTodo;
