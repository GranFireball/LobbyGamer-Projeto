import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changePage } from "../lib/features/pageSlicer";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import PlayerContext from "../context/PlayerContext";

const MainContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
`

const Snackbar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  margin: 20px;
  padding: 8px;
  background-color: white;
  color: black;
  border: 2px solid black;
  border-radius: 8px;
`

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 20px;
  border: 4px solid red;
  border-radius: 8px;
`

const LabelInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const LabelInput = styled.label`
  font-size: 20x;
  font-weight: bold;
`

const StyledInput = styled.input`
  padding: 8px;
  border-radius: 8px;
`

const LoginButton = styled.button`
  width: 160px;
  height: 60px;
  background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(141,0,0,1) 100%);
  color: white;
  font-size: 20px;
  border-radius: 8px;
  cursor: pointer;
  &:hover{
  background: linear-gradient(90deg, rgba(141,0,0,1) 0%, rgba(255,0,0,1) 100%);
  }
`

export default function Login() {
  const sistemaPlayer = useContext(PlayerContext);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(undefined);
  const dispatch = useDispatch();

  async function getLoginPlayer(dataLoginForm) {
    setLoading(true);
    const response = await fetch("http://localhost:3001/players/" + dataLoginForm.nick + "/" + dataLoginForm.password);
    if (!response.ok) {
      throw new Error("Erro ao fazer login");
    }
    const player = await response.json();
    if (player.nick === "") {
      setSnackbar("Login incorreto");
      setTimeout(() => setSnackbar(undefined), 3000);
    }
    else {
      sistemaPlayer.loginPlayer(player);
      reset();
      dispatch(changePage("Encontrar Jogadores"));
    }
    setLoading(false);
  }


  return (
    <MainContainer>
      {
        snackbar &&
        <Snackbar>
          <p>{snackbar}</p>
        </Snackbar>
      }
      <FormContainer onSubmit={handleSubmit(getLoginPlayer)}>
        <LabelInputContainer>
          <LabelInput>Nick</LabelInput>
          <StyledInput type="text" {...register('nick', { required: true })} />
        </LabelInputContainer>
        <LabelInputContainer>
          <LabelInput>Senha</LabelInput>
          <StyledInput type="password" {...register('password', { required: true })} />
        </LabelInputContainer>
        <LoginButton disabled={loading} type="submit">Entrar no Lobby</LoginButton>
      </FormContainer>
    </MainContainer>
  )
}