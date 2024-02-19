"use client"
import Image from "next/image";
import Image1 from '../../app/images/b1.jpg';
import Image2 from '../../app/images/p4.jpg';
import Image3 from '../../app/images/p1.jpg';
import Product from "./Product";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const ProductsTab = ({ tabList,tabPanel }) => {
  return (
    <>
      <section className="food_section layout_padding-bottom p-5">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>منو محصولات</h2>
          </div>
          <Tabs>
          <TabList>
             <ul className="filters_menu">
            {tabList.map((item,index)=> (
              <Tab key={index}>{item}</Tab>
            ))}
             </ul>
          </TabList>
          <div className="filters-content">
           {tabPanel.map((item, index)=>(
            <TabPanel key={index}>
            <div className="row grid">
              {item.map(product => (
                <div key={product.id} className="col-sm-6 col-lg-4">
                  <Product product={product}/>
                </div>
              ))}
            </div>
            </TabPanel>
            ))}
          </div>
          </Tabs>
          <div className="btn-box">
            <Link href='/menu'>مشاهده بیشتر</Link>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductsTab;
