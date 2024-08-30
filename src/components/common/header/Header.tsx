import { Link } from "react-router-dom";
import DarkIcon from "../../../assets/images/icon-moon.svg?react";
import LightIcon from "../../../assets/images/icon-sun.svg?react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { toggleTheme } from "../../../store/theme/themeSlice";
import { actSignout } from "../../../store/auth/authSlice";
import { cleanUp } from "../../../store/todos/todosSlice";

type TProp = {
  theme: "light" | "dark";
};

const Header = ({ theme }: TProp) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const changeTheme = () => {
    dispatch(toggleTheme());
  };

  const handleSignout = () => {
    dispatch(actSignout());
    dispatch(cleanUp());
  };

  const name = user?.email?.slice(0, user.email?.indexOf("@")) as string;

  return (
    <header className="flex items-center justify-between py-8">
      <Link
        className="text-lg font-bold uppercase text-black sm:text-3xl dark:text-white"
        to="/"
      >
        todo
      </Link>

      {user ? (
        <>
          <div
            className="text-textTodoLight dark:text-textTodoDark"
            title={name}
          >
            {name.length > 10 ? name.slice(0, 10) + "..." : name}
          </div>
          <button
            onClick={handleSignout}
            className="ml-3 select-none rounded-full border p-2 text-sm capitalize text-textTodoLight hover:text-hoverLight dark:text-textTodoDark dark:hover:text-hoverDark"
          >
            signout
          </button>
        </>
      ) : (
        <div>
          <Link
            className="ml-3 select-none rounded-full border p-2 text-sm capitalize  text-textTodoLight hover:text-hoverLight dark:text-textTodoDark dark:hover:text-hoverDark"
            to="/signin"
          >
            sign-in
          </Link>
          <Link
            className="ml-3 select-none rounded-full border p-2 text-sm capitalize  text-textTodoLight hover:text-hoverLight dark:text-textTodoDark dark:hover:text-hoverDark"
            to="/signup"
          >
            sign-up
          </Link>
        </div>
      )}

      <button className="select-none" onClick={changeTheme}>
        {theme === "dark" ? <LightIcon /> : <DarkIcon />}
      </button>
    </header>
  );
};

export default Header;
