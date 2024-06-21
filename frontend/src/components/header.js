import { useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import { CiLogout } from "react-icons/ci";
import { changePage } from '../lib/features/pageSlicer';
import { useContext } from 'react';
import ChatContext from '../context/ChatContext';
import PlayerContext from "../context/PlayerContext";
import imgLobby from "../imgs/imgLobby.jpg";

const StyledHeader = styled.header`
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${imgLobby});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
`

const HeaderTitle = styled.h1`
  font-size: 40px;
  text-align: center;
`

const LogoutButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 52px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: black;
  border-top-right-radius: 8px;
  cursor: pointer;
  &:hover{
    color: red;
  }
`

export default function Header(){
  const sistemaPlayer = useContext(PlayerContext);
  const sistemaChat = useContext(ChatContext);
  const page = useSelector((state) => state.pageSelected.value);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return(
    <StyledHeader>
      <HeaderTitle>LOBBY GAMER</HeaderTitle>
      {
        (page === "Entrar" || page === "Criar Conta") ?
          null
        :
          <LogoutButton onClick={() => {
            sistemaPlayer.logoutPlayer();
            sistemaChat.noPlayerSelected();
            sistemaChat.cleanChat();
            queryClient.clear();
            dispatch(changePage("Entrar"));
            }}>
            <CiLogout size={24}/>
          </LogoutButton>
      }
    </StyledHeader>
  )
}