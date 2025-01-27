import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMsg, setCurrentMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

  const sendMsg = async () => {
    if (currentMsg !== "") {
      const msgData = {
        room: room,
        author: username,
        msg: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_msg", msgData);
      setMsgList((list) => [...list, msgData]);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.on("receive_msg", (data) => {
      setMsgList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>

      <ScrollToBottom className="message-content">
        <div className="chat-body">
          {msgList.map((msgContent, index) => {
            return (
              <div
                key={index}
                className="message"
                id={username === msgContent.author ? "you" : "author"}
              >
                <div className="message-content">
                  <p>{msgContent.msg}</p>
                </div>
                <div className="message-meta">
                  <span id="time">{msgContent.time}</span>
                  <span id="author">{msgContent.author}</span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollToBottom>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="message..."
          value={currentMsg}
          onChange={(event) => {
            setCurrentMsg(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMsg();
          }}
        />
        <button onClick={sendMsg}>&#8629;</button>
      </div>
    </div>
  );
}

export default Chat;
