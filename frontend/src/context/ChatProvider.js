import { useState } from "react";
import ChatContext from "./ChatContext";

export default function ChatProvider({children}){
  const [player, setPlayer] = useState();
  const [actualRoom, setActualRoom] = useState();
  const [messages, setMessages] = useState([]);

  function selectPlayer(friend){
    setPlayer(friend);
    let newSelectedPlayerMessages = [];
    for(const message of friend.messages){
      newSelectedPlayerMessages.push(message);
    }
    setMessages(newSelectedPlayerMessages);
  }

  function noPlayerSelected(){
    setPlayer(undefined);
  }

  function enterRoom(){
    setActualRoom(player?.chatId);
  }

  function leaveRoom(){
    setActualRoom(undefined);
  }

  function updateMessages(message){
    setMessages(() => [...messages, (message)]);
  }

  function cleanChat(){
    setMessages([]);
  }

  return(
    <ChatContext.Provider value={{player, selectPlayer, noPlayerSelected, messages, updateMessages, cleanChat, actualRoom, enterRoom, leaveRoom}}>
      {children}
    </ChatContext.Provider>
  )
}