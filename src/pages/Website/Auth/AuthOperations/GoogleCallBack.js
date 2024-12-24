import axios from "axios";
import { useEffect } from "react";
import { BaseUrl, GOOGLE_CALL_BACK } from "../../../../Api/Api";
import { useLocation, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";

export default function GoogleCallBack() {
  const navigate = useNavigate();

  let cookie = Cookie();
  let location = useLocation();

  useEffect(() => {
    async function GoogleCall() {
      try {
        let ress = await axios.get(
          `${BaseUrl}/${GOOGLE_CALL_BACK}${location.search}`
        );
        let tooken = ress.data.access_token;
        cookie.set("ecoomerce", tooken);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, []);

  return <>{navigate("/")}</>;
}
