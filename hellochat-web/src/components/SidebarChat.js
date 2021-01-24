import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import '../styles/SidebarChat.css';
import { Avatar } from '@material-ui/core';
import db from "../firebase"


function SidebarChat({ addNewChat , id, name }) {
  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
        setMessages(snapshot.docs.map((doc) => doc.data()))
      ))
    }
  }, [])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat")

    // [Post] Add new chat room
    if (roomName) {
      // do some db
      db.collection("rooms").add({
        name: roomName,
      })
    }

  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ): (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  )
}

export default SidebarChat
