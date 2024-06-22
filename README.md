![Captura de tela 2024-06-22 130935](https://github.com/GranFireball/LobbyGamer-Projeto/assets/61765704/492b995c-463a-4b52-89e3-76983efb36ce)
![Captura de tela 2024-06-22 131052](https://github.com/GranFireball/LobbyGamer-Projeto/assets/61765704/867331b9-a70d-4247-954e-d6fd7264b04d)
![Captura de tela 2024-06-22 142231](https://github.com/GranFireball/LobbyGamer-Projeto/assets/61765704/08c09b69-f80d-4273-a49e-7c1031d6ccca)
![Captura de tela 2024-06-22 142404](https://github.com/GranFireball/LobbyGamer-Projeto/assets/61765704/9bc007c6-e12f-4b39-aebe-a6c638acdf9e)
![Captura de tela 2024-06-22 142253](https://github.com/GranFireball/LobbyGamer-Projeto/assets/61765704/099238f0-5bf4-4c0f-b762-38a989feca9e)

## Sobre o Projeto

Este projeto é um sistema de chat em tempo real, composto por cinco páginas: Login, Criar Conta, Encontrar Jogadores, Amigos e Pedidos de Amizade.

- Login: O usuário insere seu nick e senha. Ao clicar no botão "Entrar no Lobby", caso os dados estejam corretos, o login é efetuado com sucesso e o usuário é redirecionado para a página "Encontrar Jogadores". Se os dados estiverem incorretos, uma notificação informará o erro e o login não será realizado.

- Criar Conta: Para encontrar jogadores, enviar e receber pedidos de amizade, e adicionar amigos, é necessário criar uma conta. Nesta página, há um formulário para preencher os campos (Nick, Senha, Função Principal, Rank). Após preencher todos os campos e clicar no botão "Criar Conta", se o nick não estiver em uso, a conta será criada e o usuário será redirecionado para a página "Encontrar Jogadores". Caso o nick já esteja em uso, será exibida uma mensagem solicitando a escolha de um novo nick para concluir a criação da conta.

- Encontrar Jogadores: Nesta página, são exibidos todos os jogadores, exceto aqueles que já são amigos do usuário ou que já enviaram ou receberam pedidos de amizade. O usuário pode enviar pedidos de amizade a outros jogadores, permitindo futuras conversas no chat, pois apenas amigos podem trocar mensagens.

- Amigos: Esta página lista os amigos do usuário. Ao clicar no cartão de um amigo, a conversa entre o usuário e esse amigo é exibida no chat, onde é possível visualizar todas as mensagens enviadas e recebidas, além de enviar novas mensagens.

- Pedidos de Amizade: Nesta página, são exibidos os pedidos de amizade recebidos pelo usuário. Há opções para aceitar ou recusar cada pedido.

## Segurança dos Dados

- A senha é gerada com criptografia de mão única, ou seja, esta ação não pode ser revertida e consequentemente não é possível ser visualizada.

- As mensagens são criptografadas e armazenadas no banco de dados com a criptografia, sendo descriptografadas apenas para serem mostradas no chat da conversa.

## Tecnologias e Ferramentas Utilizadas

HTML, Styled-Components, Javascript, React, Zod, Socket.IO, NestJS, Typescript, MySQL

# Link do Vídeo de Apresentação
Link: 
