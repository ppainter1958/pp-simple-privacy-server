import { SimplePrivacyController } from "./SimplePrivacyController";

const env_file = process.argv[2];

export function main(): void {
  console.log("[SPS][main]: starting with: " + process.argv[2]);
  try {
    const myServiceController = new SimplePrivacyController(env_file);
    myServiceController.startService();
  }
  catch (e) {
    console.log("[SPS][main]: Exception from SimplePrivacyControllor:");
    console.log("  " + e);
  }
  console.log("[SPS][main]: exiting");
}

main();

