import server from './Controller';

const hostname = '127.0.0.1';
const port = 3000;

export default function listenNow (){
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}
