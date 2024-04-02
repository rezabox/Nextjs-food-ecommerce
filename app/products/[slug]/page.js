import { getFetch } from "@/utils/fetch";
import { numberFormat, salePercent } from "@/utils/help";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Pagebtn from "./pagebtn";

async function ProductPage({ params }) {
  const product = await getFetch(`/products/${decodeURI(params.slug)}`);
  const productRandom = await getFetch("/random-products?count=4");
  return (
    <div>
      <section className="single_page_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="row gy-5">
                <div className="col-sm-12 col-lg-6">
                  <h3 className="fw-bold mb-4">{product.name}</h3>
                  <h5 className="mb-3">
                    {product.is_sale ? (
                      <>
                        <span>{numberFormat(product.sale_price)}</span>
                        <del>{numberFormat(product.price)}</del>
                      </>
                    ) : (
                      <>
                        <span>{numberFormat(product.price)}</span>
                      </>
                    )}
                    <span>تومان</span>
                    {product.is_sale && (
                      <div className="text-danger fs-6">
                        {salePercent(product.price, product.sale_price)}% تخفیف
                      </div>
                    )}
                  </h5>
                  <p>{product.description}</p>
                  <Pagebtn product={product}/>
                </div>
                <div className="col-sm-12 col-lg-6">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                      ></button>
                      {product.images.map((img, index) => (
                        <button
                          type="button"
                          key={index}
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to={index + 1}
                        ></button>
                      ))}
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <Image
                          src={product.primary_image}
                          width={300}
                          height={300}
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                      {product.images.map((img) => (
                        <div key={img.id} className="carousel-item">
                          <img
                            src={img.image}
                            width={300}
                            height={300}
                            className="d-block w-100"
                            alt="..."
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section className="food_section my-5">
        <div className="container">
          <div className="row gx-3">
            {productRandom.map((item) => (
              <div className="col-sm-6 col-lg-3">
                <div className="box">
                  <div>
                    <Link href={`/products/${item.slug}`} className="img-box cursor-pointer">
                      <Image
                        className="img-fluid"
                        src={item.primary_image}
                        width={500}
                        height={100}
                        alt=""
                      />
                    </Link>
                    <div className="detail-box">
                      <h5>{item.name}</h5>
                      <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ و با استفاده از طراحان گرافیک است.
                      </p>
                      {item.is_sale ? (
                            <div className="text-warning fs-6">
                              {salePercent(item.price, item.sale_price)}%
                              تخفیف
                            </div>
                          ):(
                            <>
                              <br />
                            </>
                          )}
                      <div className="options">
                        <h6>
                          {item.is_sale ? (
                            <>
                              <span>{numberFormat(item.sale_price)}</span>
                              <del>{numberFormat(item.price)}</del>
                            </>
                          ) : (
                            <>
                              <span>{numberFormat(item.price)}</span>
                            </>
                          )}
                          <span>تومان</span>
                          
                        </h6>
                        <a href="">
                          <i className="bi bi-cart-fill text-white fs-5"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;
