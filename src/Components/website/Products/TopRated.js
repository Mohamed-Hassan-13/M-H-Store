import { useContext, useEffect, useRef, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { TOPRATED } from "../../../Api/Api";
import Product from "./product";
import { Container } from "react-bootstrap";
import SkeletonFun from "../../../Skeleton/Skeleton";
import {
  faAngleLeft,
  faAngleRight,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { theme } from "../../../Context/themContext";

export default function TopRated() {
  let [products, setproducts] = useState([]);
  let [loading, setloading] = useState(true);

  // Context
  const { Theme } = useContext(theme);

  useEffect(() => {
    Axios.get(`${TOPRATED}`)
      .then((res) => setproducts(res.data))
      .finally(() => setloading(false));
  }, []);

  let ShowData = products.map((item, index) => (
    <Product
      key={index}
      title={item.title}
      description={item.description}
      image={item?.images[0]?.image}
      rating={item.rating}
      sale
      price={item.price}
      discount={item.discount}
      id={item.id}
    />
  ));

  let divscroll = useRef(null);
  function toright() {
    divscroll.current.scrollTo({
      left:
        divscroll.current.scrollLeft +
        divscroll.current.parentElement.children[1].children[0].clientWidth,
      behavior: "smooth",
    });
  }
  function toleft() {
    divscroll.current.scrollTo({
      left:
        divscroll.current.scrollLeft -
        divscroll.current.parentElement.children[1].children[0].clientWidth,
      behavior: "smooth",
    });
  }

  return (
    <div
      className={
        Theme === "dark"
          ? "bg-dark overflow-hidden text-white"
          : "bg-light overflow-hidden"
      }
    >
      <Container className="py-5 ">
        <div className="d-flex align-items-center justify-content-between  mb-5">
          <h1 className="">Top Rated</h1>
          <div className="d-flex gap-2">
            <div
              style={{ width: "50px", height: "50px" }}
              className="bg-primary d-flex align-items-center justify-content-center rounded-circle"
              onClick={toleft}
            >
              <FontAwesomeIcon
                icon={faAngleLeft}
                size="2xl"
                color="white"
                cursor={"pointer"}
              />
            </div>
            <div
              style={{ width: "50px", height: "50px" }}
              className="bg-primary d-flex align-items-center justify-content-center rounded-circle"
              onClick={toright}
            >
              <FontAwesomeIcon
                icon={faAngleRight}
                size="2xl"
                color="white"
                cursor={"pointer"}
              />
            </div>
          </div>
        </div>
        <div
          className="d-flex align-items-stretch overflow-auto overflow-y-hidden scrool-primary "
          ref={divscroll}
        >
          {loading ? (
            <>
              <SkeletonFun
                classs={"col-lg-3 col-md-4 col-sm-6 col-12"}
                count={4}
                height="300px"
              />
            </>
          ) : (
            ShowData
          )}
        </div>
        <div className="appdiv d-flex justify-content-end m-2 align-items-center pe-2">
          <Link to="/products" className="text-decoration-none  hoverdiv">
            <span>Show All Products </span>
            <FontAwesomeIcon icon={faRightLong} className="hovericon " />
          </Link>
        </div>
      </Container>
    </div>
  );
}
