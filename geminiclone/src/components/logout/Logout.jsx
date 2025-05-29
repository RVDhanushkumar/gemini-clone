import React,{ useContext } from "react";
import "./Logout.css";
import { dataContext } from "../../context/dataContext.jsx";
const Logout= ()=>{
    const { logout,profileClick } = useContext(dataContext);
    const logoutHandler = () =>{
        profileClick();
        logout();
    }

    return(
        <div className="logout" onClick={logoutHandler}>
            <p>Logout</p>
        </div>
    )
}

export default Logout;