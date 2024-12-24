import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Dashboard/sidebar";
import Topbar from "../../Components/Dashboard/topbar";
import "./Dashboard.css";
export default function Dashboard() {
  return (
    <div className="d-flex gap-md-3 dashboard">
      <div>
        <Sidebar />
      </div>
      <div className="d-flex flex-column w-100 overflow-hidden">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
}
