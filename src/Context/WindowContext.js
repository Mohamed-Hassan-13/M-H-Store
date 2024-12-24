import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext('')

export default function WindowContext({children}){
    const [windowsize , setwindowsize]=useState(window.innerWidth)

    useEffect(()=>{
        function windowwidth(){
            setwindowsize(window.innerWidth)
        }
        window.addEventListener("resize",windowwidth)

        return ()=>{
            window.removeEventListener("resize",windowwidth)
        }
    },[])

    return <WindowSize.Provider value={{windowsize,setwindowsize}}>{children}</WindowSize.Provider>;
}