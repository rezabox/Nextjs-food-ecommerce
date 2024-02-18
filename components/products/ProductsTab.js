import Image from "next/image";
import Image1 from '../../app/images/b1.jpg';
import Image2 from '../../app/images/p4.jpg';
import Image3 from '../../app/images/p1.jpg';
import Product from "./Product";
import Link from "next/link";

const ProductsTab = ({tabList,tabPanel}) => {
  return (
    <>
      <section className="food_section layout_padding-bottom p-5">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>منو محصولات</h2>
          </div>

          <ul className="filters_menu">
            {tabList.map((item,index)=> (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <div className="filters-content">
           {tabPanel.map((item, index)=>(
            <div key={index} className="row grid">
              {item.map(product => (
                <div key={product.id} className="col-sm-6 col-lg-4">
                  <Product product={product}/>
                </div>
              ))}
            </div>
            ))}
          </div>
          <div className="btn-box">
            <Link href='/menu'>مشاهده بیشتر</Link>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductsTab;
