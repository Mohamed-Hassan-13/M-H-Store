import { Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER } from "../../../../Api/Api";
import Loading from "../../../../Components/Loading/loading";
import { Axios } from "../../../../Api/Axios";
import Eror403 from "../Errors/403";
export default function RequireAuth({allowedRole}) {
    const Navigate =useNavigate()
  // Get User
  let [user, setuser] = useState("");
  useEffect(() => {
    Axios
      .get(`/${USER}`)
      .then((data) => setuser(data.data))
      .catch(()=>Navigate('/login',{replace:true}));
  }, []);
  
  // Token & Cookie
  let cookie = Cookie();
  let token = cookie.get("ecoomerce");


  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ):(
      <Eror403 role={user.role}/>
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
