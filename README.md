## Sistema de cadastro de veículos

### Partes do Sistema

- Cadastro de usários (Entrar/Cadastrar)
- Cadstro de veículos (CRUD-DataGrid)
- Cadastro de abastecimento de veículos (CRUD-DataGrid)

### Tecnologias

- React + TypeScript
- Vite
- Material UI (MUI)
- Zod
- React Hook form
- React Query
- Axios
- JsonServer
- React Router DOM

### Como iniciar a aplicação

Para executar a aplicação na sua máquina é preciso que você já tenha instalado de forma local o Node + npm.

1. Após ter clonado o repositório, execute no terminal:

```console
npm install
```

2. Após concluir a instalação, execute no terminal:

```console
npm run dev
```

3. Depois disso, abra outro terminal e execute:

```console
npm run server
```

4. Abra no navegador: http://localhost:5173

O primeiro comando irá instalar as dependências, o segundo comando irá iniciar a aplicação React no endereço: http://localhost:5173 e por fim, o terceiro comando irá iniciar o json server.

### Explicação do Sistema

#### Cadastro de usários:

Duas telas, uma de login e de cadastro. Após o usuário realizar o cadastro e realizar o login, seus dados ficam salvos no contexto (authContext) da aplicação até a sessão for encerrada. O contexto guarda apenas algumas informações sobre o usuário, mas o ideal seria guardar um token JWT para ser usado nas requisições protegidas da api. A configuração para passar esse token pode ser feita no próprio contexto, assim que o usuário fizer Login.

#### Cadastro de veículos:

Uma das rotas protegidas do sistema. Faz parte dos componentes de DashBoard. Sua principal função é exibir os dados cadastrais dos veículos retornados pela a api, essa exibição é feita através de uma Table (DataGrid). É possível também adicionar novos cadastros, editar e deletar cadastros já existentes.

#### Cadastro de abastecimento de veículos

Outra rota protegda do sistema. Faz parte dos componentes do DashBoard. Sua principal função é exibir os cadastros de abastecimento de veículos retornados pela a api. Possui relacionamento com os dados de cadastro de veículo, uma vez que, é preciso atribuir o abastecimento para um veículo já cadastrado. Além da visualização, é possível também editar e deletar cadastros de abastecimento já existentes.

#### Servidor JSON Server

Essa aplicação, por não possuir uma api real utiliza de um servidor "mockado" o json server. No arquivo db.json podem ser observados os endpoints da aplicação: "usuarios", "veiculos" e "abastecimentos". Caso seja preciso conectar a uma api real é só modificar os métodos da pasta "service", uma vez que, todos os dados que entram na aplicação são puxados por um método da pasta service.

#### Rotas protegidas

Essa aplicação, utiliza o React Router para criar a navegação protegida entre páginas. Ao entrar na aplicação, o usuário não estará logado, assim apenas rotas públicas serão exibidas. Após o Login, as rotas privadas são carregadas para o usuário, sendo impossível retornar para as rotas públicas iniciais.

### Preview
![Screen Shot 2023-03-31 at 20 05 28](https://user-images.githubusercontent.com/90735982/229247857-ea4ac8c9-097c-4567-a8c5-145556821063.png)
![Screen Shot 2023-03-31 at 20 05 52](https://user-images.githubusercontent.com/90735982/229247911-a878a505-9ccf-4efb-b1ba-579f5f164a59.png)
![Screen Shot 2023-03-31 at 20 05 55](https://user-images.githubusercontent.com/90735982/229248143-67d586bd-d508-4ca3-a2c0-93f8a9b77abf.png)
