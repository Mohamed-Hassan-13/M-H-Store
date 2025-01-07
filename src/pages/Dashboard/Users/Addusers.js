import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { USER } from "../../../Api/Api";

export default function AddUser() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("");

  // Ref
  let foucs = useRef(null);

  useEffect(() => {
    foucs.current.focus();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let res = await Axios.post(`${USER}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      console.log(res);

      window.location.pathname = "/dashboard/users";
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="w-100 p-2">
      <h1>Add user</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            ref={foucs}
            required
            minLength={4}
            value={name}
            onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            minLength={8}
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Label>Role</Form.Label>
        <Form.Select
          id="formBasicRole"
          value={role}
          onChange={(e) => setrole(e.target.value)}
          className="mb-3"
          controlId="formBasicRole"
        >
          <option disabled value="">
            Select Role
          </option>
          <option value="1995">Admin</option>
          <option value="2001">User</option>
          <option value="1999">Product Manger</option>
        </Form.Select>
        <Button
          variant="primary"
          type="submit"
          disabled={role != "" ? false : true}
        >
          Add User
        </Button>
      </Form>
    </div>
  );
}
