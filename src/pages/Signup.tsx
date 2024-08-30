import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actSignUp, cleanUp } from "../store/auth/authSlice";
import { useEffect } from "react";

type TData = {
  email: string;
  password: string;
};

const Signup = () => {
  const { register, handleSubmit, formState } = useForm<TData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TData> = (data) => {
    dispatch(actSignUp(data));
    if (loading === "succeeded") {
      navigate("/");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(cleanUp());
    };
  }, [dispatch]);
  return (
    <div className="flex h-[600px] flex-col rounded-xl bg-mainBgLight p-5 text-textTodoLight dark:bg-mainBgDark dark:text-textTodoDark">
      <h2 className="text-3xl font-bold">Signup</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-grow flex-col justify-between gap-10 pl-3 pt-3 "
      >
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5 ">
            <div className="flex gap-5">
              <label htmlFor="email" className="text-2xl">
                email:
              </label>
              <input
                type="text"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className="flex-grow text-2xl disabled:text-notActiveLight dark:disabled:text-notActiveDark"
                disabled={loading === "pending" || loading === "succeeded"}
              />
            </div>
            <p className="text-xl capitalize text-red-400">
              {formState.errors.email?.message}
            </p>
          </div>
          <div className="flex flex-col gap-5 ">
            <div className="flex gap-5">
              <label htmlFor="password" className="text-2xl">
                password:
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="flex-grow text-2xl disabled:text-notActiveLight dark:disabled:text-notActiveDark"
                disabled={loading === "pending" || loading === "succeeded"}
              />
            </div>
            <p className="text-xl capitalize text-red-400">
              {formState.errors.password?.message}
            </p>
          </div>
        </div>
        {loading === "failed" && <span>{error}</span>}
        <button
          type="submit"
          className="mx-auto mt-10 w-fit rounded-full border px-5 py-2 text-textTodoLight hover:text-hoverLight disabled:text-notActiveLight dark:text-textTodoDark dark:hover:text-hoverDark dark:disabled:text-notActiveDark"
          disabled={loading === "pending" || loading === "succeeded"}
        >
          {loading === "pending" ? "loading..." : "sign up"}
        </button>
      </form>
      <p className="mt-5 text-center text-lg">
        signin
        <Link to="/signin" className="ml-2 font-bold text-active">
          here
        </Link>
      </p>
    </div>
  );
};

export default Signup;
