import Landing from "../../Components/website/Landing/landing";
import LatestSale from "../../Components/website/Products/LatestSaleProduct";
import TopRated from "../../Components/website/Products/TopRated";
import Discound from "./discound/Discound";
export default function Home() {
  return (
    <div>
      <Landing />
      <LatestSale />
      <Discound />
      <TopRated />
    </div>
  );
}
