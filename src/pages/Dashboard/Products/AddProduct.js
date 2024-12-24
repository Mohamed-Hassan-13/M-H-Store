import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { CAT, CATE, PROD } from "../../../Api/Api";
import Loading from "../../../Components/Loading/loading";

export default function AddCategory() {
  // Category State
  const [categore, setcategorie] = useState([]);
  // Form
  const [form, setform] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock: "",
  });

  // Dummy Form
  let dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 222,
    discount: 0,
    About: "About",
    stock: 0,
  };

  // Function HandleChange
  function HandleChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
    setsent(true);
    if (sent != true) {
      HandleSendForm();
    }
  }
  // States
  const [images, setimages] = useState([]);
  const [err, seterr] = useState("");
  const [sent, setsent] = useState(false);
  const [loading, setloading] = useState(false);
  const [id, setid] = useState("");

  // Ref
  let foucs = useRef(null);
  let openinput = useRef(null);
  let progres = useRef([]);
  let J = useRef(-1);
  let IdDelete = useRef([]);

  useEffect(() => {
    foucs.current.focus();
  }, []);

  // Function Open Input File
  function HandleOpemInput() {
    openinput.current.click();
  }

  // Function HandleEdit
  async function HandleEdit(e) {
    e.preventDefault();
    setloading(true);

    try {
      let res = await Axios.post(`${PROD}/edit/${id}`, form);
      setloading(false);
      window.location.pathname = "/dashboard/products";
    } catch (err) {
      setloading(false);
      seterr(err.response.data.message);
      console.log(err);
    }
  }

  // Function HandleSendForm
  async function HandleSendForm() {
    try {
      let res = await Axios.post(`${PROD}/add`, dummyForm);
      setid(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  // Function HandleImageChange
  async function HandleImageChange(e) {
    setimages((prev) => [...prev, ...e.target.files]);
    let ImageAsFile = e.target.files;
    let data = new FormData();
    for (let i = 0; i < ImageAsFile.length; i++) {
      J.current++;
      data.append("image", ImageAsFile[i]);
      data.append("product_id", id);
      try {
        let res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (ProgressEvent) => {
            let { loaded, total } = ProgressEvent;
            let Parsent = Math.floor((loaded / total) * 100);
            if (Parsent % 10 === 0) {
              progres.current[J.current].style.width = `${Parsent}%`;
              progres.current[J.current].setAttribute("parsent", `${Parsent}%`);
            }
          },
        });
        console.log(res);
        IdDelete.current[J.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Function HandleDelete
  async function HandleDelete(img, index) {
    let FindId = IdDelete.current[index];
    try {
      let res = await Axios.delete(`product-img/${FindId}`);
      setimages(images.filter((imgd) => imgd !== img));
      IdDelete.current = IdDelete.current.filter((i) => i !== FindId);
      J.current--;
    } catch (err) {
      console.log(err);
    }
  }

  // Get All Categoris
  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((ress) => setcategorie(ress.data))
      .catch((data) => console.log(data));
  }, []);

  // Maping
  let showimages = images.map((img, index) => (
    <div className="border p-2 w-100">
      <div
        key={index}
        className="d-flex justify-content-between align-items-center"
      >
        <div className="d-flex justify-content-start gap-2">
          <img
            style={{ width: "80px", height: "100%" }}
            src={URL.createObjectURL(img)}
          />
          <div>
            <p className="mb-1">{img.name}</p>
            <p className="m-0">
              {img.size / 1024 < 900
                ? (img.size / 1024).toFixed(2) + "KB"
                : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
            </p>
          </div>
        </div>
        <div>
          <Button onClick={() => HandleDelete(img, index)} variant="danger">
            Delete
          </Button>
        </div>
      </div>
      <div className="custem-progres">
        <span
          ref={(e) => (progres.current[index] = e)}
          className="liner-progres"
        ></span>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <Loading />}
      <div className="w-100 p-2">
        <h1>Add Category</h1>
        <Form onSubmit={HandleEdit}>
          <Form.Group>
            <Form.Label htmlFor="formBasicRole">Category</Form.Label>
            <Form.Select
              ref={foucs}
              id="formBasicRole"
              value={form.category}
              className="mb-3"
              controlId="category"
              name="category"
              onChange={HandleChange}
            >
              <option disabled value="">
                Select Category
              </option>
              {categore.map((cat, index) => (
                <option value={cat.id} key={index}>
                  {cat.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              required
              minLength={4}
              value={form.title}
              onChange={HandleChange}
              type="text"
              placeholder="Title..."
              disabled={!sent}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              required
              value={form.description}
              onChange={HandleChange}
              type="text"
              placeholder="Description..."
              disabled={!sent}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              required
              value={form.price}
              onChange={HandleChange}
              type="text"
              placeholder="Price..."
              disabled={!sent}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="discount">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              name="discount"
              required
              value={form.discount}
              onChange={HandleChange}
              type="text"
              placeholder="Discount..."
              disabled={!sent}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="About">
            <Form.Label>About</Form.Label>
            <Form.Control
              name="About"
              required
              value={form.About}
              onChange={HandleChange}
              type="text"
              placeholder="About..."
              disabled={!sent}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="About">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              name="stock"
              required
              value={form.stock}
              onChange={HandleChange}
              type="text"
              placeholder="Stock..."
              disabled={!sent}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="images">
            <Form.Label>Images</Form.Label>
            <Form.Control
              ref={openinput}
              hidden
              multiple
              onChange={HandleImageChange}
              type="file"
              disabled={!sent}
            />
          </Form.Group>
          <div
            onClick={HandleOpemInput}
            className="d-flex justify-content-center align-items-center rounded-2 py-2 mb-2 gap-1 w-100 flex-column"
            style={{
              border: sent ? "2px dashed #0086fe" : "2px dashed gray",
              cursor: sent ? "pointer" : "no-drop",
            }}
          >
            <img
              src={require("../../../Assets/Upload-PNG-Free-Image.png")}
              alt="Upload Here"
              width={"150px"}
              style={{ filter: !sent && "grayScale(1)" }}
            />
            <p
              className="fw-bold "
              style={{ color: sent ? "#0086fe" : "gray" }}
            >
              Upload Images
            </p>
          </div>
          {err != "" && <p className="text-red fs-6 fw-bold">{err}</p>}
          <div className="d-flex align-items-center flex-column gap-2 mb-2">
            {showimages}
          </div>
          <Button
            variant="primary"
            type="submit"
            disabled={form.category != "" ? false : true}
          >
            Save
          </Button>
        </Form>
      </div>
    </>
  );
}
