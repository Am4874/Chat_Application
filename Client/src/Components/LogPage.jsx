import React, { useState } from "react";
import "./logPage.css";
import {io, Socket } from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const LogPage = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if(username !== "" && room !== ""){
     socket.emit("join_room",room) 
    }
  };

  return (
    <div className="App flex  flex-col justify-center items-center">
      <h3 className="my-5 text-2xl font-bold">Join Chats</h3>
      <input 
      type="text" 
      placeholder="Jhon..." 
      onChange={(event) =>{
        setUsername(event.target.value);
      } }
      className="" />
      <input 
      type="text" 
      placeholder="Room Id.." 
      onChange={(event) =>{
        setRoom(event.target.value);
      } }
      className=""/>
      <button
      onClick={joinRoom}
       className=" text-xl font-bold bg-blue-700 text-white p-2 rounded m-4">
        Join A Room
      </button>
    </div>
  );
};

export default LogPage;
