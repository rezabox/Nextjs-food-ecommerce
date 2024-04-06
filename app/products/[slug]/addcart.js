'use client'; 
import { addToCart, removeFromCart } from "@/redux/slices/cardSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function AddCart({product}) {
  const dispatch = useDispatch();
  
  const handleClick = () => {
    dispatch(removeFromCart(product.id))
    dispatch(addToCart({ product , qty: 1 }))
    toast.success('محصول به سبد خرید اضافه شد.')  
  }
  return (
    <div>
      <button onClick={() => handleClick(product)}>
        <i className="bi bi-cart-fill text-white fs-5"></i>
      </button>
    </div>
  );
}

export default AddCart;
