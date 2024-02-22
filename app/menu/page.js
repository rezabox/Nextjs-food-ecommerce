import Loading from "@/components/menuProduct/Loading";
import ProductMenu from "@/components/menuProduct/ProductMenu";
import CategoriesList from "@/components/menuTop/CategoriesList";
import { getFetch } from "@/utils/fetch";
import Image from "next/image";
import { Suspense } from "react";


export default async function MenuPage({ searchParams }) {
  const categories = await getFetch('/categories');
  const params = new URLSearchParams(searchParams)

  return (
    <section className="food_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <div>
              <label className="form-label">جستجو</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="نام محصول ..."
                />
                <a href="#" className="input-group-text">
                  <i className="bi bi-search"></i>
                </a>
              </div>
            </div>
            <hr />
               <CategoriesList categories={categories}/>
            <hr />
            <div>
              <label className="form-label">مرتب سازی</label>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                />
                <label className="form-check-label cursor-pointer">
                  بیشترین قیمت
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                />
                <label className="form-check-label cursor-pointer">
                  کمترین قیمت
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                />
                <label className="form-check-label cursor-pointer">
                  پرفروش ترین
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                />
                <label className="form-check-label cursor-pointer">با تخفیف</label>
              </div>
            </div>
          </div>
          <Suspense key={params.toString()} fallback={<Loading/>}>
          <ProductMenu params={params.toString()}/>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
