import { useContext } from "react";
import UserContext from "../context/UserContext";
import Cookies from "js-cookie";
import axios from "axios";

export function useUserState() {
  const { user, setUser } = useContext(UserContext);

  const registerUser = (newUser) => {
    // localStorage.setItem("user", JSON.stringify(user));
    setUser({ ...newUser, loggedIn: true });
    console.log("user changed to ", user);
  };

  const logoutUser = () => {
    // localStorage.removeItem("user");
    setUser({ email: "", loggedIn: false });
    Cookies.remove("token", { path: "/" }); // Specify the correct path
    console.log("user changed to ", user);
  };
  const isLoggedIn = () => {
    console.log("user is logged in ", user.loggedIn);
    return user.loggedIn;
  };
  const getUser = () => {
    return user;
  };
  const getUserId = () => {
    return user.id;
  };

  // Add product to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/users/cart/add`,
        {
          productId,
          quantity,
        }
      );
      console.log("updated cart", response.data);
      registerUser(response.data.user);
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  // Remove product from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/users/cart/remove/${productId}`
      );
      console.log("updated cart", response.data);
      registerUser(response.data.user);
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  };

  // Update product quantity
  const updateCartItemQuantity = async (productId, quantity) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/users/cart/update-quantity`,
        {
          productId,
          quantity,
        }
      );
      console.log("updated cart", response.data);
      registerUser(response.data.user);
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      throw error;
    }
  };

  return {
    registerUser,
    logoutUser,
    isLoggedIn,
    getUser,
    getUserId,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
  };
}
