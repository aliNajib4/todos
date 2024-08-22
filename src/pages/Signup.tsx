import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type TData = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const { register, handleSubmit, formState } = useForm<TData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<TData> = (data) => console.log(data);

  return (
    <div className="flex h-[600px] flex-col rounded-xl bg-MLight p-5 dark:bg-dark dark:text-MLight">
      <h2 className="text-3xl font-bold">Signup</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-grow flex-col justify-between gap-10 pl-3 pt-3 "
      >
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <label htmlFor="name" className="text-2xl">
                name:
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                className="flex-grow text-2xl dark:bg-mVD"
              />
            </div>
            <p className="text-xl capitalize text-error">
              {formState.errors.name?.message}
            </p>
          </div>
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
                className="flex-grow text-2xl dark:bg-mVD"
              />
            </div>
            <p className="text-xl capitalize text-error">
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
                className="flex-grow text-2xl dark:bg-mVD"
              />
            </div>
            <p className="text-xl capitalize text-error">
              {formState.errors.password?.message}
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="button mt-10 text-darkD hover:text-mVD"
        >
          sign up
        </button>
      </form>
      <p className="mt-5 text-center text-lg">
        signin
        <Link to="/signin" className="ml-2 font-bold text-brightBlue">
          here
        </Link>
      </p>
    </div>
  );
};

export default Signup;
