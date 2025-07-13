import { CronJob } from "cron";
import { scraperAndProcessAnnouncements } from "./utils/scraper.js";

await scraperAndProcessAnnouncements();

CronJob.from({
  cronTime: "0 * * * * *",
  onTick: scraperAndProcessAnnouncements,
  start: true,
});
