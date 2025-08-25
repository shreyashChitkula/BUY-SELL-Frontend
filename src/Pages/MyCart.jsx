import React, { useState, useEffect } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUserState } from "../utils/UserState";

const MyCart = () => {
  const { registerUser, getUser, removeFromCart, updateCartItemQuantity } =
    useUserState();
  const user = getUser();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Calculate total price
  const total =
    user.cartItems?.reduce(
      (acc, item) => acc + item.product.price * (item.quantity || 1),
      0
    ) || 0;

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/api/orders/checkout`,
        {
          userId: user.id,
          products: user.cartItems.map((product) => product.product.id),
        }
      );
      console.log("order", response.data);

      // Clear the cart after successful checkout
      // setCartProducts([]);
      registerUser({ ...user, cartItems: [] });
      setMessage("Order placed successfully");
    } catch (error) {
      setMessage("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart items
  // const getCartItems = async () => {
  //   try {
  //     const response = await axios.get("/api/cart");
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching cart items:", error);
  //     throw error;
  //   }
  // };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Cart</h1>

      {!user.cartItems || user.cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {user.cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center border-b pb-4 hover:bg-gray-50 transition-colors duration-200 p-4 rounded-lg"
            >
              <Link to={`/products/${item.product.id}`}>
                {/* Product Image */}
                <img
                  src={item.product.productImage?.[0]?.URL}
                  alt={item.product.productImage?.[0].alt}
                  className="w-24 h-24 object-cover rounded-md mr-6"
                />
              </Link>

              {/* Product Details */}
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h2>
                <div className="text-gray-600 mt-1">
                  <p>Price: ₹{item?.product?.price?.toFixed(2)}</p>
                  {/* {item.size && <p>Size: {item.size}</p>}
                  {item.color && <p>Color: {item.color}</p>} */}
                </div>
              </div>

              {/* Quantity Control */}
              <div className="flex items-center mr-6">
                <button
                  onClick={() =>
                    updateCartItemQuantity(
                      item.product.id,
                      (item.quantity || 1) - 1
                    )
                  }
                  className="p-2 bg-gray-100 rounded-l-md hover:bg-gray-200"
                >
                  <Minus size={20} />
                </button>
                <span className="px-4 py-2 bg-gray-50 text-lg">
                  {item.quantity || 1}
                </span>
                <button
                  onClick={() =>
                    updateCartItemQuantity(
                      item.product.id,
                      (item.quantity || 1) + 1
                    )
                  }
                  className="p-2 bg-gray-100 rounded-r-md hover:bg-gray-200"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Total for this item */}
              <div className="text-right mr-6">
                <p className="font-bold text-lg">
                ₹{(item?.product?.price * (item.quantity || 1)).toFixed(2)}
                </p>
              </div>

              {/* Remove Item Button */}
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={24} />
              </button>
            </div>
          ))}

          {/* Cart Total */}
          <div className="text-right mt-6 pt-4 border-t">
            <h3 className="text-2xl font-bold text-gray-800">
              Total: ₹{total?.toFixed(2)}
            </h3>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default MyCart;
