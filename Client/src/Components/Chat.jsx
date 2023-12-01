import React, { useEffect, useState } from 'react'
import  "./chat.css";
import ScrollToBottom from  'react-scroll-to-bottom'


const Chat = ({socket, username, room}) => {

    const [currentMessage,setCurrentMessage] = useState("")
    const [messageList,setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage != ""){
           const messageData ={
            room: room,
            author: username,
            message: currentMessage,
            time :
            new Date(Date.now()).getHours() +
            ":" + 
            new Date(Date.now()).getMinutes(),
           };

           await socket.emit("send_msg",messageData )
           setMessageList((list) => [...list,messageData]);
           setCurrentMessage("")
        }
    };

    useEffect(() => {
        socket.on("receive_msg",(data) => {
            // console.log(data);
            setMessageList((list) => [...list, data])
        })
    },[socket])
  return (
    <div className='chat-win'>
        <div className="chat-header">
            <p>Live Chats</p>
        </div>
        <div className="chat-body">
            <ScrollToBottom className='msg-container'>
            {messageList.map((msgContent) => {
                // eslint-disable-next-line react/jsx-key
                return <div className="message" id={username=== msgContent.author ? "you" : "other"}>

                    <div className='msg-container'>
                    <div className='msg-content'>
                        <p>{msgContent.message}</p>
                    </div>
                    <div className='msg-meta'>
                        <p id='time'>{msgContent.time}</p>
                        <p id='author'>{msgContent.author}</p>
                    </div>
                    </div>
                </div>;
            })}
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input 
            type="text"
            value={currentMessage}
            placeholder='Typing...'
            onChange={(event) =>{
                setCurrentMessage(event.target.value);
              } }
              onKeyDown={(event)=> {
                event.key === "Enter" && sendMessage()
              }}
              className='inp 	'
             />
            <button onClick={sendMessage} className='btn0 shadow-sky-500'>Send</button>
        </div>
    </div>
  )
}

export default Chat