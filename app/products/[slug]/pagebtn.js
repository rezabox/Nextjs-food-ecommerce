'use client'
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart, decrement, increment, removeFromCart } from "@/redux/slices/cardSlice";
import { toast } from "react-toastify";

function Pagebtn({product}) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // Load quantity from localStorage on component mount
  useEffect(() => {
    const storedQuantity = localStorage.getItem(`quantity_${product.id}`);
    if (storedQuantity) {
      setQuantity(Number(storedQuantity));
    }
  }, [product.id]);

  // Save quantity to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`quantity_${product.id}`, quantity);
  }, [product.id, quantity]);

  const handleClick = () => {
    dispatch(removeFromCart(product.id));
    dispatch(addToCart({ product , qty: quantity }));
    toast.success('محصول به سبد خرید اضافه شد.');
  };

  const addToQun = () => {
    if(quantity < product.quantity){
      setQuantity(prevQuantity => prevQuantity + 1);
      dispatch(increment(product.id));
    }
  };
 
  const minesToQun = () => {
    if(quantity > 1){
      setQuantity(prevQuantity => prevQuantity - 1);
      dispatch(decrement(product.id));
    }
  };

  return (
    <div>
      <div className="mt-5 d-flex">
        <button className="btn-add" onClick={handleClick}>افزودن به سبد خرید</button>
        <div className="input-counter ms-4">
          <span className="plus-btn" onClick={addToQun}>+</span>
          <div className="input-number">{quantity}</div>
          <span className="minus-btn" onClick={minesToQun}>-</span>
        </div>
      </div>
    </div>
  );
}

export default Pagebtn;
