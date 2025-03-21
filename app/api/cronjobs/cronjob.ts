import cron from "node-cron";
import { checkForNewIssues } from "../issues";

// Runs every 5 minutes (*/5 * * * *)
cron.schedule("*/5 * * * *", async () => {
  await checkForNewIssues();
  console.log("Checked for new issues at:", new Date().toLocaleTimeString());
});
