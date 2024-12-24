import { Container } from "react-bootstrap";
import "./checkout.css";
import { useEffect, useState } from "react";

export default function Checkout() {
  const [product, setproduct] = useState([]);
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("product")) || [];
    const productsWithQuantity = storedProducts.map((item) => ({
      ...item,
      quantity: item.count || 1,
    }));
    setproduct(productsWithQuantity);
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    const count = Math.max(1, parseInt(newQuantity) || 1);
    setproduct((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              count,
            }
          : item
      )
    );
  };

  return (
    <div className="px-5 py-4">
      <header className=" box-shadow">
        <Container>
          <div className=" py-3 justify-content-around align-items-center d-flex flex-wrap">
            <p className="p-0 m-0 col-md-3 col-6 d-flex justify-content-center">
              Product
            </p>
            <p className="p-0 m-0 col-md-3 col-6 d-flex justify-content-center">
              Price
            </p>
            <p className="p-0 m-0 col-md-3 col-6 d-flex justify-content-center">
              Quantity
            </p>
            <p className="p-0 m-0 col-md-3 col-6 d-flex justify-content-center">
              Subtotal
            </p>
          </div>
        </Container>
      </header>
      <div className="mt-4">
        {product.map((item, index) => (
          <div
            key={index}
            className=" py-3 mt-4  d-flex flex-wrap  row-gap-2 align-items-center box-shadow px-sm-5 px-1"
          >
            <div className="d-flex row-gap-2 gap-2 align-items-center col-md-3 col-6">
              <img
                src={item.images[0].image}
                alt=""
                width={"50px"}
                height={"50px"}
                className="rounded"
              />
              <p className="m-0">{item.title}</p>
            </div>
            <div className="col-md-3 col-6 d-flex justify-content-center">
              <p className="p-0 m-0 ">{item.price}$</p>
            </div>
            <div className="col-md-3 col-6 justify-content-center d-flex">
              <input
                type="number"
                className="inp-number"
                max={item.stock}
                value={item.count}
                onChange={(e) => {
                  handleQuantityChange(item.id, e.target.value);
                }}
              />
            </div>
            <div className="col-md-3 col-6 d-flex justify-content-center">
              <p className="p-0 m-0 ">{item.price * item.count}$</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}