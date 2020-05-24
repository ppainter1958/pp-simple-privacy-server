import url from 'url';
import * as http from "http";
import * as service from "./Service";

export default http.createServer((req, res) => {
  // This is the requestListener function for our controller.
  // Perform very simple routing here to the various REST resource service functions

    try {
        const reqURL = new URL(req.url!, `http://${req.headers.host}`);
        console.log("Request Type:" + req.method + " Endpoint: " + reqURL.pathname);

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
        console.trace();
        console.log(e);
    }
});
