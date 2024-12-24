import { useEffect, useState } from "react";
import { USER, USERS } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";
import Tableshow from "../../../Components/Dashboard/Table";

export default function Users() {
  let [user, setusers] = useState([]);
  let [refrish, setrefrih] = useState(0);
  let [curentcuser, setcurentuser] = useState("");
  let limet = 5;
  let [page, setpage] = useState(1);
  let [total, settotal] = useState();
  let [loading, setloading] = useState(false);

  // Get Current User
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setcurentuser(res.data));
  }, []);

  // Get Users
  useEffect(() => {
    setloading(true);
    Axios.get(`/${USERS}?limit=${limet}&page=${page}`)
      .then((ress) => {
        setusers(ress.data.data);
        settotal(ress.data.total);
      })
      .catch((data) => console.log(data))
      .finally(() => setloading(false));
  }, [refrish, page, limet]);

  const header = [
    {
      name: "User name",
      key: "name",
    },
    {
      name: "Email",
      key: "email",
    },
    {
      name: "Created",
      key: "created_at",
    },
    {
      name: "Updated_At",
      key: "updated_at",
    },
    {
      name: "Role",
      key: "role",
    },
  ];

  return (
    <div className="w-100 p-3 bg-white my-3 low-shadow rounded-3">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Users Page</h1>
        <Link className="btn btn-primary" to={"/dashboard/user/add"}>
          Add User
        </Link>
      </div>
      <Tableshow
        header={header}
        data={user}
        delete={USER}
        curentcuser={curentcuser}
        setdelete={setrefrih}
        limet={limet}
        page={page}
        setpage={setpage}
        total={total}
        loading={loading}
        search={"name"}
      />
    </div>
  );
}
