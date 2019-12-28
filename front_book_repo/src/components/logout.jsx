import { useEffect } from "react";
import { logout } from "../services/authService";

const Logout = ({ state }) => {
  useEffect(() => {
    logout();
    window.location = "/login";
  }, []);

  return null;
};

export default Logout;
