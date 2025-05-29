import React, { useState,useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { dataContext } from "../../context/dataContext.jsx";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ext, setExt] = useState(false);
  const context = useContext(dataContext);
  const data = context.data || [];

  return (
    <div className={`sidebar ${sidebarOpen ? 'extended' : ''}`}>
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt="menuIcon"
          onClick={() => {setExt(!ext);setSidebarOpen(!sidebarOpen)}}
        />
        <div className="new-chat" onClick={()=>context.newChat()}>
          <img src={assets.plus_icon} alt="plus" />
          {ext ? <p>New Chat</p> : null}
        </div>

        {ext && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            <div className='recent-data'>
              {data.slice().reverse().map((item, index) => (
                <div className="recent-entry" key={index} onClick={()=>context.pastChat(item.prompt,item.response)}>
                  <img src={assets.message_icon} alt="msg" />
                  <p title={item.prompt}>{item.prompt}</p>
                </div>
              ))}
            </div>
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
