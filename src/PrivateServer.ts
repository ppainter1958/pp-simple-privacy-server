import server from "./Controller";
import env from 'node-env-file';

export class PrivateServer {
  vaultPath: string;
  hostname = "127.0.0.1"; // default localhost
  port = 3000;            // default port 3000

  constructor(vaultPath: string) {
    this.vaultPath = vaultPath;
    try {
        env(__dirname + '/' + this.vaultPath);
        console.log('Configured privacy environment');
    }
    catch (e) {
        console.log(e);
    }
  }

  listenNow() {
    server.listen(this.port, this.hostname, () => {
      console.log(`Server running at http://${this.hostname}:${this.port}/`);
    });
  }
}
