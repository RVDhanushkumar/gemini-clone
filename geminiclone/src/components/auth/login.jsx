import React,{ useState } from "react";
import axios from "axios";
import "./login.css";

const Login=()=>{
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [loading,setLoading] = useState(false);

    const loginHandler=async()=>{
        setLoading(true);
        try{
            const res = await axios.post("http://localhost:3001/api/auth/login",{
                "email":email, "password":pass
            });
            if(res.status === 200){
                console.log(res.data.user)
                alert('Login successful!');
                localStorage.setItem('email', res.data.user.email);
                localStorage.setItem('username', res.data.user.username);
                
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
                <input type="text" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <input type="password" placeholder="Enter Password" value={pass} onChange={(e)=>setPass(e.target.value)} required/>
                <button onClick={loginHandler} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

            </div>
        </div>
    )
};
export default Login;
