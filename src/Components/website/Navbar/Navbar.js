import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl, CAT, LOGOUT, USER } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import SliceCategoryTitle2 from "../../../Helpers/SliceCategoryTitle";
import SkeletonFun from "../../../Skeleton/Skeleton";
import { Dropdown, Modal } from "react-bootstrap";
import { Cart } from "../../../Context/GetDataCartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PlusMinus from "../../btns/plusMinus";
import Cookie from "cookie-universal";
import TransformDate from "../../../Helpers/TransformDate";

export default function NavScroll() {
  let [categories, setcategories] = useState([]);
  let [loading, setloading] = useState(true);
  let [products, setproducts] = useState([]);
  const [show, setShow] = useState(false);
  const [count, setcount] = useState();
  // Context
  const { GetDataCart, setGetDataCart } = useContext(Cart);
  // Cookies
  const cookie = Cookie();
  const tooken = cookie.get("ecoomerce");

  // Logout
  function handleLogout() {
    Axios.get(`${BaseUrl}/${LOGOUT}`);
    cookie.remove("ecoomerce");
    window.location.pathname = "/";
  }
  // Get User
  let [user, setuser] = useState("");
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setuser(data.data))
      .catch((err) => setuser("You are not registered"));
  }, []);

  const Navigate = useNavigate();

  // HandleCheckout
  function HandleCheckout() {
    if (tooken) {
      Navigate("/checkout", { replace: true });
      handleClose();
    } else {
      Navigate("/login", { replace: true });
    }
  }

  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => setcategories(res.data.slice(0, 8)))
      .finally(() => setloading(false));
  }, []);
  useEffect(() => {
    const allproducts = JSON.parse(localStorage.getItem("product")) || [];
    setproducts(allproducts);
  }, [GetDataCart]);
  let ShowProductOnCart = products.map((item, index) => (
    <div
      key={index}
      className=" border-bottom border-2 d-flex flex-column gap-2 py-2"
    >
      <div className="w-100 d-flex align-items-start row-gap-2 flex-wrap  position-relative">
        <div
          className="position-absolute end-0 bg-danger rounded-circle d-flex align-items-center justify-content-center text-white pointer"
          style={{ width: "20px", height: "20px", top: "7px" }}
          onClick={() => DeleteProductFromCart(item)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className="col-sm-4 col-12">
          <img
            src={
              "https://m-h-store-backend-production.up.railway.app" +
              item.images[0].image
            }
            alt=""
            className="rounded-2"
            style={{ height: "80px", objectFit: "cover" }}
          />
        </div>
        <div className="col-sm-8 col-12">
          <h6 className="fw-bold">{item.title}</h6>
          <p
            className="text-truncate m-0 text-muted"
            style={{ fontSize: "14px" }}
          >
            {item.description}
          </p>
          <div className="d-flex gap-2">
            <p className="text-primary fw-bolder m-0">{item.price}$</p>
            <p className=" text-secondary text-decoration-line-through m-0">
              {Math.floor(item.price / (1 - item.discount / 100))}$
            </p>
          </div>
        </div>
      </div>
      <div>
        <PlusMinus
          changeCount={ChangeCount}
          id={item.id}
          productCount={item.count || 1}
          setcount={setcount}
        />
      </div>
    </div>
  ));

  // Delete Product From Cart
  function DeleteProductFromCart(item) {
    const index = products.findIndex((pro) => pro.id === item.id);
    products.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(products));
    setGetDataCart((prev) => !prev);
  }
  // Plus & Minus on Cart
  function ChangeCount(id, btnCount) {
    const allproducts = JSON.parse(localStorage.getItem("product")) || [];
    let FindID = allproducts.find((pro) => pro.id === id);
    FindID.count = btnCount;
    localStorage.setItem("product", JSON.stringify(allproducts));
    setGetDataCart((prev) => !prev);
  }

  let ShowDataCategories = categories.map((cate, index) => (
    <Link key={index} to={"/category"} className="mb-0  hover">
      {SliceCategoryTitle2(cate.title, 10)}
    </Link>
  ));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ShowProductOnCart}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={HandleCheckout} variant="primary">
            Check out
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar
        expand="lg"
        className="bg-body-white low-shadow d-flex flex-column"
      >
        <Container>
          <Navbar.Brand href="#">
            <Link to={"/"}>
              <img
                src={require("../../../Assets/Blue_and_White_Circle_Retail_Logo-removebg-preview.png")}
                alt=""
                width={"150px"}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <div className="d-flex w-100 align-items-center flex-wrap row-gap-2">
              <Nav
                className=" my-2 my-lg-0 col-lg-6 col-12 "
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Form className=" d-flex ms-lg-3 ms-0 w-100 bg-primary ">
                  <Form.Control
                    type="search"
                    placeholder="Search Product"
                    className="py-2 w-100 rounded-0 "
                    aria-label="Search"
                  />
                  <Button className="rounded-0" variant="primary">
                    Search
                  </Button>
                </Form>
              </Nav>
              <div className="d-flex align-items-center gap-3 justify-content-center col-lg-3 col-sm-6 col-12">
                <div onClick={handleShow}>
                  <img
                    className="pointer"
                    width={"30px"}
                    src={require("../../../Assets/shopping-cart.png")}
                    alt=""
                  />
                </div>

                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    <img
                      className="pointer"
                      width={"30px"}
                      src={require("../../../Assets/user.png")}
                      alt=""
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {tooken ? (
                      <>
                        <div className="d-flex justify-content-center text-primary">
                          <h5>
                            {user.role === "1995"
                              ? "Admin"
                              : user.role === "1999"
                              ? "Product Manger"
                              : "User"}
                          </h5>
                        </div>
                        <div className="px-2">
                          <div>
                            <span className="text-primary">Name:</span>{" "}
                            <span>{user.name}</span>
                          </div>
                          <div>
                            <span className="text-primary">Email:</span>{" "}
                            <span>{user.email}</span>
                          </div>
                          <div>
                            <span className="text-primary">Created At:</span>{" "}
                            <span> {TransformDate(user.created_at)}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="d-flex justify-content-center align-items-center">
                        {user}
                      </div>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="col-lg-3  col-sm-6 col-12 justify-content-center d-flex ">
                {!tooken ? (
                  <div className="d-flex align-items-center gap-2">
                    <Link className="btn btn-primary fs-5 " to={"/login"}>
                      Login
                    </Link>
                    <Link className="btn btn-primary fs-5 " to={"/register"}>
                      Register
                    </Link>
                  </div>
                ) : (
                  <div className="d-flex gap-2">
                    <div
                      onClick={handleLogout}
                      className="btn btn-danger fs-5 "
                    >
                      Logout
                    </div>
                    {user.role !== "2001" && (
                      <Link className="btn btn-primary fs-5 " to={"/dashboard"}>
                        Dashboard
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
        <Container>
          <div className="d-flex align-items-center column-gap-4 justify-content-start flex-wrap w-100 ">
            {loading ? (
              <>
                <SkeletonFun classs={""} count={8} height="15px" width="40px" />
              </>
            ) : (
              ShowDataCategories
            )}
            <Link className="hover" to={"/category"}>
              Show All...
            </Link>
          </div>
        </Container>
      </Navbar>
    </>
  );
}
