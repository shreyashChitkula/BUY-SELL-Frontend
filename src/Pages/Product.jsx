import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatNumber } from "../utils/utilities";
import axios from "axios";
import { useUserState } from "../utils/UserState";
import PriceInfoCard from "../Components/PriceInfoCard";
const Product = () => {
  const { addToCart, getUserId } = useUserState();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError(
          err.response ? err.response.data.error : "Failed to fetch the product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  function handleAddToCart() {
    // console.log("userId",getU)
    if (getUserId() == product.seller) {
      alert("You can't buy your own product");
      return;
    }
    addToCart(`${id}`, 1);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <img
            src={product.productImage[0].URL}
            alt={product.productImage[0].alt}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap flex-col pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.name}
              </p>

              <Link
                to="/"
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <img
                  src="/icons/red-heart.svg"
                  alt="heart"
                  width={20}
                  height={20}
                />

                <p className="text-base font-semibold text-[#D46F77]">{24}</p>
              </div>

              <div className="p-2 bg-white-200 rounded-10">
                <img
                  src="/icons/bookmark.svg"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>

              <div className="p-2 bg-white-200 rounded-10">
                <img
                  src="/icons/share.svg"
                  alt="share"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>

          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                ₹ {formatNumber(product.price)}
              </p>
              <p className="text-[21px] text-black opacity-50 line-through">
                ₹ {formatNumber(500)}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <img
                    src="/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-primary-orange font-semibold">
                    {product.stars || "25"}
                  </p>
                </div>

                <div className="product-reviews">
                  <img
                    src="/icons/comment.svg"
                    alt="comment"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-secondary font-semibold">
                    <Link to={`/reviews/${product.seller}`}>
                      Seller Reviews
                    </Link>
                  </p>
                </div>
              </div>

              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">93% </span>{" "}
                of buyers have recommeded this.
              </p>
            </div>
          </div>

          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Actual Price"
                iconSrc="/icons/arrow-up.svg"
                value={`₹ ${formatNumber(500)}`}
              />
              <PriceInfoCard
                title="Selling Price"
                iconSrc="/icons/arrow-down.svg"
                value={`₹ ${formatNumber(product.price)}`}
              />
            </div>
          </div>

          {/* <Modal productId={id} /> */}
        </div>
      </div>

      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl text-secondary font-semibold">
            Product Description
          </h3>

          <div className="flex flex-col gap-4">
            {product.description.content}
            {/* {product?.description?.split("\n")} */}
          </div>
        </div>

        <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
          <img src="/icons/bag.svg" alt="check" width={22} height={22} />

          <span onClick={handleAddToCart} className="text-base text-white">
            Buy Now
          </span>
        </button>
      </div>
      {/* 
      {similarProducts && similarProducts?.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text">Similar Products</p>

          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Product;
