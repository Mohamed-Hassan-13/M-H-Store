import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./landing.css";

export default function Landing() {
  return (
    <div
      className="landing-page"
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container>
        <h1 data-aos="fade-down" className="display-3 fw-bold">
          Welcome to Our E-Commerce
        </h1>
        <p data-aos="fade-up" className="lead text-muted">
          Discover the best deals and latest products just for you.
        </p>
        <Button
          data-aos="zoom-in"
          variant="primary"
          size="lg"
          className="mt-3"
          href="/login"
        >
          Get Started
        </Button>
      </Container>
      <div className="wave bg-primary"></div>
    </div>
  );
}
