import { useEffect, useRef, useState } from "react";
import "./Auth.css";
import axios from "axios";
import { BaseUrl, LOGIN } from "../../../../Api/Api";
import Loading from "../../../../Components/Loading/loading";
import Cookie from "cookie-universal";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Login() {
  // Ref
  let foucs = useRef(null);

  useEffect(() => {
    foucs.current.focus();
  }, []);
  // state
  let [form, setform] = useState({
    email: "",
    password: "",
  });
  function formchange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }
  // Loading
  let [loading, setloading] = useState(false);
  // err
  let [err, seterr] = useState("");
  //  Cookies
  let cookie = Cookie();
  //  onsubmit
  async function onsubmit(e) {
    e.preventDefault();
    setloading(true);
    try {
      let ress = await axios.post(`${BaseUrl}/${LOGIN}`, form);
      setloading(false);
      // token
      let token = ress.data.token;
      cookie.set("ecoomerce", token);
      // Role
      let role = ress.data.user.role;
      window.location.pathname =
        role === "1995"
          ? "/dashboard/users"
          : role === "1996"
          ? "/dashboard/writer"
          : role === "1999"
          ? "/dashboard/categores"
          : "/";
    } catch (err) {
      setloading(false);
      if (err.response.status === 401) {
        seterr("Email or Password is Wrong");
      } else {
        seterr("Internal Server Error");
      }
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="d-flex align-items-center" style={{ height: "100vh" }}>
          <Form className="form" onSubmit={onsubmit}>
            <div className="custem-form">
              <h1>Log-in</h1>
              <Form.Group
                className="form-custem"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  ref={foucs}
                  type="email"
                  placeholder="Email:"
                  name="email"
                  value={form.email}
                  onChange={formchange}
                  required
                />
                <Form.Label>Email</Form.Label>
              </Form.Group>
              <Form.Group
                className="form-custem"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={formchange}
                  placeholder="Password"
                  required
                  minLength={8}
                />
                <Form.Label>Password...</Form.Label>
              </Form.Group>
              <Button onClick={onsubmit} variant="primary" size="lg">
                Log in
              </Button>
              <div className="btn-google mt-3">
                <a href={"http://127.0.0.1:8000/login-google"}>
                  <div className="google-icon-wrarber">
                    <img
                      className="google-icon"
                      src="https://pngimg.com/uploads/google/google_PNG19635.png"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Sign in with google</b>
                  </p>
                </a>
              </div>
              <p className="mt-2" style={{ fontSize: "14px" }}>
                I Dont Have Acount <Link to={"/register"}>Register</Link>
              </p>
              {err !== "" && <p className="error">{err}</p>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
