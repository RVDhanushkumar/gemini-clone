import React, { useState,useEffect,useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import LoginStatus from "../loginStatus/LoginStatus.jsx";
import { dataContext } from "../../context/dataContext.jsx";
import Logout from "../logout/Logout.jsx";

const Main = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [login,setLogin] = useState(false);
  const context = useContext(dataContext);
  const email = context?.email;
  const username = context?.username || localStorage.getItem("username") || "Guest";
  const profile = context?.profile;
  
  useEffect(()=>{
    function check(){
        if(email){
            setLogin(true);
        }else{
          setLogin(false);
        }
    }
    check();
  },[email]);


  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
  }

  const delayPara = (index, newWord) => {
    setTimeout(() => {
      context.updateAnswer((prev) => prev + newWord);
    }, 50 * index);
  };

  const handleMicClick = () => {
    if (!recognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt((prev) => prev + transcript);
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const handleResponse = async () => {
    setLoading(true);
    context.updateAnswer("..");
    context.updatePrompt(prompt);
    setPrompt("");
    try {
  const res = await axios.post("http://localhost:3001/api/res/gemini-res", {
    prompt: prompt,
  });

  console.log("Raw response:", res.data);

  let responseArray;
  try {
    responseArray = res.data.split("**");
  } catch (err) {
    throw new Error("Error splitting response: " + err.message);
  }

  let formated = "";

  try {
    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 1) {
        formated += `<b>${responseArray[i]}</b>`;
      } else {
        formated += responseArray[i];
      }
    }
  } catch (err) {
    throw new Error("Error formatting response: " + err.message);
  }

  let newFormatted = formated.split("*").join("<br>");
  console.log("Formatted:", newFormatted);

  context.saveData(prompt, newFormatted);
  let newResponse = newFormatted.split(" ");
  context.newChat();
  newResponse.forEach((word, index) => {
    delayPara(index, word + " ");
  });
} catch (err) {
  console.error("Caught error:", err);
  context.updateAnswer("Something went wrong. Please try again.");
}
finally{
  setLoading(false);
}
  };

  return (
    <div className="main">
      <div className="nav">
        <div style={{display:"flex"}}>
          <img src={assets.gemini_icon} alt="geminiLogo" style={{width:"30px", height:"auto"}} />
          <p
          onClick={() => {
            context.newChat();
          }}
        >
          Gemini<sup style={{ fontSize: '10px',frontWigth:"800" }}> DK</sup>
        </p>
        </div>
        <div>
          <img src={assets.user_icon} alt="user" onClick={()=>context.profileClick()}/>
          {profile && <Logout />}
        </div>
        
      </div>
      <div className="main-container">
        {context.answer === "" ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, {username || "Guest"}</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  setPrompt(
                    "Suggest beautiful places to see on an upcoming road trip"
                  )
                }
              >
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  setPrompt("Briefly summarize this concept: urban planning")
                }
              >
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  setPrompt(
                    "Brainstorm team bonding activities for our work retreat"
                  )
                }
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  setPrompt("Imporve the readability of the following code")
                }
              >
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="logo" />
              <p>{context.recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="geminiLogo" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p> {context.answer}</p>
              )}
            </div>
          </div>
        )}

        {listening && (
          <div className="listening">
            <p>Listening...</p>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery" title="Coming soon..!!"/>
              <img src={assets.mic_icon} alt="mic" onClick={handleMicClick}/>
              {prompt && (
                <img
                  src={assets.send_icon}
                  alt="send"
                  onClick={handleResponse}
                />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
      {!login && <LoginStatus/>}
      
    </div>
  );
};

export default Main;
