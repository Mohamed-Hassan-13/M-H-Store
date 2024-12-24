import { NavLink } from "react-router-dom";
import "./Bars.css";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// ----
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";
import { USER } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { links } from "./Navlink";

export default function Sidebar() {
  let menu = useContext(Menu);
  let isopen = menu.isopen;
  let windowsize = useContext(WindowSize);
  let windowwidth = windowsize.windowsize;

  let [user, setuser] = useState("");
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setuser(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.2)",
          display: windowwidth < "768" && isopen ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar pt-3  rounded-3"
        style={{
          left: windowwidth < "768" ? (isopen ? "0" : "-100%") : "0",
          width: isopen ? "240px" : "fit-content",
          position: windowwidth < "768" ? "fixed" : "sticky",
        }}
      >
        <div
          style={{
            display: isopen ? "block" : "none",
          }}
          className="w-100 text-center"
        >
          <h3>Dashboard</h3>
        </div>
        <div className="d-flex flex-column gap-1 mt-4">
          {links.map(
            (link, index) =>
              link.role.includes(user.role) && (
                <NavLink
                  key={index}
                  to={link.path}
                  className={"d-flex align-items-center gap-2 side-bar-link"}
                >
                  <FontAwesomeIcon
                    icon={link.icon}
                    style={{
                      padding: isopen ? "10px 8px 10px 15px" : "10px 13px",
                    }}
                  />
                  <p
                    style={{
                      display: isopen ? "block" : "none",
                    }}
                    className="m-0"
                  >
                    {link.name}
                  </p>
                </NavLink>
              )
          )}
        </div>
      </div>
    </>
  );
}
