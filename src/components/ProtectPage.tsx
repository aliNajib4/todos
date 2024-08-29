import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const ProtectPage = ({
  children,
  isUser = true,
}: {
  children: JSX.Element;
  isUser?: boolean;
}) => {
  const user = useAppSelector((state) => state.auth.user);
  if ((user && isUser) || (!user && !isUser)) return children;
  else {
    return <Navigate to={user ? "/" : "/signin"} />;
  }
};

export default ProtectPage;
