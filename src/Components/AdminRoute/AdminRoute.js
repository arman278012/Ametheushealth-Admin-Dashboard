import React from "react";
import { Route, Navigate } from "react-router-dom";
import axios from "axios";

const AdminRoute = ({ element: Component, ...rest }) => {
  const adminAuth = async () => {
    const token = localStorage.getItem("authorization");
    const id = localStorage.getItem("id");
    if (!token || !id) {
      return false;
    }
    try {
      const response = await axios.get(
        "https://ah-backend-djja.onrender.com/ah/api/v1/user/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      const auth = await adminAuth();
      setIsAuthenticated(auth);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default AdminRoute;
