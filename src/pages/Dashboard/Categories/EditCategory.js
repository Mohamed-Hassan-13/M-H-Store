import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { CATE } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Loading/loading";

export default function EditCategory() {
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [loading, setloading] = useState();
  const [disabled, setdisabled] = useState(true);
  const [showimage, setshowimage] = useState("");

  let { id } = useParams();

  // Navigate
  let navigate = useNavigate();

  useEffect(() => {
    setloading(true);
    Axios.get(`/${CATE}/${id}`)
      .then((data) => {
        settitle(data.data.title);
        setimage(
          "https://m-h-store-backend-production.up.railway.app" +
            data.data.image
        );
        setloading(false);
      })
      .then(() => setdisabled(false))
      .catch(() =>
        navigate("/dashboard/categores/page/404", { replace: true })
      );
  }, []);

  async function handlesubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);

    setloading(true);
    try {
      let ress = await Axios.post(`${CATE}/edit/${id}`, form);
      navigate("/dashboard/categores");
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  }

  return (
    <div className="w-100 p-2">
      {loading && <Loading />}
      <h1>Edit Category</h1>
      <Form onSubmit={handlesubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            minLength={4}
            value={title}
            onChange={(e) => settitle(e.target.value)}
            type="text"
            placeholder="Enter Title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Image</Form.Label>
          <Form.Control
            required
            onChange={(e) => {
              setimage(e.target.files[0]);
              setshowimage(URL.createObjectURL(e.target.files[0]));
            }}
            type="file"
            placeholder="image"
          />
        </Form.Group>
        <div className="mb-3">
          <img
            src={showimage === "" ? image : showimage}
            alt=""
            style={{
              width: "80px",
              height: "50px",
            }}
          />
        </div>
        <Button variant="primary" type="submit" disabled={disabled}>
          Save
        </Button>
      </Form>
    </div>
  );
}
