import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { USER } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Loading/loading";

export default function Edituser() {
  // state
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");
  const [disabled, setdisabled] = useState(true);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  // Navigate
  let navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    setloading(true);
    Axios.get(`/${USER}/${id}`)
      .then((data) => {
        setname(data.data.name);
        setemail(data.data.email);
        setrole(data.data.role);
        setloading(false);
      })
      .then(() => setdisabled(false))
      .catch(() => navigate("/dashboard/users/page/404", { replace: true }));
  }, []);

  async function handlesubmit(e) {
    e.preventDefault();
    setloading(true);
    try {
      let ress = await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      });
      navigate("/dashboard/users");
      setloading(false);
    } catch (err) {
      setloading(false);
      seterror("email already exist");
    }
  }

  return (
    <div className="w-100 p-1">
      {loading && <Loading />}
      <h1>EditUser</h1>
      <Form className="w-100" onSubmit={handlesubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
            type="text"
            placeholder="Username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Label htmlFor="formBasicRole">Role</Form.Label>
        <Form.Select
          id="formBasicRole"
          value={role}
          onChange={(e) => setrole(e.target.value)}
          className="mb-3"
          controlId="formBasicRole"
        >
          <option disabled value="">
            {" "}
            Select Role{" "}
          </option>
          <option value="1995">Admin</option>
          <option value="2001">User</option>
          <option value="1999">Product Manger</option>
        </Form.Select>
        <Button variant="primary" type="submit" disabled={disabled}>
          Save
        </Button>
        {error !== "" && <p className="mt-2  error">{error}</p>}
      </Form>
    </div>
  );
}
