import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../Components/Form";
import axios from "axios";
import { useUserState } from "../utils/UserState";

function Sell() {
  const navigate = useNavigate();
  const { getUserId } = useUserState();
  const [submitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: { content: "" },
    category: "",
    productImage: [],
  });

  const createProduct = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = axios.post(
        "http://localhost:3000/api/products/product",
        { ...product, sellerId: getUserId() }
      );
      console.log((await response).data);

      if (response.ok) {
        alert("Product created successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
    console.log({ ...product, sellerId: getUserId() });
    navigate("/");
    setIsSubmitting(false);
  };

  return (
    <Form
      type="Sell"
      product={product}
      setProduct={setProduct}
      submitting={submitting}
      handleSubmit={createProduct}
    />
    // <div className="app">Sell</div>
  );
}

export default Sell;
