import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changePage } from "../lib/features/pageSlicer";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PlayerContext from "../context/PlayerContext";
import { FaCheck } from "react-icons/fa";

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

const RadioContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
`

const LabelInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const LabelInput = styled.label`
  font-size: 20x;
  font-weight: bold;
`

const InputContainer = styled.div`
  display: flex;
  gap: 4px;
`

const StyledInput = styled.input`
  padding: 8px;
  border-radius: 8px;
`

const SpanContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const StyledSpan = styled.span`
  font-size: 12px;
  opacity: 4px;
  margin-left: 4px;
`

const CreateAccountButton = styled.button`
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

const createAccountSchema = z.object({
  nick: z.string({
    required_error: "Campo 'Nick' obrigatório*"
  }).trim().min(2,{
    error: [{
      message: "Mínimo de 2 caracteres*"
    }]
  }).max(20, {
    error: [{
      message: "Máximo de 20 caracteres*"
    }]
  }),
  password: z.string({
        required_error: "Campo 'Senha' obrigatório*"
  }).trim().min(6, {
    error: [{
      message: "Mínimo de 6 caracteres*"
    }]
  }),
  mainRole: z.string({
      required_error: "Campo 'Função Principal' obrigatório*"
  }),
  rank: z.string({
      required_error: "Campo 'Rank' obrigatório*"
  })
})

const roles = ["Top", "Jg", "Mid", "Adc", "Sup"];
const ranks = ["Ferro", "Bronze", "Prata", "Ouro", "Platina", "Esmeralda", "Diamante", "Mestre", "Grão-Mestre", "Desafiante"];

export default function CreateAccount() {
  const sistemaPlayer = useContext(PlayerContext);
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(createAccountSchema)
  });
  const [snackbar, setSnackbar] = useState(undefined);
  const dispatch = useDispatch();
  const [nick, setNick] = useState();
  const [password, setPassword] = useState();

  const {mutate: createPlayerAccount, isPending} = useMutation({
    mutationFn: async (dataCreateAccountForm) => {
      const dataAccount = {
        nick: dataCreateAccountForm.nick,
        password: dataCreateAccountForm.password,
        mainRole: dataCreateAccountForm.mainRole,
        rank: dataCreateAccountForm.rank,
        friendRequestsSent: [],
        friendRequestsReceived: [],
        friends: []
      }
      const response = await fetch("https://lobbygamer.onrender.com/players", {
        method: "POST",
        body: JSON.stringify(dataAccount),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }
      const player = await response.json();
      if (player.nick === "") {
        setSnackbar("Esse nick já existe");
        setTimeout(() => setSnackbar(undefined), 3000);
      }
      else{
        sistemaPlayer.loginPlayer(player);
        reset();
        dispatch(changePage("Encontrar Jogadores"));
      }
    }
  })

  return (
    <MainContainer>
      {
        snackbar &&
        <Snackbar>
          <p>{snackbar}</p>
        </Snackbar>
      }
      <FormContainer onSubmit={handleSubmit(createPlayerAccount)}>
        <LabelInputContainer>
          <LabelInput>Nick</LabelInput>
          <StyledInput type="text" {...register('nick')} onChange={(e) => setNick(e.target.value)}/>
          <SpanContainer>
            <StyledSpan>* 2 a 20 caracteres</StyledSpan>
            {
              (nick && nick.length >= 2 && nick.length <= 20) &&
              <FaCheck size={12} color="green"/>
            }
          </SpanContainer>
        </LabelInputContainer>
        <LabelInputContainer>
          <LabelInput>Senha</LabelInput>
          <StyledInput type="password" {...register('password')} onChange={(e) => setPassword(e.target.value)}/>
          <SpanContainer>
            <StyledSpan>* Mínimo de 6 caracteres</StyledSpan>
            {
              (password && password.length >= 6) &&
              <FaCheck size={12} color="green"/>
            }
          </SpanContainer>
        </LabelInputContainer>
        <RadioContainer>
          <LabelInput>Funcão Principal:</LabelInput>
        {
          roles.map((role) => {
            return(
              <InputContainer key={role}>
                <input type="radio" style={{cursor: "pointer"}} value={role} {...register('mainRole')}/>
                <label>{role}</label>
              </InputContainer>
            )
          })
        }
        </RadioContainer>
        <RadioContainer>
          <LabelInput>Rank:</LabelInput>
        {
          ranks.map((rank) => {
            return(
              <InputContainer key={rank}>
                <input type="radio" style={{cursor: "pointer"}} value={rank} {...register('rank')}/>
                <label>{rank}</label>
              </InputContainer>
            )
          })
        }
        </RadioContainer> 
        <CreateAccountButton disabled={isPending} type="submit">Criar Conta</CreateAccountButton>
      </FormContainer>
    </MainContainer>
  )
}