import React,{ useState,useContext } from "react";
import axios from "axios";
import "./login.css";
import { dataContext } from "../../context/dataContext.jsx";

const Login=()=>{
    const [email1,setEmail] = useState("");
    const [pass1,setPass] = useState("");
    const [loading,setLoading] = useState(false);
    const { login } = useContext(dataContext);
    const loginHandler=async()=>{
        setLoading(true);
        try{
            if(!email1 || !pass1){
                alert("Please enter both email and password");
            }
            const res = await axios.post("https://gemini-clone-9349.vercel.app/api/auth/login",{
                "email":email1, "password":pass1
            });
            if(res.status === 200){
                console.log(res.data.user)
                login(res.data.user.email,res.data.user.username);
                localStorage.setItem("email",email1);
                localStorage.setItem("username",res.data.user.username);
                setLoading(false);
            }
        }
        catch(err){
            console.log("ERROR: ",err);
            setLoading(false);
        }
    }
    return(
        <div className="login">
            <div className="login-title">
                Login
            </div>
            <div className="login-inputs">
                <input type="text" placeholder="Enter email" value={email1} onChange={(e)=>setEmail(e.target.value)} required/>
                <input type="password" placeholder="Enter Password" value={pass1} onChange={(e)=>setPass(e.target.value)} required/>
                <button onClick={loginHandler} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

            </div>
        </div>
    )
};
export default Login;
