import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components"
import { IoPersonAdd } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { useContext } from "react";
import ChatContext from "../context/ChatContext";
import PlayerContext from "../context/PlayerContext";

const Card = styled.article`
  width: 100%;
  min-width: 175px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  background: ${props => props.bgcolor};
  color: black;
  border: 1px solid black;
  border-radius: 4px;
  cursor: ${props => props.cursorpointer};
`

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`

const HorizontallLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: black;
`

const AnswerContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`

const OptionButton = styled.button`
  width: 40px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background-color: ${props => props.bgcolor};
  border-radius: 4px;
  cursor: pointer;
  &:hover{
    background-color: ${props => props.bgcolorhover};
  }
`


export default function PlayerCard({player, status}){
  const sistemaPlayer = useContext(PlayerContext);
  const sistemaChat = useContext(ChatContext);
  const queryClient = useQueryClient();
  const {mutate: sendFriendRequest} = useMutation({
    mutationFn: async () => {
      const response = await fetch("https://lobbygamer.onrender.com/" + sistemaPlayer.player.id + "/addfriendrequest/" + player.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if(!response.ok){
        throw new Error("Erro ao enviar pedido de amizade");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['players']});
    }
  })

  const {mutate: addFriend} = useMutation({
    mutationFn: async () => {
      const response = await fetch("https://lobbygamer.onrender.com/" + sistemaPlayer.player.id + "/addfriend/" + player.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if(!response.ok){
        throw new Error("Erro ao adicionar jogador");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['friendRequests']});
    }
  })

  const {mutate: removeFriendRequest} = useMutation({
    mutationFn: async () => {
      const response = await fetch("https://lobbygamer.onrender.com/" + sistemaPlayer.player.id + "/removefriendrequest/" + player.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if(!response.ok){
        throw new Error("Erro ao recusar pedido de amizade");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['friendRequests']});
    }
  })


  return(
    <Card cursorpointer={status === "friend" ? "pointer" : "default"} bgcolor={(sistemaChat && sistemaChat.player?.id === player.id) ? "#fce8e8" : "white"} onClick={() => {
      if(status === "friend"){
        sistemaChat.selectPlayer(player);
        queryClient.invalidateQueries({queryKey: ['friends']});
      }
    }}>
      <CardHeader>
        <h3>{player.nick}</h3>
        {
          status === "addFriend" && 
          <IoPersonAdd size={32} style={{cursor: 'pointer'}} onClick={() => sendFriendRequest()}/>
        }
        {
          status === "friendRequest" && 
          <AnswerContainer>
            <OptionButton bgcolor="#ff3021" bgcolorhover="#fa4739" onClick={() => removeFriendRequest()}><strong>X</strong></OptionButton>
            <OptionButton bgcolor="#0cf514" bgcolorhover="#46fa4c" onClick={() => addFriend()}><FaCheck size={12}/></OptionButton>
          </AnswerContainer>
        }
      </CardHeader>
      <HorizontallLine></HorizontallLine>
      <p>{player.mainRole}</p>
      <p>{player.rank}</p>
    </Card>
  )
}