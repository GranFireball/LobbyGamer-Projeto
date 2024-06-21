import styled from "styled-components";
import NavbarOption from "./navbarOption";
import { Fragment } from "react";

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
`

const VerticalLine = styled.div`
  width: 2px;
  height: 28px;
  margin-top: 20px;
  background-color: red;
`

export default function Navbar({options}){
  return(
    <StyledNav>
      {
        options.map((option, index) => {
          if(index === options.length - 1){
            return(
              <NavbarOption text={option} key={option}/>
            )
          }
          else{
            return(
              <Fragment key={option}>
                <NavbarOption text={option}/>
                <VerticalLine></VerticalLine>
              </Fragment>
            )
          }
        })
      }
    </StyledNav>
  )
}