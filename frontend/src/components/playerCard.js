import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components"
import { IoPersonAdd } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { useContext, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const {mutate: sendFriendRequest, isPendingSendFriendRequest} = useMutation({
    mutationFn: async () => {
      if(!loading){
        setLoading(true);
        const response = await fetch("https://lobbygamer.onrender.com/players/" + sistemaPlayer.player.id + "/addfriendrequest/" + player.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          }
        })
        if(!response.ok){
          setTimeout(() => setLoading(false), 3000);
          throw new Error("Erro ao enviar pedido de amizade");
        }
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['players']});
      setTimeout(() => setLoading(false), 3000);
    },
    onError: () => {
      setTimeout(() => setLoading(false), 3000);
      throw new Error("Erro ao enviar pedido de amizade");
    }
  })

  const {mutate: addFriend, isPendingAddFriend} = useMutation({
    mutationFn: async () => {
      if(!loading){
        setLoading(true);
        const response = await fetch("https://lobbygamer.onrender.com/players/" + sistemaPlayer.player.id + "/addfriend/" + player.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          }
        })
        if(!response.ok){
          setTimeout(() => setLoading(false), 3000);
          throw new Error("Erro ao adicionar jogador");
        }
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['friendRequests']});
      setTimeout(() => setLoading(false), 3000);
    },
    onError: () => {
      setTimeout(() => setLoading(false), 3000);
      throw new Error("Erro ao adicionar jogador");
    }
  })

  const {mutate: removeFriendRequest, isPendingRemoveFriendRequest} = useMutation({
    mutationFn: async () => {
      if(!loading){
        setLoading(true);
        const response = await fetch("https://lobbygamer.onrender.com/players/" + sistemaPlayer.player.id + "/removefriendrequest/" + player.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          }
        })
        if(!response.ok){
          setTimeout(() => setLoading(false), 3000);
          throw new Error("Erro ao recusar pedido de amizade");
        }
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['friendRequests']});
      setTimeout(() => setLoading(false), 3000);
    },
    onError: () => {
      setTimeout(() => setLoading(false), 3000);
      throw new Error("Erro ao recusar pedido de amizade");
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
          status === "addFriend" ?
            (loading || isPendingSendFriendRequest) ?
              <IoPersonAdd size={32} style={{cursor: 'pointer'}}/>
            :
              <IoPersonAdd size={32} style={{cursor: 'pointer'}} onClick={() => {
                if(!loading && !isPendingSendFriendRequest){
                  sendFriendRequest()
                }
              }}/>
          :
          null
        }
        {
          status === "friendRequest" ?
            (loading || isPendingRemoveFriendRequest || isPendingAddFriend) ?
              <AnswerContainer>
                <OptionButton disabled={isPendingRemoveFriendRequest} bgcolor="#ff3021" bgcolorhover="#fa4739"><strong>X</strong></OptionButton>
                <OptionButton disabled={isPendingAddFriend} bgcolor="#0cf514" bgcolorhover="#46fa4c"><FaCheck size={12}/></OptionButton>
              </AnswerContainer>
            :
              <AnswerContainer>
                <OptionButton disabled={isPendingRemoveFriendRequest} bgcolor="#ff3021" bgcolorhover="#fa4739" onClick={() => removeFriendRequest()}><strong>X</strong></OptionButton>
                <OptionButton disabled={isPendingAddFriend} bgcolor="#0cf514" bgcolorhover="#46fa4c" onClick={() => addFriend()}><FaCheck size={12}/></OptionButton>
              </AnswerContainer>
          :null
        }
      </CardHeader>
      <HorizontallLine></HorizontallLine>
      <p>{player.mainRole}</p>
      <p>{player.rank}</p>
    </Card>
  )
}