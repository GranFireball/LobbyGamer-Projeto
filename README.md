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
