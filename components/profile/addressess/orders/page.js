import { getFetch } from "@/utils/fetch";
import { numberFormat } from "@/utils/help";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import Pagination from "./pagination";

async function OrdersPage({ params }) {
  const token = cookies().get("token");
  const data = await getFetch(`/profile/orders?${params}`, {
    Authorization: `Bearer ${token.value}`,
  });
  return (
    <div>
      <div className="col-sm-12 col-lg-12">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>شماره سفارش</th>
                <th>آدرس</th>
                <th>وضعیت</th>
                <th>وضعیت پرداخت</th>
                <th>قیمت کل</th>
                <th>تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order) => (
                <tr key={order.id}>
                  <th>{order.id}</th>
                  <td>{order.address_title}</td>
                  <td>{order.status}</td>
                  <td>
                    <span
                      className={
                        order.payment_status == "موفق"
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {order.payment_status}
                    </span>
                  </td>
                  <td>{numberFormat(order.paying_amount)}تومان</td>
                  <td>{order.created_at}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target={`#modal-${order.id}`}
                    >
                      محصولات
                    </button>
                    <div className="modal fade" id={`modal-${order.id}`}>
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h6 className="modal-title">
                              محصولات سفارش شماره {order.id}
                            </h6>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
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
                                {order.order_items.map((item) => (
                                  <tr key={item.id}>
                                    <th>
                                      <Image
                                        src={item.product_primary_image}
                                        width="80"
                                        height='50'
                                        alt=""
                                      />
                                    </th>
                                    <td className="fw-bold">{item.product_name}</td>
                                    <td>{numberFormat(item.price)} تومان</td>
                                    <td>{item.quantity}</td>
                                    <td>{numberFormat(item.price * item.quantity)} تومان</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav className="d-flex justify-content-center mt-5">
               <Pagination links={data.meta.links}/>
        </nav>
      </div>
    </div>
  );
}

export default OrdersPage;
