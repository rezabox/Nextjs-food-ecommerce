"use client";

import {
  clear_item,
  decrement,
  increment,
  removeFromCart2,
  totalAmountCart,
} from "@/redux/slices/cardSlice";
import { numberFormat, salePercent } from "@/utils/help";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Coupon from "./coupon";
import Address from "./Address";
import Payment from "./Payment";

function page() {
  const state = useSelector((state) => state.shoppingCard);
  const state_p = useSelector(totalAmountCart);
  const [coupon, setCoupon] = useState({ code: "", percent: 0 });
  const [addressId, setAddressId] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      {state.cart.length != 0 ? (
        <section className="single_page_section layout_padding">
          <div className="container">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <div className="row gy-5">
                  <div className="col-12">
                    <div className="table-responsive">
                      <table className="table align-middle">
                        <thead>
                          <tr>
                            <th>محصول</th>
                            <th>نام</th>
                            <th>قیمت</th>
                            <th>تعداد</th>
                            <th>قیمت کل</th>
                          </tr>
                        </thead>
                        <tbody>
                          {state.cart.map((pro) => (
                            <tr key={pro.id}>
                              <th>
                                <Image
                                  src={pro.primary_image}
                                  width="100"
                                  height="65"
                                  alt=""
                                />
                              </th>
                              <td className="fw-bold">{pro.name}</td>
                              <td>
                                <div>
                                  {pro.is_sale ? (
                                    <>
                                      <span>
                                        {numberFormat(pro.sale_price)}
                                      </span>
                                      <del>{numberFormat(pro.price)}</del>
                                    </>
                                  ) : (
                                    <>
                                      <span>{numberFormat(pro.price)}</span>
                                    </>
                                  )}
                                </div>
                                {pro.is_sale ? (
                                  <div className="text-warning fs-6">
                                    {salePercent(pro.price, pro.sale_price)}%
                                    تخفیف
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </td>
                              <td>
                                <div className="input-counter">
                                  <span
                                    className="plus-btn"
                                    onClick={() =>
                                      pro.qty < pro.quantity &&
                                      dispatch(increment(pro.id))
                                    }
                                  >
                                    +
                                  </span>
                                  <div className="input-number">{pro.qty}</div>
                                  <span
                                    className="minus-btn"
                                    onClick={() =>
                                      pro.qty > 1 && dispatch(decrement(pro.id))
                                    }
                                  >
                                    -
                                  </span>
                                </div>
                              </td>
                              <td>
                                {pro.is_sale ? (
                                  <span>
                                    {numberFormat(pro.sale_price * pro.qty)}
                                  </span>
                                ) : (
                                  <span>
                                    {numberFormat(pro.price * pro.qty)}
                                  </span>
                                )}
                                <span className="ms-1">تومان</span>
                              </td>
                              <td>
                                <i
                                  className="bi bi-x text-danger fw-bold fs-4 cursor-pointer"
                                  onClick={() =>
                                    dispatch(removeFromCart2(pro.id))
                                  }
                                ></i>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      className="btn btn-primary mb-4"
                      onClick={() => dispatch(clear_item())}
                    >
                      پاک کردن سبد خرید
                    </button>
                  </div>
                </div>
                <div className="row mt-2 ">
                  <Coupon setCoupon={setCoupon}/>
                  <div className="col-12 col-md-10 d-flex align-items-center justify-content-between">
                  <Address setAddressId={setAddressId}/>
                  </div>
                </div>
                <div className="row justify-content-center mt-5">
                  <div className="col-12 col-md-6">
                    <div className="card">
                      <div className="card-body p-4">
                        <h5 className="card-title fw-bold">مجموع سبد خرید</h5>
                        <ul className="list-group mt-4">
                          <li className="list-group-item d-flex justify-content-between">
                            <div>مجموع قیمت :</div>
                            <div>{numberFormat(state_p)}تومان</div>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <div>
                              تخفیف :
                              <span className="text-danger ms-1">{coupon.percent}%</span>
                            </div>
                            <div className="text-danger">{numberFormat((state_p  * coupon.percent) / 100)} تومان</div>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <div>قیمت پرداختی :</div>
                            <div>{numberFormat(state_p - (state_p  * coupon.percent) / 100)} تومان</div>
                          </li>
                        </ul>
                        <Payment cart={state.cart} coupon={coupon} addressId={addressId}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="cart-empty">
          <div className="text-center">
            <div>
              <i className="bi bi-basket-fill" style={{ fontSize: "80px" }}></i>
            </div>
            <h4 className="text-bold">سبد خرید شما خالی است</h4>
            <Link href="/menu" className="btn btn-outline-dark mt-3">
              مشاهده محصولات
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
