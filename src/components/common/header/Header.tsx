import DarkIcon from "../../../assets/images/icon-moon.svg?react";
import LightIcon from "../../../assets/images/icon-sun.svg?react";
import { useAppDispatch } from "../../../store/hooks";
import { toggleTheme } from "../../../store/theme/themeSlice";

type TProp = {
  theme: "light" | "dark";
};

const Header = ({ theme }: TProp) => {
  const dispatch = useAppDispatch();

  const changeTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className="flex items-center justify-between py-8">
      <div className="text-3xl font-bold uppercase text-MLight">todo</div>
      <button className="select-none" onClick={changeTheme}>
        {theme === "dark" ? <LightIcon /> : <DarkIcon />}
      </button>
    </header>
  );
};

export default Header;
