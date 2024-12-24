import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./landing.css";

export default function Landing() {
  return (
    <div className="d-flex align-items-center justify-content-between hand">
      <Container>
        <div className="col-md-6 col-12">
          <h1
            className="text-primary great-vibes-regular"
            style={{ fontSize: "65px" }}
          >
            M&H Shop
          </h1>
          <h5 className="fw-normal text-light">
            Welcome, we are honored to be your first choice. See what our
            customers say, trust first. We serve you professionally and
            honestly.
          </h5>
          <Link
            to={"/shop"}
            className="btn btn-primary mt-3 px-3 py-3 text-light fw-bold"
          >
            {" "}
            Shop Now
          </Link>
        </div>
      </Container>
    </div>
  );
}
