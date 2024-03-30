'use client'

import { addToCart } from "@/redux/slices/cardSlice";
import { getBlurDataURL, numberFormat, salePercent } from "@/utils/help";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

function Product({ product }) {
  const dispatch = useDispatch()
  const handleClick = (pr) => {
    dispatch(addToCart({ product , qty: 1 }))    
  }

  return (
    <div>
      <div className="box">
        <div>
          <Link href={`/products/${product.slug}`} className="img-box">
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
          </Link>
          <div className="detail-box">
            <h5>{product.name}</h5>
            <p>{product.description}</p>
                {product.is_sale ? (
                  <div className="text-warning fs-6">
                    {salePercent(product.price, product.sale_price)}% تخفیف
                  </div>
                ): <>
                  <br />
                </>}
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
              <button onClick={() => handleClick(product)}>
                <i className="bi bi-cart-fill text-white fs-5"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Product;
