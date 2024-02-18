import { getBlurDataURL, numberFormat } from "@/utils/help";
import Image from "next/image";
import React from "react";

function Product({ product }) {
  return (
    <div>
      <div className="box">
        <div>
          <div className="img-box">
            <Image
              className="img-fluid cursor-pointer"
              src={product.primary_image}
              width="100"
              height="65"
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              placeholder="blur"
              blurDataURL={getBlurDataURL()}
              alt="product_image"
            />
          </div>
          <div className="detail-box">
            <h5>{product.name}</h5>
            <p>{product.description}</p>
            <div className="options">
              <h6>
                        {product.is_sale ? (
                                <>
                                  <span>{numberFormat(product.sale_price)}</span>
                                  <del>{numberFormat(product.price)}</del>
                                </>
                            ) : (
                                <>
                                  <span>{numberFormat(product.price)}</span>
                                </>
                            )} 
                <span>تومان</span>
              </h6>
              <a href="">
                <i className="bi bi-cart-fill text-white fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Product;
