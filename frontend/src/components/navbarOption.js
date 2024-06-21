import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { changePage } from "../lib/features/pageSlicer";

const OptionContainer = styled.div`
  padding: 20px 5%;
  background: transparent;
  color: red;
`

const OptionText = styled.h3`
  text-align: center;
  font-size: 1.4rem;
  cursor: pointer;
  opacity: 70%;
  &:hover{
    text-decoration: underline;
  }
`

export default function NavbarOption({text}){
  const page = useSelector((state) => state.pageSelected.value);
  const dispatch = useDispatch();
  return(
    <OptionContainer>
      <OptionText style={page === text ? {opacity: "100%"} : {opacity: "60%"}} onClick={() => dispatch(changePage(text))}>{text}</OptionText>
    </OptionContainer>
  )
}