import url from "url";
import { IncomingMessage, ServerResponse, STATUS_CODES } from "http";

export let secretRequest = function (req:IncomingMessage, res:ServerResponse) {
  //  Lookup the secret key in the env and return its value
  const reqURL = new URL(req.url!, `http://${req.headers.host}`);
  let keyValue = reqURL.searchParams.get("key");
  let response = {};
  response[keyValue!] = process.env[keyValue!] ||"NotFound";
  if (process.env[keyValue!]) {
    console.log("[SPS][SimplePrivacyService][secretRequest]:");
    console.log("  Returned value for key:" + keyValue);
  } else {
    console.log("[SPS][SimplePrivacyService][secretRequest]:");
    console.log("  Value not found for key:" + keyValue);
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(response));
};

export let sampleRequest = function (req:IncomingMessage, res:ServerResponse) {
  const reqURL = new URL(req.url!, `http://${req.headers.host}`);
  console.log("[SPS][SimplePrivacyService][sampleRequest]:");
  console.log("  Query string values:");
  var response = {};
  reqURL.searchParams.forEach((value, name) => {
    response[name] = value;
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(response));
};

export let errorInRequest = function (req:IncomingMessage, res:ServerResponse, e:Error) {
  console.error("[SPS][SimplePrivacyService][errorInRequest]:");
  console.error(`  ERROR: " ${e.name}:${e.message}`);
  res.statusCode = 500;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(e));
};

export function unknownRequest(req:IncomingMessage, res:ServerResponse) {
  const reqURL = new URL(req.url!, `http://${req.headers.host}`);
  console.log("[SPS][SimplePrivacyService][UnknownRequest]:");
  console.log(`  Unknown: ${reqURL.pathname}:${reqURL.search}`);
  var response = {};
  response["Status"] = "UnknownService";
  response["Message"] = `${reqURL.pathname}:${reqURL.search}`;

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(response));
}

export default secretRequest;
