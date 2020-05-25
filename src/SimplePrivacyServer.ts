import server from "./SimplePrivacyController";

export class SimplePrivacyServer {
  vaultPath: string;
  hostname = "127.0.0.1"; // default localhost
  port = 3000;            // default port 3000

  constructor(vaultPath: string) {
    this.vaultPath = vaultPath;
    console.log(`[SPS][PrivateServer]: Server using ${this.vaultPath}`);
  }

  listenNow() {
    server.listen(this.port, this.hostname, () => {
      console.log(`[SPS][PrivateServer]: Server running at http://${this.hostname}:${this.port}/`);

      console.log(`[SPS][PrivateServer]: vaultPath='${this.vaultPath}'`);
    });
  }
}
