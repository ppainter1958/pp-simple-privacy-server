import url from "url";

export let secretRequest = function (req, res) {
  //  Lookup the secret key in the env and return its value
  const reqURL = new URL(req.url!, `http://${req.headers.host}`);
  let keyValue = reqURL.searchParams.get("key");
  let response = {};
  response[keyValue!] = process.env[keyValue!];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(response));
};

export let sampleRequest = function (req, res) {
  const reqURL = new URL(req.url!, `http://${req.headers.host}`);
  var response = {};
  reqURL.searchParams.forEach((value, name) => {
    response[name] = value;
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(response));
};

export let errorInRequest = function (req, res, e) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(e));
};

export function unknownRequest(req, res) {
  var response = {};
  response["Status"] = "Unknown Service";
  response["Message"] = "text";

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(response));
}

export default secretRequest;
