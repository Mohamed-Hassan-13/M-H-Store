import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faShoppingCart,
  faUser,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";
import Cookie from "cookie-universal";
import { Axios } from "../../../Api/Axios";
import { BaseUrl, LOGOUT, USER } from "../../../Api/Api";
import { Cart } from "../../../Context/GetDataCartContext";
import PlusMinus from "../../btns/plusMinus";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TransformDate from "../../../Helpers/TransformDate";
import { theme } from "../../../Context/themContext";

const NavbarTest = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let [products, setproducts] = useState([]);
  const [count, setcount] = useState();
  const [show, setShow] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [loading, setloading] = useState(true);
  const [themelocal, setThemelocal] = useState(
    localStorage.getItem("theme") || "light"
  );

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  function ChangeTheme() {
    const newTheme = themelocal === "light" ? "dark" : "light";
    setThemelocal(newTheme); // تحديث حالة الثيم
    localStorage.setItem("theme", newTheme);
  }
  useEffect(() => {
    setTheme(themelocal);
  }, [themelocal]);

  // Cookies
  const cookie = Cookie();
  const tooken = cookie.get("ecoomerce");

  // Context
  const { Theme, setTheme } = useContext(theme);
  const { GetDataCart, setGetDataCart } = useContext(Cart);

  // Logout
  function handleLogout() {
    Axios.get(`${BaseUrl}/${LOGOUT}`);
    cookie.remove("ecoomerce");
    window.location.pathname = "/";
  }
  // Plus & Minus on Cart
  function ChangeCount(id, btnCount) {
    const allproducts = JSON.parse(localStorage.getItem("product")) || [];
    let FindID = allproducts.find((pro) => pro.id === id);
    FindID.count = btnCount;
    localStorage.setItem("product", JSON.stringify(allproducts));
    setGetDataCart((prev) => !prev);
  }
  // Delete Product From Cart
  function DeleteProductFromCart(item) {
    const index = products.findIndex((pro) => pro.id === item.id);
    products.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(products));
    setGetDataCart((prev) => !prev);
  }

  // Get User
  let [user, setuser] = useState("");
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setuser(data.data))
      .catch((err) => setuser("You are not registered"))
      .finally(() => setloading(false));
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
  // Get Data Cart
  useEffect(() => {
    const allproducts = JSON.parse(localStorage.getItem("product")) || [];
    setproducts(allproducts);
  }, [GetDataCart]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
            className={
              Theme === "dark"
                ? "text-truncate m-0 text-white"
                : "text-truncate m-0 text-muted"
            }
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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          className={Theme === "dark" ? "bg-dark text-white" : ""}
          closeButton
        >
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body className={Theme === "dark" ? "bg-dark text-white" : ""}>
          {ShowProductOnCart}
        </Modal.Body>
        <Modal.Footer className={Theme === "dark" ? "bg-dark text-white" : ""}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={HandleCheckout} variant="primary">
            Check out
          </Button>
        </Modal.Footer>
      </Modal>
      <nav
        className={
          Theme === "dark" ? "bg-dark custom-navbar" : "bg-light custom-navbar"
        }
      >
        <div className="navbar-left">
          <div className="navbar-logo">
            {" "}
            <Link to={"/"}>
              <img
                src={require("../../../Assets/Blue_and_White_Circle_Retail_Logo-removebg-preview.png")}
                alt=""
                width={"120px"}
              />
            </Link>
          </div>
        </div>
        <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <a href="/">Home</a>
          <a href="/">Shop</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
        </div>
        <div className="allright d-flex gap-1 gap-sm-4 gap-lg-5">
          <div>
            <Button variant="primary" onClick={ChangeTheme}>
              Theme
            </Button>
          </div>
          <div className="navbar-right">
            {/* الأيقونات */}
            <div className="navbar-icons">
              <p className="mb-0 pointer" onClick={handleShow}>
                <FontAwesomeIcon icon={faShoppingCart} className="icon" />
                <span className={Theme === "dark" ? "text-white" : "text-dark"}>
                  ({products.length})
                </span>
              </p>
              <div className="profile-container">
                <FontAwesomeIcon
                  icon={faUser}
                  className="icon profile-icon"
                  onClick={toggleProfile}
                />
                {/* القائمة المنبثقة */}
                {isProfileOpen ? (
                  tooken ? (
                    loading ? (
                      <div className="profile-dropdown">
                        <p>Loading....</p>
                      </div>
                    ) : (
                      <div
                        className={
                          Theme === "dark"
                            ? "profile-dropdown bg-dark text-white"
                            : "profile-dropdown"
                        }
                      >
                        <h5>
                          {user.role === "1995"
                            ? "Admin"
                            : user.role === "1999"
                            ? "Product Manger"
                            : "User"}
                        </h5>
                        <p>
                          <span className="text-primary me-1">Name:</span>
                          {user.name}
                        </p>
                        <p>
                          <span className="text-primary me-1">Email:</span>
                          {user.email}
                        </p>
                        <p>
                          <span className="text-primary me-1">Created At:</span>
                          {TransformDate(user.created_at)}
                        </p>
                        <span className="logout" onClick={handleLogout}>
                          Logout
                        </span>
                      </div>
                    )
                  ) : (
                    <div className="profile-dropdown">
                      <p>{user}</p>
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* روابط تسجيل الدخول والتسجيل تظهر في الشاشات الكبيرة فقط */}
            <div className="navbar-auth">
              {!tooken && (
                <>
                  <a href="/login" className="auth-link">
                    Login
                  </a>
                  <a href="/register" className="auth-link">
                    Register
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? (
            <FontAwesomeIcon icon={faTimes} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>
      </nav>
      {user.role !== "2001" ? (
        <Link to="/dashboard" className="admin-dashboard-btn">
          <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
          Dashboard
        </Link>
      ) : (
        ""
      )}
    </>
  );
};

export default NavbarTest;
