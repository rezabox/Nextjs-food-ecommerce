import Features from "@/components/Features";
import ProductsTab from "@/components/products/ProductsTab";
import { getFetch } from "@/utils/fetch";

export default async function Home() {
  const productList = await getFetch('/products/products-tabs');
  return (
    <>
     <Features/>
     <ProductsTab tabList={productList.tabList} tabPanel={productList.tabPanel}/>
    </>
  );


}
