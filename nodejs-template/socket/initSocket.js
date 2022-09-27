import io from 'socket.io-client'
let socket = null
export default () => {
  socket = io(process.env.SERVER_URL)
}
export const sendSocketMessage = (event, message) => {
  socket.emit(event, message)
}
