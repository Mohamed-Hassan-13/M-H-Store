import { useEffect, useState } from "react";
import { CAT, CATE, PRO, PROD } from "../../../Api/Api";
import Tableshow from "../../../Components/Dashboard/Table";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";

export default function Products() {
  let [refrish, setrefrih] = useState(0);
  let [products, setproducts] = useState([]);
  let limet = 5;
  let [page, setpage] = useState(1);
  let [total, settotal] = useState();
  let [loading, setloading] = useState(false);

  // Get categories
  useEffect(() => {
    setloading(true);
    Axios.get(`/${PRO}?limit=${limet}&page=${page}`)
      .then((ress) => {
        setproducts(ress.data.data);
        settotal(ress.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setloading(false));
  }, [refrish, page, limet]);

  const header = [
    {
      name: "Title",
      key: "title",
    },
    {
      name: "Images",
      key: "images",
    },
    {
      name: "Description",
      key: "description",
    },
    {
      name: "Created_At",
      key: "created_at",
    },
    {
      name: "Updated_At",
      key: "updated_at",
    },
    {
      name: "Price",
      key: "price",
    },
  ];

  return (
    <div className="w-100 p-3 bg-white my-3 low-shadow rounded-3">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Products</h1>
        <Link className="btn btn-primary" to={"/dashboard/product/add"}>
          Add Products
        </Link>
      </div>
      <Tableshow
        header={header}
        data={products}
        delete={PROD}
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
