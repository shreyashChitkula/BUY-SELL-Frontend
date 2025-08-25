import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="product-card">
      <div className="product-card_img-container">
        <img
          src={product.productImage[0].URL}
          alt={product.productImage[0].alt}
          width={200}
          height={200}
          className="product-card_img"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="product-title">{product.name}</h3>

        <div className="flex justify-between">
          <p className="text-black opacity-50 text-lg capitalize">
            {product.category}
          </p>

          <p className="text-black text-lg font-semibold">
            <span>₹</span>
            <span>{product.price}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
