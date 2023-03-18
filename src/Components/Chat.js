import { Button, TextField } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addChatMessagesHelper,
  addChatMessagesUser,
  getChatMessages,
} from "../Routes/Login/AuthService";
import "./Chat.css";

const Chat = (props) => {
  const bottomRef = useRef(null);
  const [sendMessage, setsendMessage] = useState({
    sender: "user",
    message: "",
  });
  const [messageList, setmessageList] = useState([]);

  const getMessagesUser = async () => {
    try {
      await getChatMessages(
        localStorage.getItem("UserID"),
        props.data,
      ).then((response) => {
        setmessageList(response.data.messages);
      });
    } catch (error) {
      console.error("error", error);
    }
  };
  const getMessagesHelper = async () => {
    try {
      await getChatMessages(
        localStorage.getItem("HelperID"),
        props.data,
      ).then((response) => {
        setmessageList(response.data.messages);
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    setInterval(
      () =>
        localStorage.getItem("UserType") === "Customer"
          ? getMessagesUser()
          : getMessagesHelper(),
      2000
    );
  }, []);

  const handleChatSendUser = async () => {
    setmessageList([...messageList, sendMessage]);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    try {
      await addChatMessagesUser(
        localStorage.getItem("UserID"),
        props.data,
        sendMessage.message
      ).then((response) => {
        setmessageList([...messageList, sendMessage]);
        setsendMessage({ ...sendMessage, message: "" });
      });
    } catch (error) {
      console.error("error", error);
    }
  };
  const handleChatSendHelper = async () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    try {
      await addChatMessagesHelper(
        props.data,
        localStorage.getItem("HelperID"),
        sendMessage.message
      ).then((response) => {
        setmessageList([...messageList, sendMessage]);
        setsendMessage({ ...sendMessage, message: "" });
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  const navigate = useNavigate();
  console.log(messageList);
  return (
    <div className="chat">
      <div className="chat-logo">LOGO</div>
      <div className="chat-container">
        <div className="chat-header">
          <div className="sender-name">{props.name}</div>
        </div>
        <div className="chat-window">
          <div className="chat-innerwindow">
            {localStorage.getItem("UserType") === "Customer"
              ? messageList.map((message) => (
                  <div className={`chat-${message.sender}`}>
                    {message.message}
                  </div>
                ))
              : messageList.map((message) => (
                  <div
                    className={`chat-${
                      message.sender === "helper" ? "user" : "helper"
                    }`}
                  >
                    {message.message}
                  </div>
                ))}
            <span
              style={{ height: "20px" }}
              className="chat-bottom-space"
              ref={bottomRef}
            />
            <span></span>
          </div>
        </div>
        <div className="footer">
          {localStorage.getItem("UserType") === "Customer" && 
          
          <Button
                      variant="outlined"
                      sx={{
                        ":hover": {
                          bgcolor: "#006e5f4a",
                          borderColor: "#006E60",
                        },
                        color: "red",
                        background: "none",
                        borderColor: "red",
                        width: 100,
                        borderRadius: "50px",
                        
                      }}
                      
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/report');
                      }}
                    >Report</Button>
            }
                  
          
          <TextField
            placeholder="Type Here.."
            multiline
            
            sx={{
              width: 300,
              backgroundColor: "#D9D9D9",
              width: 700,
              
            }}
            value={sendMessage.message}
            onChange={(e) =>
              setsendMessage({ ...sendMessage, message: e.target.value })
            }
          />

                  <Button
                      variant="outlined"
                      sx={{
                        ":hover": {
                          bgcolor: "#006e5f4a",
                          borderColor: "#006E60",
                        },
                        color: "white",
                        backgroundColor: "#00720B",
                        borderColor: "#006E60",
                        width: 150,
                        borderRadius: "50px",
                      }}
                      
                      onClick={() =>
                        localStorage.getItem("UserType") === "Customer"
                          ? handleChatSendUser()
                          : handleChatSendHelper()
                      }
                    >Send</Button>
          
        </div>
      </div>
    </div>
  );
};

export default Chat;
