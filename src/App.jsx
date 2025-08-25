import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import About from "./Pages/About";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Sell from "./Pages/Sell";
import Profile from "./Pages/Profile";
import Layout from "./Layout";
import Product from "./Pages/Product";
import Reviews from "./Pages/Reviews";
import MyCart from "./Pages/MyCart";
import Deliveries from "./Pages/Deliveries";
import Orders from "./Pages/Orders";
import { UserContextProvider } from "./context/UserContext";
function App() {
  return (
    <>
      <UserContextProvider>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="create-sell" element={<Sell />} />
              <Route path="profile" element={<Profile />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="reviews/:id" element={<Reviews />} />
              <Route path="/cart" element={<MyCart />} />
              <Route path="/cart" element={<MyCart />} />
              <Route path="/deliveries" element={<Deliveries />} />
              <Route path="/orders" element={<Orders />} />
            </Route>
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
