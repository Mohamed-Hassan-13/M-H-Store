import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { LOGOUT, USER } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { Link, Navigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Cookie from "cookie-universal";

export default function Topbar() {
  let menu = useContext(Menu);
  function open() {
    menu.setisopen((preev) => !preev);
  }
  let isopen = menu.isopen;

  let [name, setname] = useState("");
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setname(data.data.name))
      .catch((err) => Navigate("/login", { replace: true }));
  }, []);

  let cookie = Cookie();

  async function handlelogout() {
    try {
      let ress = await Axios.get(`/${LOGOUT}`);
      cookie.remove("ecoomerce");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="top-bar d-flex align-items-center justify-content-between low-shadow rounded-3 ">
      <div className="d-flex align-items-center justify-content-between gap-5 py-2 w-100">
        <div>
          <Link to={"/"}>
            <img
              src={require("../../Assets/Blue_and_White_Circle_Retail_Logo-removebg-preview.png")}
              alt=""
              width={"150px"}
              className="p-3"
            />
          </Link>
          {/* <Dropdown>
      <Dropdown.Toggle className="bg-primary" variant="success" id="dropdown-basic">
      {name}
      </Dropdown.Toggle>
      
      <Dropdown.Menu>
        <Dropdown.Item onClick={handlelogout} >Logout</Dropdown.Item>

        </Dropdown.Menu>
        </Dropdown> */}
          <FontAwesomeIcon
            onClick={open}
            cursor={"pointer"}
            size="xl"
            icon={faBars}
          />
        </div>
        <h4 className="m-0 fw-bolder">{name}</h4>
      </div>
    </div>
  );
}
