import http from "http";
const prefix = "[SPServer]";

export class SimplePrivacyServer {
  private httpServer: http.Server;
  private hostname ="127.0.0.1";
  private port = 3000; // default port 3000
  private urlOrigin: string;
  constructor(
    controllerListener: (
      req: http.IncomingMessage,
      res: http.ServerResponse
    ) => void,
    theHostname?: string,
    thePort?: number
  ) {
    this.hostname = (theHostname !== undefined) ? theHostname : this.hostname;
    this.port = (thePort !== undefined) ? thePort : this.port;
    this.httpServer = http.createServer(controllerListener);
    this.urlOrigin = `http://${this.hostname}:${this.port}/`;
    console.log(`${prefix}[constructor]: Server created for ${this.urlOrigin}`);
  }

  listenNow():void {
    console.log(`${prefix}[listenNow]:`);
    this.httpServer.listen(this.port, this.hostname, () => {
      console.log(`    Server listening at ${this.urlOrigin}`);
    });
  }
}
