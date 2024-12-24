import { createContext, useState } from "react";

export let Menu = createContext("")

export default function MenuContext({children}){
    let [isopen , setisopen]=useState(true)
    return<Menu.Provider value={{isopen,setisopen}}>{children}</Menu.Provider>;
}