import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { CATE } from "../../../Api/Api";
import Loading from "../../../Components/Loading/loading";

export default function AddCategory() {
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [loading,setloading]=useState(false)
  
       // Ref
       let foucs = useRef(null)

       useEffect(()=>{
       foucs.current.focus()},[])

  async function onSubmit(e) {
    setloading(true)
    e.preventDefault();
    const form =new FormData()
    form.append("title",title)
    form.append("image",image)
    try {
      let res = await Axios.post(`${CATE}/add`, form);
      console.log(res);
      setloading(false)
      window.location.pathname = "/dashboard/Categores";
    } catch (err) {
      console.log(err);
      setloading(false)
    }
  }
  return (
    <>
    {loading && <Loading/>}
    <div className="w-100 p-2">
      <h1>Add Category</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Title</Form.Label>
          <Form.Control
          ref={foucs}
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
            onChange={(e) => setimage(e.target.files.item(0))}
            type="file"
            placeholder="image"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={ image != '' ? false :true}
        >
          Add Category
        </Button>
      </Form>
    </div>
    </>
  );
}
