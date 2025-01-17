import React, { useContext, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { theme } from "../../../Context/themContext";

function PaymentPage() {
  const [isFakePaymentDone, setIsFakePaymentDone] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  // Context
  const { Theme } = useContext(theme);

  const handleFakePaymentSubmit = (event) => {
    event.preventDefault();
    console.log("Card Number:", cardNumber);
    console.log("Expiry Date:", expiryDate);
    console.log("CVV:", cvv);
    setIsFakePaymentDone(true);
  };

  const handleStripePaymentSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log(error.message);
    } else {
      console.log("PaymentMethod created:", paymentMethod);
    }
  };

  return (
    <div className="container py-5">
      <div
        className={
          Theme === "dark"
            ? "card shadow-lg bg-dark text-white"
            : "card shadow-lg bg-white text-black "
        }
        style={{ maxWidth: "400px" }}
      >
        <div className="card-body">
          <h5 className="card-title text-center mb-4">
            {!isFakePaymentDone ? "Card Information" : "Payment Form"}
          </h5>

          {!isFakePaymentDone ? (
            <form onSubmit={handleFakePaymentSubmit}>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  Card Number
                </label>
                <input
                  type="text"
                  className={
                    Theme === "dark"
                      ? "form-control text-white"
                      : "form-control"
                  }
                  style={{
                    backgroundColor: "transparent",
                    Color: Theme === "dark" ? "white" : "black",
                    borderColor: Theme === "dark" ? "white" : "black",
                  }}
                  id="cardNumber"
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="expiryDate" className="form-label">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      backgroundColor: "transparent",
                      color: Theme === "dark" ? "white" : "black",
                      borderColor: Theme === "dark" ? "white" : "black",
                    }}
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    style={{
                      backgroundColor: "transparent",
                      color: Theme === "dark" ? "white" : "black",
                      borderColor: Theme === "dark" ? "white" : "black",
                    }}
                    id="cvv"
                    placeholder="XXX"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Pay
              </button>
            </form>
          ) : (
            <form onSubmit={handleStripePaymentSubmit}>
              <div className="mb-4">
                <label className="form-label">Card Information</label>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: Theme === "dark" ? "white" : "#424770",
                        letterSpacing: "0.025em",
                        placeholder: {
                          color: "#aab7c4",
                        },
                      },
                    },
                  }}
                />
              </div>

              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={!stripe}
                >
                  Pay
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
