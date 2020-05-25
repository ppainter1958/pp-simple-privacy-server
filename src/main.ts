import path from "path";
import { PrivateServer } from "./PrivateServer";
import env from "node-env-file";

var env_file = process.argv[2];

function initEnv(): boolean {
  // First command line arg should be a pathname to the privacy.env
  // to setup for the PrivateService.
  if (typeof env_file !== "string") {
    console.error(
      "[SPS]: ERROR Environment file argument is not a valid `String`:",
      env_file
    );
    return false;
  }

  try {
    env_file = path.resolve(env_file);
  } catch (err) {
    console.error("[SPS]: Environment file path could not be resolved: " + err);
    return false;
  }

  console.log("[SPS]: Environment file path:" + env_file);
  try {
    env(env_file);
    console.log("[SPS]: Configured privacy environment settings");
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
}

export function main() {
  if (initEnv()) {
    var myServer = new PrivateServer(env_file);
    myServer.listenNow();
  }
}
console.log("[SPS]: main starts");
main();
console.log("[SPS]: main exits");
