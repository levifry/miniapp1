import server from './server.js';
const port = 3001

server.listen(port, () => {console.log(`API server is running on port: ${port}`)})