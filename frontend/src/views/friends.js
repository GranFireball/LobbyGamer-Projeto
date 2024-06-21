import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import PlayerCard from "../components/playerCard";
import Chat from "../components/chat";
import { useContext } from "react";
import PlayerContext from "../context/PlayerContext";

const MainContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;

  @media only screen and (max-width: 768px){
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

`

const FriendsList = styled.aside`
  width: 100%;
  min-width: 200px;
  max-width: 350px;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 8px;
  border: 4px solid red;
  border-radius: 8px;
  overflow-y: scroll;
`

const PTextCenter = styled.p`
  text-align: center;
`

export default function Friends() {
  const sistemaPlayer = useContext(PlayerContext);

  const { data: friends, isLoading, error } = useQuery({
    queryKey: ['friends'],
    queryFn: async () => {
      const response = await fetch('https://lobbygamer.onrender.com/' + sistemaPlayer.player.id + '/friends');
      if (!response.ok) {
        throw new Error("Erro ao carregar amigos");
      }
      const json = await response.json();
      return json;
    }
  })


  if (isLoading) {
    return (
      <MainContainer>
        <PTextCenter>Carregando...</PTextCenter>
      </MainContainer>
    )
  }

  if (error) {
    return (
      <MainContainer>
        <PTextCenter>Erro ao carregar amigos</PTextCenter>
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      <FriendsList>
        
        {
          (friends && friends.length > 0) ?
          friends.map((player) => {
            return (
              <PlayerCard key={player.id} player={player} status="friend" />
          )})
          :
          <p>Nenhum Amigo</p>
       }
        

      </FriendsList>
      <Chat/>
    </MainContainer>
  )
}