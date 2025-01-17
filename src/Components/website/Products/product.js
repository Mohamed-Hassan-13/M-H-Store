import { faCartPlus, faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { theme } from "../../../Context/themContext";

export default function Product(props) {
  let RoundStar = Math.round(props.rating);
  let Stars = Math.min(RoundStar, 5);
  let ShowGoldStars = Array.from({ length: Stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={solid} color="gold" />
  ));
  let ShowEmptyStars = Array.from({ length: 5 - Stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} color="black" />
  ));

  const { Theme } = useContext(theme);

  return (
    <NavLink
      to={`/product/${props.id}`}
      key={props.key}
      className="col-lg-3 col-md-4 col-sm-6 col-12"
      data-aos="zoom-in-up"
    >
      <div
        className={
          Theme === "dark"
            ? " rounded-2 border p-3 mx-1 h-100 bg-dark text-light"
            : " rounded-2 border p-3 mx-1 h-100 "
        }
      >
        <div>
          <p className="text-secondary text-truncate">{props.title}</p>
          <p
            className={
              Theme === "dark"
                ? "m-0 text-truncate text-white"
                : "m-0 text-truncate text-black"
            }
          >
            {props.description}
          </p>
        </div>
        <div className="py-2">
          {props.sale && (
            <p
              className="rounded-circle bg-primary position-relative m-0 p-0 text-center text-white fw-bold"
              style={{ width: "50px ", height: "50px", lineHeight: "50px" }}
            >
              SALE
            </p>
          )}
          <img
            src={
              "https://m-h-store-backend-production.up.railway.app" +
              props.image
            }
            className="img-fluid "
            alt=""
          />
        </div>
        <div className="d-flex justify-content-between align-items-center border-top pt-2">
          <div className="d-flex flex-column gap-1">
            <div className="d-flex justify-content-start align-items-center">
              {ShowGoldStars}
              {ShowEmptyStars}
            </div>
            <div className="d-flex align-items-center gap-1">
              <h5 className="text-primary fw-bolder m-0">{props.price}$</h5>
              <h6 className=" text-secondary text-decoration-line-through m-0">
                {Math.floor(props.price / (1 - props.discount / 100))}$
              </h6>
            </div>
          </div>
          <div
            className={
              Theme === "dark"
                ? "p-2 border border-white rounded-2 hover-cart"
                : "p-2 border border-black rounded-2 hover-cart"
            }
          >
            <FontAwesomeIcon icon={faCartPlus} size="lg" />
          </div>
        </div>
      </div>
    </NavLink>
  );
}
