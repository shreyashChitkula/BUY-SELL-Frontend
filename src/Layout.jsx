import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Nav from "./Components/Nav";
import { useUserState } from "./utils/UserState";
import axios from "axios";

function Layout() {
  const { isLoggedIn, registerUser } = useUserState();
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    console.log("User profile fetching");
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("`${process.env.BACKEND_URL}/api/users/profile");
        console.log("signup response", res.data);
        registerUser({ ...res.data.user });
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <Nav />
      <main className="app">
        {isLoggedIn() ? <Outlet /> : <Navigate to="/signUp" />}
      </main>
    </div>
  );
}

export default Layout;
