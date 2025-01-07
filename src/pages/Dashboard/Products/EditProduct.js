import { useEffect, useRef, useState } from "react";
import Loading from "../../../Components/Loading/loading";
import { Axios } from "../../../Api/Axios";
import { BaseUrl, CAT, PROD } from "../../../Api/Api";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  // id
  let { id } = useParams();

  // Navigate
  let navigate = useNavigate();

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

  //   State
  const [loading, setloading] = useState(false);
  const [images, setimages] = useState([]);
  const [imagesServer, setimagesServer] = useState([]);
  const [IdDeleteFromServer, setIdDeleteFromServer] = useState([]);
  const [err, seterr] = useState("");

  useEffect(() => {
    Axios.get(`${PROD}/${id}`)
      .then((data) => {
        setform(data.data[0]);
        setimagesServer(data.data[0].images);
      })
      .catch((err) => console.log(err));
  }, []);

  // Function HandleChange
  function HandleChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }
  // Ref
  let inputopen = useRef(null);
  let foucss = useRef(null);
  let progres = useRef([]);
  let J = useRef(-1);
  let IdDelete = useRef([]);

  useEffect(() => {
    foucss.current.focus();
  }, []);

  // Function Open Input File
  function HandleOpemInput() {
    inputopen.current.click();
  }

  async function handlesubmit(e) {
    e.preventDefault();
    setloading(true);

    try {
      // Delete Image on Save
      for (let i = 0; i < IdDeleteFromServer.length; i++) {
        await Axios.delete(`product-img/${IdDeleteFromServer[i]}`);
      }

      let ress = await Axios.post(`${PROD}/edit/${id}`, form);
      navigate("/dashboard/products");

      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
      seterr(err.response.data.message);
    }
  }

  // Function HandleDelete2
  async function HandleDelete2(img, index) {
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

  // HandleDelete
  async function HandleDelete(img, id) {
    setimagesServer(imagesServer.filter((imgd) => imgd !== img));
    setIdDeleteFromServer((prv) => [...prv, id]);
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
        IdDelete.current[J.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Get All Categoris
  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((ress) => setcategorie(ress.data))
      .catch((data) => console.log(data));
  }, []);

  // Maping
  let showimages = imagesServer.map((img, index) => (
    <div className="border p-2 position-relative mt-2">
      <div
        key={index}
        className="d-flex justify-content-between align-items-center"
      >
        <div className="d-flex justify-content-start gap-2">
          <img
            style={{ width: "80px", height: "100%" }}
            src={
              "https://m-h-store-backend-production.up.railway.app" + img.image
            }
          />
        </div>
        <div style={{ position: "absolute", right: "0px", top: "-10px" }}>
          <Button
            style={{ fontSize: "12px", padding: "0 8px" }}
            onClick={() => HandleDelete(img, img.id)}
            variant="danger"
          >
            X
          </Button>
        </div>
      </div>
    </div>
  ));

  // _____________________________________________
  let showNewimages = images.map((img, index) => (
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
          <Button onClick={() => HandleDelete2(img, index)} variant="danger">
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
        <h1>Edit products</h1>
        <Form onSubmit={handlesubmit}>
          <Form.Group>
            <Form.Label htmlFor="formBasicRole">Category</Form.Label>
            <Form.Select
              ref={foucss}
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
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              name="stock"
              required
              value={form.stock}
              onChange={HandleChange}
              type="text"
              placeholder="Stock..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="images">
            <Form.Label>Images</Form.Label>
            <Form.Control
              ref={inputopen}
              hidden
              multiple
              onChange={HandleImageChange}
              type="file"
            />
          </Form.Group>
          <div
            onClick={HandleOpemInput}
            className="d-flex justify-content-center align-items-center rounded-2 py-2 mb-2 gap-1 w-100 flex-column"
            style={{
              border: "2px dashed #0086fe",
              cursor: "pointer",
            }}
          >
            <img
              src={require("../../../Assets/Upload-PNG-Free-Image.png")}
              alt="Upload Here"
              width={"150px"}
            />
            <p className="fw-bold " style={{ color: "#0086fe" }}>
              Upload Images
            </p>
          </div>
          {err != "" && <p className="text-red fs-6 fw-bold">{err}</p>}
          <div className="d-flex align-items-center flex-row flex-wrap gap-1 mb-2">
            {showimages}
          </div>
          <div className="d-flex align-items-center flex-column gap-2 mb-2">
            {showNewimages}
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
