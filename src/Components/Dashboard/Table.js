import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../Api/Axios";
import PaginatedItems from "../../pages/Dashboard/Pagination/paginate";
import { useEffect, useState } from "react";
import TransformDate from "../../Helpers/TransformDate";

export default function Tableshow(props) {
  let curentcuser = props.curentcuser || {
    name: "",
  };

  // Delete
  async function handledelete(id) {
    try {
      let res = await Axios.delete(`${props.delete}/${id}`);
      props.setdelete((preev) => preev + 1);
    } catch (err) {
      console.log(err);
    }
  }

  // <Start Search>
  let [search, setsearch] = useState("");
  let [date, setdate] = useState("");
  let [Datasearch, setDatasearch] = useState([]);
  let [searchloading, setsearchloading] = useState(false);
  async function Getdatasearch() {
    setsearchloading(true);
    try {
      let res = await Axios.post(`${props.delete}/search?title=${search}`);
      setDatasearch(res.data);
      setsearchloading(false);
    } catch (err) {
      setsearch(false);
    }
  }

  let filterDataByDate =
    date.length !== 0
      ? props.data.filter((item) => TransformDate(item.created_at) === date)
      : props.data;

  let fiterDAtaSearchByDate =
    date.length !== 0
      ? Datasearch.filter((item) => TransformDate(item.created_at) === date)
      : Datasearch;

  let switchData = search.length > 0 ? fiterDAtaSearchByDate : filterDataByDate;

  useEffect(() => {
    let debounce = setTimeout(() => {
      search.length > 0 && Getdatasearch();
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);
  // <End Search>

  // show Header (th)
  let showheader = props.header.map((item, index) => (
    <th key={index}>{item.name}</th>
  ));
  // Show Data (tr)
  let showdata = switchData.map((item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      {props.header.map((item2, index) => (
        <td key={index}>
          {item2.key === "images" ? (
            <div className="d-flex justify-content-start align-items-center flex-wrap gap-1">
              {item[item2.key].map((img, ind) => (
                <img
                  key={ind}
                  style={{ width: "40px", height: "100%" }}
                  src={img.image}
                />
              ))}
            </div>
          ) : item2.key === "image" ? (
            <img
              style={{ width: "40px", height: "25px" }}
              src={
                "https://m-h-store-backend-production.up.railway.app" +
                item.image
              }
            />
          ) : item2.key === "created_at" ? (
            TransformDate(item.created_at)
          ) : item2.key === "updated_at" ? (
            TransformDate(item.updated_at)
          ) : item[item2.key] === "1995" ? (
            "Admin"
          ) : item[item2.key] === "2001" ? (
            "User"
          ) : item[item2.key] === "1999" ? (
            "Product Manger"
          ) : (
            item[item2.key]
          )}
          {curentcuser && item[item2.key] === curentcuser.name && " (You)"}
          {item2.key === "price" && "$"}
        </td>
      ))}
      <td className="d-flex align-items-center gap-3">
        <Link to={`${item.id}`}>
          <FontAwesomeIcon
            size="lg"
            color="#038edc"
            cursor={"pointer"}
            icon={faPenToSquare}
          />
        </Link>

        {item.name !== curentcuser.name && (
          <FontAwesomeIcon
            onClick={() => handledelete(item.id)}
            size="lg"
            color="red"
            cursor="pointer"
            icon={faTrash}
          />
        )}
      </td>
    </tr>
  ));

  return (
    <div>
      <div className="d-flex gap-2">
        <Form.Control
          type="search"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          placeholder="Search By Title.."
          className="my-2"
        />
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setdate(e.target.value)}
          placeholder="Search Here.."
          className="my-2"
        />
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="table-dark">
            <th>id</th>
            {showheader}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.loading ? (
            <tr>
              <td className="text-center fs-4" colSpan={12}>
                Loading...
              </td>
            </tr>
          ) : searchloading ? (
            <tr>
              <td className="text-center fs-4" colSpan={12}>
                Searching...
              </td>
            </tr>
          ) : switchData.length === 0 ? (
            <tr>
              <td className="text-center fs-4" colSpan={12}>
                No results found
              </td>
            </tr>
          ) : (
            showdata
          )}
        </tbody>
      </Table>
      <PaginatedItems
        setpage={props.setpage}
        itemsPerPage={props.limet}
        total={props.total}
      />
    </div>
  );
}
