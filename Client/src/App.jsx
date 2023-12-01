import './App.css';
import io, { Socket } from 'socket.io-client';
import { useState } from 'react';
// import LogPage from './Components/LogPage.jsx';
import Chat from './Components/Chat';

const socket = io.connect("http://localhost:3001");


function App() {
  
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if(username !== "" && room !== ""){
     socket.emit("join_room",room);
     setShowChat(true);
    }
  };


  return (
    <>
  
      {!showChat ? (
    <div className="flex  flex-col justify-center items-center">
      <h3 className="JoCh my-5 text-2xl font-bold ">Join A Chats Room</h3>
      <input 
      type="text" 
      placeholder="Name..." 
      onChange={(event) =>{
        setUsername(event.target.value);
      } }
      
      className="in01" />
      <input 
      type="text" 
      placeholder="Room Id.." 
      onChange={(event) =>{
        setRoom(event.target.value);
      } }
      onKeyDown={(event)=> {
        event.key === "Enter" && joinRoom()
      }}
      className="in02"/>
      <button
      onClick={joinRoom}
       className=" btn text-xl font-bold  text-white p-2 rounded m-4 ">
        Join A Room 
      </button>
    </div>
      ) : (
      <Chat socket={socket} username={username} room={room}/>
      ) }


    </>
  );
}

export default App
