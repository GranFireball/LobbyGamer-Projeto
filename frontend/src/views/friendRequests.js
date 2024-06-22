import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import PlayerCard from "../components/playerCard";
import PlayerContext from "../context/PlayerContext";

const MainContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
`

const GridFriendRequests = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  @media only screen and (min-width: 768px){
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (min-width: 1200px){
    grid-template-columns: repeat(4, 1fr);
`

const PTextCenter = styled.p`
  text-align: center;
`

export default function FriendRequests() {
  const sistemaPlayer = useContext(PlayerContext);

  const { data: friendRequests, isLoading, error } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: async () => {
      const response = await fetch('https://lobbygamer.onrender.com/players/' + sistemaPlayer.player.id + '/friendrequests');
      if (!response.ok) {
        throw new Error("Erro ao carregar pedidos de amizade");
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
        <PTextCenter>Erro ao carregar pedidos de amizade</PTextCenter>
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      {
        (friendRequests && friendRequests.length > 0) ?
          <GridFriendRequests>
            {friendRequests.map((player) => {
              return (
                <PlayerCard key={player.id} player={player} status="friendRequest"/>
              )
            })}
          </GridFriendRequests>
          :
          <p>Nenhum Pedido de Amizade</p>
      }
    </MainContainer>
  )
}