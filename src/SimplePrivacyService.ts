import path from 'path';
import env = require('node-env-file');
const prefix: string = "[SPService]";

export interface SPServiceSearchParams {
  [index: string]: any
}

export class SimplePrivacyService {
  private env_filename: string;
  constructor(theEnvFileName: string) {
    this.env_filename = theEnvFileName;
    SimplePrivacyService.initEnv(this.env_filename);
  }

  secretsRequest(secretId: string): object {
    //  Lookup the secret key in the env and return its value
    let response = JSON.parse('{"key":"value"}');
    let pref = `"${prefix}[secretsRequest]:\n"`;
    response.key = secretId;
    response.value = process.env[secretId] || "NotFound";
    let msg = response.value
      ? "  Returned value for key:"
      : "  Value not found for key:";
    console.log(pref + msg);
    return response;
  }

  sampleRequest(qsParams: SPServiceSearchParams): object {
    let pref = `"${prefix}[sampleRequest]:\n"`;
    console.log("  Query string values:" + JSON.stringify(qsParams));
    // qsParams.keys().forEach((name:string) => {}
    return qsParams;
  }

  static initEnv(env_file: string) {
    if (typeof env_file !== "string") {
      let e = new TypeError(
        prefix + "[initEnv]: env filename argument is not a valid String:"
      );
      console.error(e.message + env_file);
      throw e;
    }

    try {
      env_file = path.resolve(env_file);
    } catch (err) {
      console.error(
        prefix + "[initEnv]: Environment file path could not be resolved: "
      );
      console.error("  " + err.name + ":" + err.message);
      throw err;
    }

    console.log(prefix + "[initEnv]: Environment file path:" + env_file);
    try {
      env(env_file);
      console.log(
        prefix + "[initEnv]: Configured privacy environment settings"
      );
    } catch (err) {
      console.error(prefix + "[initEnv]: Exception processing:" + env_file);
      console.error("  " + err.name + ":" + err.message);
      throw err;
    }
  }
}
