import React from "react";
import Pagination from "./Pagination";
import Product from "../products/Product";
import { getFetch } from "@/utils/fetch";
async function ProductMenu({ params }) {
  const data = await getFetch(`/menu?${params}`);
  return (
    <div className="col-sm-12 col-lg-9">
            <div className="row gx-3">
              {data.products.map(product => (
                <div key={product.id} className="col-sm-6 col-lg-4">
                  <Product product={product}/>
                </div>
              ))}
            </div>
            <nav className="d-flex justify-content-center mt-5">
               <Pagination links={data.meta.links}/>
            </nav>
          </div>
  );
}

export default ProductMenu;
