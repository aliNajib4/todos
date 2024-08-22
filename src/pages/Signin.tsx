import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type TData = {
  email: string;
  password: string;
};

const Signin = () => {
  const { register, handleSubmit } = useForm<TData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<TData> = (data) => console.log(data);

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
              className="flex-grow text-2xl dark:bg-mVD"
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
              className="flex-grow text-2xl dark:bg-mVD"
            />
          </div>
        </div>
        <button
          type="submit"
          className="button mt-10 text-darkD hover:text-mVD"
        >
          sign in
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
