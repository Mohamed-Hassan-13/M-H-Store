
import { Outlet } from "react-router-dom";
import Cookie from 'cookie-universal'
export default function Requireback(){

  
  // Token & Cookie
  let cookie = Cookie();
  let token = cookie.get("ecoomerce");


    return(
        token ? window.history.back() : <Outlet/>

    )
}