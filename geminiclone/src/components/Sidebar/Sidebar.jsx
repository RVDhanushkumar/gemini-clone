import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import axios from "axios";

const Sidebar = () => {
  const [ext, setExt] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const email = localStorage.getItem("email");
      if (email) {
        try {
          const res = await axios.post("http://localhost:3001/api/prompts/ret", {
            email: email,
          });
          setData(res.data.prompts);
        } catch (err) {
          console.log("ERROR: ", err);
        }
      }
    };

    fetchPrompts();
  }, []);

  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt="menuIcon"
          onClick={() => setExt(!ext)}
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="plus" />
          {ext ? <p>New Chat</p> : null}
        </div>

        {ext && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {data.map((item, index) => (
              <div className="recent-entry" key={index}>
                <img src={assets.message_icon} alt="msg" />
                <p title={item.prompt}>{item.prompt}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="question" />
          {ext && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="activity" />
          {ext && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings" />
          {ext && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
