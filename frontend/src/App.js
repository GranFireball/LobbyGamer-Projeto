import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Header from './components/header';
import Navbar from './components/navbar';
import FindPlayers from './views/findPlayers';
import { Fragment } from 'react';
import FriendRequests from './views/friendRequests';
import Friends from './views/friends';
import ChatProvider from './context/ChatProvider';
import Login from './views/login';
import { useSelector } from 'react-redux';
import PlayerProvider from './context/PlayerProvider';
import CreateAccount from './views/createAccount';

const queryClient = new QueryClient();

function App() {
  const page = useSelector((state) => state.pageSelected.value);
  const optionsApp = ["Encontrar Jogadores", "Amigos", "Pedidos de Amizade"];
  const optionsLogin = ["Entrar", "Criar Conta"];
  return (
    <div style={{minHeight: "100vh", backgroundColor: "#f5f5f5"}}>
      <PlayerProvider>
        <ChatProvider>
          <QueryClientProvider client={queryClient}>
            <Header />
            {
              (page === "Entrar" || page === "Criar Conta") ?
                <Fragment>
                  <Navbar options={optionsLogin} />
                  {
                    (page === "Entrar") &&
                    <Login />
                  }
                  {
                    (page === "Criar Conta") &&
                    <CreateAccount />
                  }
                </Fragment>
                :
                <Fragment>
                  <Navbar options={optionsApp} />
                  {
                    page === "Encontrar Jogadores" &&
                    <FindPlayers/>
                  }
                  {
                    page === "Amigos" &&
                    <Friends/>
                  }
                  {
                    page === "Pedidos de Amizade" &&
                    <FriendRequests/>
                  }
                </Fragment>
            }
          </QueryClientProvider>
        </ChatProvider>
      </PlayerProvider>
    </div>
  );
}

export default App;
