import { useEffect, useState } from "react";
import { CAT, CATE } from "../../../Api/Api";
import Tableshow from "../../../Components/Dashboard/Table";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Categores() {
  let [refrish, setrefrih] = useState(0);

  let [categories, setcategories] = useState([]);
  let limet = 5;
  let [page, setpage] = useState(1);
  let [total, settotal] = useState();
  let [loading, setloading] = useState(false);

  // Get categories
  useEffect(() => {
    setloading(true);
    Axios.get(`/${CAT}?limit=${limet}&page=${page}`)
      .then((ress) => {
        setcategories(ress.data.data);
        settotal(ress.data.total);
      })
      .catch((data) => console.log(data))
      .finally(() => setloading(false));
  }, [refrish, page, limet]);

  const header = [
    {
      name: "Title",
      key: "title",
    },
    {
      name: "Image",
      key: "image",
    },
    {
      name: "Created_At",
      key: "created_at",
    },
    {
      name: "Updated_At",
      key: "updated_at",
    },
  ];

  return (
    <div className="w-100 p-3 bg-white my-2 low-shadow rounded-3">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Categores</h1>
        <Link className="btn btn-primary" to={"/dashboard/Categore/add"}>
          Add Category
        </Link>
      </div>

      <Tableshow
        header={header}
        data={categories}
        delete={CATE}
        setdelete={setrefrih}
        limet={limet}
        page={page}
        setpage={setpage}
        total={total}
        loading={loading}
        search={"title"}
      />
    </div>
  );
}
