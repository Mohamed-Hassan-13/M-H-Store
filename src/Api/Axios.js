import axios from "axios";
import { BaseUrl } from "./Api";
import Cookie from "cookie-universal";

const cookie =Cookie()

const token =cookie.get('ecoomerce')
export const Axios =axios.create({
    baseURL:BaseUrl,
    headers:{
        Authorization:`Bearer ${token}` 
    },
})