import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./landing.css";
import { useContext } from "react";
import { theme } from "../../../Context/themContext";

export default function Landing() {
  // Context
  const { Theme } = useContext(theme);
  return (
    <div
      className={
        Theme === "dark"
          ? "landing-page bg-dark text-light"
          : "landing-page bg-light text-dark"
      }
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
      <Container style={{ zIndex: 3 }}>
        <h1 data-aos="fade-down" className="display-3 fw-bold">
          Welcome to Our E-Commerce
        </h1>
        <p
          data-aos="fade-up"
          className={Theme === "dark" ? "lead text-white" : "lead text-muted"}
        >
          Discover the best deals and latest products just for you.
        </p>
        <Button
          data-aos="zoom-in"
          variant="primary"
          size="lg"
          className="mt-3 border-1 border-white"
          href="/login"
        >
          Get Started
        </Button>
      </Container>
      <div className="wave bg-primary"></div>
    </div>
  );
}
