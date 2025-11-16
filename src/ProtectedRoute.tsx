import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLogin = sessionStorage.getItem("isLogin");

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
