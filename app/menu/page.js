import Loading from "@/components/menuProduct/Loading";
import ProductMenu from "@/components/menuProduct/ProductMenu";
import CategoriesList from "@/components/menuTop/CategoriesList";
import PriceSort from "@/components/menuTop/PriceSort";
import SearchSort from "@/components/menuTop/SearchSort";
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
           <SearchSort/>      
            <hr />
               <CategoriesList categories={categories}/>
            <hr />
               <PriceSort />
          </div>
          <Suspense key={params.toString()} fallback={<Loading/>}>
          <ProductMenu params={params.toString()}/>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
