import { useState } from "react";
import PlayerContext from "./PlayerContext";

export default function PlayerProvider({children}){
  const [player, setPlayer] = useState();

  function loginPlayer(user){
    setPlayer(user);
  }

  function logoutPlayer(user){
    setPlayer(undefined);
  }

  return(
    <PlayerContext.Provider value={{player, loginPlayer, logoutPlayer}}>
      {children}
    </PlayerContext.Provider>
  )
}