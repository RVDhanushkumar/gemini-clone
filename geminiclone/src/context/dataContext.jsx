import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const dataContext = createContext();

const DataState = (props) => {
  const [email, setEmail] = useState("");
  const [c,setC] = useState(0);
  const [username, setUsername] = useState("");
  const [profile,setProfile] = useState(false);
  const [data, setData] = useState([]);
  const [answer,setAnswer] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedUsername = localStorage.getItem("username");
    if (storedEmail) {
      setEmail(storedEmail);
      setUsername(storedUsername);
    }
  }, []);

  const login = (email, username) => {
    setEmail(email);
    setUsername(username);
  };

  const logout = ()=>{
    setEmail("");
    setUsername("");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
  }

  const profileClick =()=>{
    setProfile(!profile);
  }

  const saveData = async(prompt,newFormatted)=>{
    setC(c+1);
    try{
        const res = await axios.post("https://gemini-clone-9349.vercel.app/api/prompts/save",{
            "email":email,"prompt":prompt,"response":newFormatted
        });
        console.log("Data Saved");
    }
    catch(err){
        console.log("ERROR: ",err);
    }

  }
  const newChat = ()=>{
    setAnswer("");
  }

  const updateAnswer = (newdata)=>{
    setAnswer(newdata);
  }

  const updatePrompt=(newPrompt)=>{
    setRecentPrompt(newPrompt);
  }

  const pastChat = (pro,res) =>{
    setRecentPrompt(pro);
    setAnswer(res);
  }

  useEffect(() => {
    const fetchPrompts = async () => {
      if (email) {
        try {
          const res = await axios.post("https://gemini-clone-9349.vercel.app/api/prompts/ret", {
            email: email,
          });
          setUsername(res.username);
          setData(res.data.prompts);
          console.log(res);
        } catch (err) {
          console.log("ERROR: ", err);
        }
      } else {
        setData([]);
      }
    };

    fetchPrompts();
  }, [email,c]);

  return (
    <dataContext.Provider value={{ email, username, data, profile, answer, recentPrompt, login, logout, profileClick, saveData, newChat, updateAnswer, updatePrompt, pastChat}}>
      {props.children}
    </dataContext.Provider>
  );
};

export default DataState;
