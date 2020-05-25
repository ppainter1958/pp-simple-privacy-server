import server from "./Controller";

export class PrivateServer {
  vaultPath: string;
  hostname = "127.0.0.1"; // default localhost
  port = 3000;            // default port 3000

  constructor(vaultPath: string) {
    this.vaultPath = vaultPath;
    console.log(`[SPS]: Server using ${this.vaultPath}`);
  }

  listenNow() {
    server.listen(this.port, this.hostname, () => {
      console.log(`[SPS]: Server running at http://${this.hostname}:${this.port}/`);
    });
  }
}
