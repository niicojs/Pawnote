import * as pronote from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const handle = pronote.createSessionHandle();
  await pronote.loginCredentials(handle, {
    url: credentials.pronoteURL,
    kind: pronote.AccountKind.STUDENT,
    username: credentials.username,
    password: credentials.password,
    deviceUUID: credentials.deviceUUID
  });

  // Grab all the resources for week 1 through week 4.
  const resources = await pronote.resourcesFromWeek(handle, 1, 4);
  console.log(resources.length, "resources found");

  for (const resource of resources) {
    console.log(); // New line

    if (!resource.haveAssignment) {
      console.info("No assignment for", resource.id);
      continue;
    }

    const assignments = await pronote.resourceAssignments(handle, resource.id);
    console.log("Assignments for", resource.id, `(${assignments.length} found)`);
    console.log(`=> ${assignments.map((assignment) => assignment.description).join("\n=> ")}`);
  }
}();
