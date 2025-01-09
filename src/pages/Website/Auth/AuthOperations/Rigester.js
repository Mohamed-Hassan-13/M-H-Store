import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BaseUrl, REGISTER } from "../../../../Api/Api";
import Loading from "../../../../Components/Loading/loading";
import Cookie from "cookie-universal";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  // Ref
  let foucs = useRef(null);

  useEffect(() => {
    foucs.current.focus();
  }, []);
  // state
  let [form, setform] = useState({
    name: "",
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
  // Navigate
  let Navigate = useNavigate();
  //  onsubmit
  async function onsubmit(e) {
    e.preventDefault();
    setloading(true);
    try {
      let ress = await axios.post(`${BaseUrl}/${REGISTER}`, form);
      setloading(false);
      // token
      let token = ress.data.token;
      cookie.set("ecoomerce", token);
      // Role
      let role = ress.data.user.role;
      window.location.pathname =
        role === "1995"
          ? "/dashboard/users"
          : role === "1999"
          ? "/dashboard/categores"
          : "/";
    } catch (err) {
      console.log(err);

      setloading(false);
      if (err.response.status === 422) {
        seterr("Email is Already Been Taken");
      } else {
        seterr("Inervenal Server ERR");
      }
    }
  }

  return (
    <div className="container">
      {loading && <Loading />}
      <div className="d-flex align-items-center" style={{ height: "100vh" }}>
        <Form className="form" onSubmit={onsubmit}>
          <div className="custem-form">
            <h1>Register Now</h1>
            <Form.Group
              className="form-custem"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                ref={foucs}
                type="text"
                name="name"
                value={form.name}
                onChange={formchange}
                required
                placeholder="Enter Your Name.."
              />
              <Form.Label>Name:</Form.Label>
            </Form.Group>
            <Form.Group
              className="form-custem"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={formchange}
                placeholder="Enter Your Email.."
                required
              />
              <Form.Label>Email:</Form.Label>
            </Form.Group>
            <Form.Group
              className="form-custem"
              controlId="exampleForm.ControlInput3"
            >
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={formchange}
                placeholder="Enter Your Password.."
                required
                minLength={8}
              />
              <Form.Label>Password:</Form.Label>
            </Form.Group>
            <Button onClick={onsubmit} variant="primary" size="lg">
              Register
            </Button>
            <p className="mt-2 mb-1" style={{ fontSize: "14px" }}>
              I Already Have Been Acount <Link to={"/login"}>Login</Link>
            </p>
            <div className="btn-google">
              <a
                href={`https://m-h-store-backend-production.up.railway.app/login-google`}
              >
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

            {err !== "" && <p className=" mt-0 error">{err}</p>}
          </div>
        </Form>
      </div>
    </div>
  );
}
