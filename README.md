# MERN Templates
### Mongodb | Express | React-18 | [MobX](https://mobx.js.org/README.html) | [ChakraUI](https://chakra-ui.com/getting-started/)

Backend + frontend ready to use templates

## Backend

- Express API with JWT Auth + Passport google oAuth 2.0
- Full Mongoose setup with a template model
- Socket.io Integrated
- Github action template for CD
- Auto add new routes by adding them **api/routes/[newRouter].js**

### ENV 

Create the .env inside the nodejs with these required values.

```
MONGODB=mongodb://DB_CONNECTION_STRING
PORT = 6969
GOOGLE_CLIENT_ID='[google-client-id-here].apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET='[google-client-secret]'
SESSION='[random-session-string]'
JWT='[random-jwt-string]'
```

## Frontend

- State Management using MobX
        - RootStore: contains auth + HTTP/axios helper methods 
        - UIStore: Manage UI State
- Styling powered with Chakra UI
        - Modify provided in **darkTheme.js**
- Google oAuth with redirect upon login
- Github action template for CD

## Installation

requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd [directory]
npm i
npm start
```

## License

MIT

Made with ♥ Mridul Pareek

