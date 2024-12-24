import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

export default function (props) {
  let [btn, setbtn] = useState(1);

  useEffect(() => {
    props.setcount(btn);
    if (props.changeCount) {
      props.changeCount(props.id, btn);
    }
  }, [btn]);
  useEffect(() => {
    if (props.productCount) {
      setbtn(props.productCount);
    }
  }, [props.productCount]);

  return (
    <div className="d-flex ">
      <Button
        variant="danger"
        className="rounded-end-0 fw-bold fs-5"
        onClick={() => (btn > 0 ? setbtn((prev) => --prev) : setbtn(0))}
      >
        -
      </Button>
      <input
        type="number"
        min={1}
        max={100}
        value={btn}
        className="border ps-2 fw-bold"
        style={{ width: "60px", outline: "0" }}
        onChange={(e) => {
          e.target.value > 0 ? setbtn(e.target.value) : setbtn(0);
        }}
      />
      <Button
        variant="success"
        className="rounded-start-0 fw-bold fs-5"
        onClick={() => setbtn((prev) => ++prev)}
      >
        +
      </Button>
    </div>
  );
}
