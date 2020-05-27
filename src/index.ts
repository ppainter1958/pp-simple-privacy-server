import { SimplePrivacyController } from "./SimplePrivacyController";

var env_file = process.argv[2];

export function main() {
  var myServiceController = new SimplePrivacyController(env_file);
  myServiceController.startService();
}
console.log("[SPS][main]: starting");
main();
console.log("[SPS][main]: exiting");
