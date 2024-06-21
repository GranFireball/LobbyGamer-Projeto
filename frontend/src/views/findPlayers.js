import { useQuery } from "@tanstack/react-query";
import PlayerCard from "../components/playerCard";
import styled from "styled-components";
import { useContext } from "react";
import PlayerContext from "../context/PlayerContext";

const MainContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
`

const GridFindPlayers = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  @media only screen and (min-width: 400px){
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 768px){
    grid-template-columns: repeat(4, 1fr);
  }

  @media only screen and (min-width: 1200px){
    grid-template-columns: repeat(6, 1fr);
  }
`

const PTextCenter = styled.p`
  text-align: center;
`

export default function FindPlayers() {
  const sistemaPlayer = useContext(PlayerContext);

  const { data: players, isLoading, error } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/players/' + sistemaPlayer.player.id + '/findplayers');
      if (!response.ok) {
        throw new Error("Erro ao carregar jogadores");
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
        <PTextCenter>Erro ao carregar jogadores</PTextCenter>
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      {
        (players && players.length > 0) ?
          <GridFindPlayers>
            {players.map((player) => {
              return (
                <PlayerCard key={player.id} player={player} status="addFriend"/>
              )
            })}
          </GridFindPlayers>
          :
          <p>Nenhum Jogador Encontrado</p>
      }

    </MainContainer>
  )
}