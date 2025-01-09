import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { CAT } from "../../../Api/Api";
import { Container } from "react-bootstrap";
import SliceCategoryTitle2 from "../../../Helpers/SliceCategoryTitle";
import Skeleton from "react-loading-skeleton";
import SkeletonFun from "../../../Skeleton/Skeleton";

export default function WebsiteCategories() {
  let [categories, setcategories] = useState([]);
  let [loading, setloading] = useState(true);
  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => setcategories(res.data))
      .finally(() => setloading(false));
  }, []);
  let ShowCategoryCard = categories.map((item, index) => (
    <div key={index} className="col-lg-2 col-md-3 col-sm-6 col-12">
      <div className="d-flex justify-content-start align-items-center bg-white p-2 gap-3 rounded-2">
        <img
          src={
            "https://m-h-store-backend-production.up.railway.app" + item.image
          }
          alt="image"
          width={"50px"}
          height={"40px"}
          className=" p-1"
        />
        <p className="mb-0">{SliceCategoryTitle2(item.title, 10)}</p>
      </div>
    </div>
  ));

  return (
    <>
      <div className="bg-light py-5">
        <Container>
          <div className="row  row-gap-3  justify-content-center ">
            {loading ? (
              <>
                <SkeletonFun
                  classs={"col-lg-2 col-md-3 col-sm-6 col-12"}
                  count={13}
                  height="56px"
                />
              </>
            ) : (
              ShowCategoryCard
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
