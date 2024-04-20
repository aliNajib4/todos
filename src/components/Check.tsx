import checkIcon from "./assets/images/icon-check.svg";

interface ButtonProps {
  s: string;
  onClic?: () => void;
}

const Button: React.FC<ButtonProps> = ({ s, onClick }) => {
  return (
    <button
      className={
        "absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-vDark " +
        s
      }
      onClick={onClick}
    >
      <img src="" alt="" />
    </button>
  );
};

export default Button;
