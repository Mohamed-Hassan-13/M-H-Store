import {
  faHeadset,
  faMoneyBill1Wave,
  faTag,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import "./Discound.css";

export default function Discound() {
  return (
    <Container className="my-5">
      <div
        className="row justify-content-center row-gap-2 "
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="300"
        data-aos-offset="0"
      >
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 sc-hover">
          <div className="text-center rounded-2 border pt-3 pb-4 h-100">
            <FontAwesomeIcon icon={faTruckFast} color="#0d6efd" size="2xl" />
            <h5 className="fw-bolder mt-2">Free Shipping</h5>
            <p className="text-secondary mb-0 px-5">
              Get Your Orders delivered with no extra cost
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 sc-hover">
          <div className="text-center rounded-2 border pt-3 pb-4 h-100">
            <FontAwesomeIcon icon={faHeadset} color="#0d6efd" size="2xl" />
            <h5 className="fw-bolder mt-2">Support 24/7</h5>
            <p className="text-secondary mb-0  px-5">
              We are here to assist you anytime
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 sc-hover">
          <div className="text-center rounded-2 border pt-3 pb-4 h-100">
            <FontAwesomeIcon
              icon={faMoneyBill1Wave}
              color="#0d6efd"
              size="2xl"
            />
            <h5 className="fw-bolder mt-2">100% Money Back</h5>
            <p className="text-secondary mb-0  px-5">
              Full refund if you are not satisfied
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 sc-hover">
          <div className="text-center rounded-2 border pt-3 pb-4 h-100">
            <FontAwesomeIcon icon={faTag} color="#0d6efd" size="2xl" />
            <h5 className="fw-bolder mt-2">Discount</h5>
            <p className="text-secondary mb-0  px-5">
              Enjoy the best Prices on our products
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
