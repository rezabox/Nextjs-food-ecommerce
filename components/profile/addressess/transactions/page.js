import { getFetch } from "@/utils/fetch";
import { numberFormat } from "@/utils/help";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import Pagination from "./pagination";

async function OrdersPage({ params }) {
  const token = cookies().get("token");
  const data = await getFetch(`/profile/transactions?${params}`, {
    Authorization: `Bearer ${token.value}`,
  });
  console.log(token.value);
  return (
    <div>
      <div className="col-sm-12 col-lg-12">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>شماره سفارش</th>
                <th>مبلغ</th>
                <th>وضعیت</th>
                <th>شماره پیگیری</th>
                <th>تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.map((trans) => (
                <tr key={trans.id}>
                  <th>{trans.order_id}</th>
                  <td>{numberFormat(trans.amount)}</td>
                  <td>
                    <span
                      className={
                        trans.status == "موفق"
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {trans.status}
                    </span>
                  </td>
                  <td>{trans.trans_id}</td>
                  <td>{trans.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav className="d-flex justify-content-center mt-5">
          <Pagination links={data.meta.links} />
        </nav>
      </div>
    </div>
  );
}

export default OrdersPage;
