import { URL } from "url";
import { IncomingMessage, ServerResponse } from "http";
import { SimplePrivacyServer } from "./SimplePrivacyServer";
import { SimplePrivacyService, SPServiceSearchParams, RequestBody} from "./SimplePrivacyService";

const prefix = "[SPController]";

export class RequestError {
  constructor(private type: string, private message: string) {}
}

export class RequestException {
  constructor(
    private type: string,
    private message: string,
    private innerError: Error
  ) {}
}

export class SimplePrivacyController {
  env_file = "";
  spsServer: SimplePrivacyServer;
  spsService: SimplePrivacyService;
  constructor(env_file: string) {
    console.log(`${prefix}[constructor]:`);
    //https://ponyfoo.com/articles/binding-methods-to-class-instance-objects
    this.requestListener = this.requestListener.bind(this);
    this.env_file = env_file;
    console.log(`${prefix}[constructor]:Setup SPServer`);
    this.spsServer = new SimplePrivacyServer(this.requestListener);
    console.log(`${prefix}[constructor]:Setup SPService`);
    this.spsService = new SimplePrivacyService(this.env_file);
  }

  startService(): void {
    console.log(`${prefix}[startService]: Invoking server.listenNow()`);
    this.spsServer.listenNow();
  }

  requestListener(req: IncomingMessage, res: ServerResponse): void {
    // This is the requestListener function for our controller. It is invoked when the server recieves a request.
    // Perform very simple routing here to the various REST API
    // resource calls to the simple privacy service functions.
    // All parsing of pathname and query parameters is done here in the controller
    let reqURL = {} as URL;  // May need this in the catch()
    try {
      reqURL = new URL(req.url as string, `http://${req.headers.host}`);
      // reqURL.searchParams is an URLSearchParams object with any query parameters
      // reqURL.pathname should always have a leading '/' character, remove it.
      const reqPath = this.removeLeadingSlash(reqURL.pathname);
      const resourcePartsArray = reqPath.split("/"); // array of the resource path elements
      // prettier-ignore
      console.log(prefix + "[requestListener]: Request:" + req.method +
      " Resource: " + reqURL.pathname + " [" +
      resourcePartsArray + "] [" + reqURL.search + "]");

      // Only support "GET" method right now
      if (req.method !== "GET") {
        const etype = "POSTMethodNotSupported";
        const msg = "Unsupported method: POST";
        return this.badRequest(res, new RequestError(etype, msg));
      }
      // Dispath the routed request
      let response = {};
      switch (
        resourcePartsArray[0].toLowerCase() // case insensitive
      ) {
        case "secrets":
          if (
            reqPath.length < 2 ||
            resourcePartsArray[1] == undefined ||
            resourcePartsArray[1].length == 0
          ) {
            const etype = "SecretsMissingSecretId";
            const msg = "Missing secretId, expected format secrets/{secretId}";
            return this.badRequest(res, new RequestError(etype, msg));
          }
          response = this.spsService.secretsRequest(resourcePartsArray[1]);
          this.goodRequest(res, response);
          break;
        case "testunknownservererror":
          throw "Testing UnknowServerError";
        case "sample": {
          const qsParams: SPServiceSearchParams = {}; // declare the object member types
          reqURL.searchParams.forEach((value: string, name: string) => {
            qsParams[name] = value;
          });
          response = this.spsService.sampleRequest(qsParams);
          this.goodRequest(res, response);
          break;
        }
        default: {
          const etype = "RequestError";
          const msg = `Unknown request: ${reqURL.href}`;
          console.warn(prefix + "[requestListener]:" + msg);
          response = JSON.parse('{"status":"", "message":""}');
          this.badRequest(res, new RequestError(etype, msg));
          break;
        }
      }
    } catch (e) {
      const etype = "RequestException";
      const msg = prefix + "Exception caught from request:" + `${reqURL.href}`;
      console.log(prefix + "[requestListener][exception handler]:" + msg);
      console.log("  caught error:" + e);
      this.errorInRequest(res, new RequestException(etype, msg, e));
    }
  }

  removeLeadingSlash(sVal: string): string {
    return sVal.charAt(0) == "/" ? sVal.slice(1) : sVal;
  }

  goodRequest(res: ServerResponse, response: RequestBody): void {
    this.endRequest(res, response, 200);
  }

  badRequest(res: ServerResponse, response: RequestError): void {
    this.endRequest(res, response, 400);
  }

  errorInRequest(res: ServerResponse, response: RequestException): void {
    this.endRequest(res, response, 500);
  }

  endRequest(res: ServerResponse, response: RequestBody|RequestError|RequestException, status: number): void {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response));
  }
}

// export default httpCreateServer((req: IncomingMessage, res: ServerResponse) => {
//   const reqURL = new URL(req.url!, `http://${req.headers.host}`);
//   // reqURL.searchParams is an object with any query parameters
//   // reqURL.pathname should always have a leading '/' character, remove it.
//   var reqPath = removeLeadingSlash(reqURL.pathname);
//   var resourcePartsArray = reqPath.toLowerCase().split("/"); // not case sensitive
//   // prettier-ignore
//   console.log( "[SPS][SimplePrivacyServer]: Request:" + req.method +
//     " Resource: " + reqURL.pathname + " " +
//     resourcePartsArray + " " + reqURL.search);
//   res.setHeader("Content-Type", "application/json");
//   // Only support "GET" method right now
//   if (req.method !== "GET") {
//     return badRequest(res, POSTMethodNotSupported);
//   }
//   // Dispath the routed request
//   try {
//     switch (reqPath[0]) {
//       case "secrets":
//         if ((reqPath.length < 2) || (reqPath[1] == undefined) || (reqPath[1].length == 0)) {
//           return badRequest(res, SecretsMissingSecretId);
//         }
//         service.secretRequest(reqPath[1]);
//         break;
//       case "testunknownservererror":
//         throw "Testing UnknowServerError";
//       case "sample":
//         service.sampleRequest(req, res);
//         break;
//       default:
//         service.unknownRequest(req, res);
//         return;
//     }
//   } catch (e) {
//     console.log(
//       "[SPS][SimplePrivacyServer][error handler]: Error with Request:" +
//         req.method +
//         " Resource: " +
//         reqURL.pathname +
//         reqURL.search
//     );
//     console.log("  " + e);
//     service.errorInRequest(req, res, e);
//   }
// })
