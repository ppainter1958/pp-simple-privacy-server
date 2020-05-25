import {URL} from 'url';
import {IncomingMessage, ServerResponse, createServer as httpCreateServer}  from "http";
import * as service from "./SimplePrivacyService";

export default httpCreateServer((req:IncomingMessage, res:ServerResponse) => {
  // This is the requestListener function for our controller. It is invoked when the server recieves a request.
  // Perform very simple routing here to the various REST resource service functions

    try {
        const reqURL = new URL(req.url!, `http://${req.headers.host}`);
        console.log("[SPS][SimplePrivacyServer]: Request:" + req.method + " Resource: " + reqURL.pathname + reqURL.search);

        if (reqURL.pathname == "/secret" && req.method === "GET") {
          service.secretRequest(req, res);
          return;
        } else if (reqURL.pathname == "/sample" && req.method === "GET") {
          service.sampleRequest(req, res);
          return;
        }
        service.unknownRequest(req, res);
        return;
    }
    catch (e){
        console.log(e);
    }
});
