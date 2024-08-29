import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actSignIn, cleanUp } from "../store/auth/authSlice";
import { useEffect } from "react";

type TData = {
  email: string;
  password: string;
};

const Signin = () => {
  const { register, handleSubmit } = useForm<TData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<TData> = (data) => {
    dispatch(actSignIn(data)).unwrap().then(()=>{
      if(loading === "succeeded"){
        navigate("/")
      }
    });
  };

  useEffect(()=>{
    return ()=>{dispatch(cleanUp())}
  }, [dispatch])

  return (
    <div className="flex h-[500px] flex-col rounded-xl bg-MLight p-5 dark:bg-dark dark:text-MLight">
      <h2 className="text-3xl font-bold">Signin</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-grow flex-col justify-between pl-3 pt-3 "
      >
        <div className="flex flex-col gap-10">
          <div className="flex gap-5">
            <label htmlFor="email" className="text-2xl">
              email:
            </label>
            <input
              type="text"
              id="email"
              {...register("email")}
              className="flex-grow text-2xl disabled:text-mVD dark:bg-mVD"
              disabled={loading === "pending" || loading === "succeeded"}
            />
          </div>
          <div className="flex gap-5">
            <label htmlFor="password" className="text-2xl">
              password:
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="flex-grow text-2xl disabled:text-mVD dark:bg-mVD"
              disabled={loading === "pending" || loading === "succeeded"}
            />
          </div>
        </div>
        {loading === "failed" && <span>{error}asdasdasda</span>}
        <button
          type="submit"
          className="button mt-10 text-darkD hover:text-mVD disabled:text-mVD"
          disabled={loading === "pending" || loading === "succeeded"}
        >
          {loading === "pending" ? "loading..." : "sign in"}
        </button>
      </form>
      <p className="mt-5 text-center text-lg">
        create account
        <Link to="/signup" className="ml-2 font-bold text-brightBlue">
          here
        </Link>
      </p>
    </div>
  );
};

export default Signin;
