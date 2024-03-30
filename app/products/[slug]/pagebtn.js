'use client';
import { addToCart, removeFromCart } from "@/redux/slices/cardSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Pagebtn({product}) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleClick = (p) => {
    dispatch(removeFromCart(product.id))
    dispatch(addToCart({ product , qty: quantity }))
    toast.success('محصول به سبد خرید اضافه شد.')
  }
  const addToQun = () => {
    if(quantity <= product.quantity){
      setQuantity(plus => plus + 1);
    }
  }
  const minesToQun = () => {
       if(quantity > 1){
         setQuantity(prev => prev - 1)
       }
  }
  return (
    <div>
      <div className="mt-5 d-flex">
        <button className="btn-add" onClick={() => handleClick(product.id)}>افزودن به سبد خرید</button>
        <div className="input-counter ms-4">
          <span className="plus-btn" onClick={() => addToQun()}>+</span>
          <div className="input-number">{quantity}</div>
          <span className="minus-btn" onClick={() => minesToQun()}>-</span>
        </div>
      </div>
    </div>
  );
}

export default Pagebtn;
