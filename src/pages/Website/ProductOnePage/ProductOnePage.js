import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { CART, PROD } from "../../../Api/Api";
import { Container, Toast } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import SkeletonFun from "../../../Skeleton/Skeleton";
import { Cart } from "../../../Context/GetDataCartContext";
import PlusMinus from "../../../Components/btns/plusMinus";

export default function ProductOnePage() {
  let [product, setproduct] = useState();
  let [productImages, setproductImages] = useState([]);
  let [productRating, setproductRating] = useState();
  let [loading, setloading] = useState(true);
  let [count, setcount] = useState("");
  let [stock, setstock] = useState(false);
  let [LoadingCart, setLoadingCart] = useState(false);
  let [error, seterror] = useState(false);
  const { setGetDataCart } = useContext(Cart);
  const [showToast, setShowToast] = useState(false);
  const addToCart = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  let { id } = useParams();

  useEffect(() => {
    Axios.get(`${PROD}/${id}`)
      .then((res) => {
        setproductImages(
          res.data[0].images.map((img) => {
            return {
              original:
                "https://m-h-store-backend-production.up.railway.app" +
                img.image,
              thumbnail:
                "https://m-h-store-backend-production.up.railway.app" +
                img.image,
            };
          })
        );
        setproduct(res.data[0]);
        setproductRating(res.data[0].rating);
      })
      .catch((err) => console.log(err))
      .finally(() => setloading(false));
  }, []);

  let RoundStar = Math.round(productRating);
  let Stars = Math.min(RoundStar, 5);
  let ShowGoldStars = Array.from({ length: Stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={solid} color="gold" />
  ));
  let ShowEmptyStars = Array.from({ length: 5 - Stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));
  // CheckCount
  async function CheckCount() {
    setLoadingCart(true);
    let GetData = JSON.parse(localStorage.getItem("product")) || [];
    let productCount = GetData.find((pro) => pro.id === product.id)?.count;
    try {
      await Axios.post(`/${CART}/check`, {
        product_id: product.id,
        count: count + (productCount ? productCount : 0),
      });
      setstock(true);
      return true;
    } catch (err) {
      setstock(false);
      return false;
    } finally {
      setLoadingCart(false);
    }
  }

  async function HandleSave() {
    let Check = await CheckCount();
    if (Check) {
      let GetData = JSON.parse(localStorage.getItem("product")) || [];
      const extingproduct = GetData.find((pro) => pro.id === product.id);

      if (extingproduct) {
        if (extingproduct.count) {
          extingproduct.count = extingproduct.count + count;
        } else {
          extingproduct.count = count + 1;
        }
      } else {
        if (count > 1) {
          product.count = count;
        }
        GetData.push(product);
      }

      localStorage.setItem("product", JSON.stringify(GetData));

      setGetDataCart((prev) => !prev);
    }
    // Natfction Add
    addToCart();
  }

  return (
    <>
      {/* Notification of the operation */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        animation={true}
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translate(-50%, 0)",
          zIndex: 1050,
          width: "auto",
        }}
      >
        <Toast.Body className="bg-white rounded-2 d-flex align-items-center">
          <>
            {stock ? (
              // Notification of the success of the operation
              <div className="checkmark-wrapper">
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="checkmark-circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="checkmark-check"
                    fill="none"
                    d="M14 27l8 8 16-16"
                  />
                </svg>
              </div>
            ) : (
              // Notification of operation failure
              <div className="errormark-wrapper">
                <svg
                  className="errormark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="errormark-circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="errormark-line1"
                    fill="none"
                    d="M16 16L36 36"
                  />
                  <path
                    className="errormark-line2"
                    fill="none"
                    d="M36 16L16 36"
                  />
                </svg>
              </div>
            )}
          </>
          <p className="m-0 fs-6 fw-bold">
            {stock ? "Product Added Successfully!" : "No more this product"}
          </p>
        </Toast.Body>
      </Toast>
      <Container>
        {/* SkeletonFun */}
        <div className="d-flex justify-align-content-between flex-wrap py-4">
          {loading ? (
            <>
              <div className=" col-md-6 col-12">
                <SkeletonFun count={1} classs={"col-12"} height={"250px"} />
                <div className=" col-12 d-flex mt-1">
                  <SkeletonFun count={1} classs={"col-4"} height={"100px"} />
                  <SkeletonFun count={1} classs={"col-4"} height={"100px"} />
                  <SkeletonFun count={1} classs={"col-4"} height={"100px"} />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <SkeletonFun count={1} classs={"col-12"} height={"40px"} />
                <SkeletonFun count={1} classs={"col-12"} height={"10px"} />
                <SkeletonFun count={1} classs={"col-12"} height={"90px"} />
                <SkeletonFun count={1} classs={"col-12"} height={"3px"} />
                <SkeletonFun count={1} classs={"col-12"} height={"60px"} />
              </div>
            </>
          ) : (
            <>
              {/* ImageGallery */}
              <div className="col-md-6 col-12 ">
                <div className="me-md-3">
                  <ImageGallery
                    items={productImages}
                    additionalClass={"image"}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 ">
                <div className="ms-md-3">
                  <div>
                    <h1 className="mb-1 fw-bolder">{product.title}</h1>
                  </div>
                  <div>
                    <p
                      className="text-muted mb-2 "
                      style={{ fontSize: "13px" }}
                    >
                      {product.About}
                    </p>
                  </div>

                  <div className="border-bottom">
                    <h5>{product.description}</h5>
                  </div>
                  <div>
                    {product.stock === 1 && (
                      <p className="text-danger">There is Only 1 Left</p>
                    )}
                  </div>
                  <div className="mt-4">
                    {ShowGoldStars}
                    {ShowEmptyStars}
                  </div>
                  <div className="d-flex align-items-center flex-wrap row-gap-2 ">
                    <div className="d-flex align-items-center gap-2 col-lg-6 col-sm-4 col-12">
                      <p className="text-primary fw-bolder m-0">
                        {product.price}$
                      </p>
                      <p className=" text-secondary text-decoration-line-through m-0">
                        {Math.floor(
                          product.price / (1 - product.discount / 100)
                        )}
                        $
                      </p>
                    </div>
                    {product.stock === 0 ? (
                      <div className="col-lg-6 col-sm-8 col-12 fw-bold fs-5">
                        The Product is Unavilable
                      </div>
                    ) : (
                      <div className="d-flex align-items-center justify-content-sm-end col-lg-6 col-sm-8 col-12 gap-3">
                        <PlusMinus setcount={(data) => setcount(data)} />
                        <div className="p-2 border border-black rounded-2 hover-cart pointer">
                          {LoadingCart ? (
                            "Loading"
                          ) : (
                            <img
                              onClick={HandleSave}
                              src={require("../../../Assets/shopping-cart.png")}
                              width={"20px"}
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
