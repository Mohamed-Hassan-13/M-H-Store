import { Link } from "react-router-dom";
import "./403.css";

export default function Eror403({ role }) {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column h-100">
      <div className="title" data-content={404}>
        403 - ACCESS DENIED
      </div>
      <div className="subtitle">
        Oops, you dont have permission to access this page.
      </div>
      <Link
        className="btn btn-primary"
        to={
          role === "1996"
            ? "/dashboard/writer"
            : role === "1999"
            ? "/dashboard/Categores"
            : "/"
        }
      >
        {role === "1999" ? "Go To Products Page" : "Go To Home Page"}
      </Link>
    </div>
  );
}
