import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import ChatContext from "../context/ChatContext";
import { IoSend } from "react-icons/io5";
import PlayerContext from "../context/PlayerContext";

const ChatScreen = styled.section`
  position: relative;
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  border: 4px solid red;
  border-radius: 8px;
  overflow-y: scroll;
`

const ChatTitle = styled.h2`
  position: sticky;
  top: 0;
  width: 100%;
  padding: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 40px 0px rgba(128,8,8,1);
`

const MyMessage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 8px;
`

const NotMyMessage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 8px;
`

const MyMessageText = styled.p`
  max-width: 80%;
  padding: 8px;
  background-color: black;
  color: white;
  border-radius: 4px;
  word-break: break-all;
`

const NotMyMessageText = styled.p`
  max-width: 80%;
  padding: 8px;
  background-color: gray;
  color: white;
  border-radius: 4px;
  word-break: break-all;
`

const InteractionContainer = styled.footer`
  position: sticky;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 12px;
`

const InputMessage = styled.textarea`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  font-size: 20px;
  resize: none;
`

const SendButton = styled.button`
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${props => props.cursorpointer};
`
//url development environment
const url = "http://localhost:3001";

//url production environment
// const url = ""

const socket = io(url);

export default function Chat() {
  const sistemaPlayer = useContext(PlayerContext);
  const sistemaChat = useContext(ChatContext);
  const [inputMessage, setInputMessage] = useState();
  const lastMessageRef = useRef();

  useEffect(() => {
    lastMessageRef.current.scrollIntoView({behavior: "smooth"});
  }, [sistemaChat.messages])

  useEffect(() => {
    if (!sistemaChat.actualRoom) {
      socket.emit("enterRoom", sistemaChat.player?.chatId);
      sistemaChat.enterRoom();
    }
    else {
      if(sistemaChat.player?.chatId){
        socket.emit("leaveRoom", sistemaChat.actualRoom);
        socket.emit("enterRoom", sistemaChat.player?.chatId);
        sistemaChat.enterRoom();
      }
      else{
        socket.emit("leaveRoom", sistemaChat.actualRoom);
        sistemaChat.leaveRoom();
      }
    }

  }, [sistemaChat.player])

  useEffect(() => {
      socket.on("msgToClient", (message) => {
        sistemaChat.updateMessages(message);
      })
  })

  function getFormattedTime() {
    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    let currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    currentMonth = currentMonth + 1;
    if (currentMonth < 10) {
      currentMonth = "0" + currentMonth;
    }
    const currentYear = currentDate.getFullYear();
    const dateString = currentDayOfMonth + "/" + (currentMonth) + "/" + currentYear;
    let hours = currentDate.getHours();
    if (hours < 10) {
      hours = "0" + hours;
    }
    let minutes = currentDate.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    const hourString = hours + ":" + minutes;
    return hourString + " " + dateString;
  }

  function sendMessage() {
    if (inputMessage.length > 0 && inputMessage.trim().length > 0) {
      const formattedTime = getFormattedTime();
      const message = {
        sender: sistemaPlayer.player.nick,
        text: inputMessage,
        time: formattedTime
      }
      socket.emit("msgToServer", { from: sistemaPlayer.player.id, to: sistemaChat.player.id, chatId: sistemaChat.player.chatId, message: message });
      setInputMessage('');
    }
  }

  return (
    <ChatScreen>
      <ChatTitle>Chat: {sistemaChat ? sistemaChat.player?.nick : null}</ChatTitle>
      <div>
        {
          sistemaChat.messages.length > 0 &&
          sistemaChat.messages.map((message, index) => {
            if (message.sender === sistemaPlayer.player.nick) {
              return (
                <MyMessage key={index}>
                  <h3>{message.sender}</h3>
                  <MyMessageText>{message.text}</MyMessageText>
                  <span>{message.time}</span>
                </MyMessage>
              )
            }
            return (
              <NotMyMessage key={index}>
                <h3>{message.sender}</h3>
                <NotMyMessageText>{message.text}</NotMyMessageText>
                <span>{message.time}</span>
              </NotMyMessage>
            )
          })
        }
        <div ref={lastMessageRef}/>
      </div>
      <InteractionContainer>
        <InputMessage value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
        <SendButton disabled={!sistemaChat.player} cursorpointer={sistemaChat.player ? "pointer" : "default"} onClick={() => sendMessage()}><IoSend size={20} /></SendButton>
      </InteractionContainer>
    </ChatScreen>

  )
}