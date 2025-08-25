import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import SearchBar from "../Components/SearchBar";
import HeroCarousel from "../Components/HeroCarousel";
function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3000/api/products/allProducts`).then((res) => {
      console.log("products", res.data);
      setProducts(res.data);
    });
  }, []);
  return (
    <>
      {/* <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Buy & Sell
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center"> @ IIIT Hyderabad</span>
        </h1>
        <p className="desc text-center">
          Your one-stop platform for seamless buying and selling within the
          IIIT-H community
        </p>
        <SearchBar />
        <HeroCarousel />
      </section> */}
      <section className="w-full flex-center flex-col">
        <section className="px-6 md:px-20 py-20">
          <div className="flex max-xl:flex-col gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="head_text text-center">
                Buy & Sell
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center">
                  {" "}
                  @ IIIT Hyderabad
                </span>
              </h1>
              <p className="desc text-center">
                Your one-stop platform for seamless buying and selling within
                the IIIT-H community
              </p>
              <SearchBar products={products} setProducts={setProducts}/>
            </div>

            <HeroCarousel />
          </div>
        </section>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending Products</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
