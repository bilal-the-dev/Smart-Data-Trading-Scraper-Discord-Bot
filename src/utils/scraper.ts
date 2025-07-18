import customFetch from "./fetch.js";
import {
  createAnnouncementEmbed,
  createErrorEmbed,
  parseHtmlToJson,
} from "./parser.js";
import { sendToDiscord } from "./send.js";

const cachedAnnouncementsIds: Array<Number> = [];

export const scraperAndProcessAnnouncements = async (): Promise<void> => {
  try {
    console.log("Starting to scrape!");

    const scrapedHtml = await customFetch({ path: "/alerts" });

    const data = parseHtmlToJson(scrapedHtml);

    const fetchedAnnouncements = data.props.announcements.data.map((d) => d);

    console.log(`Fetched ${fetchedAnnouncements.length} announcements!`);

    if (
      process.env.NODE_ENV !== "development" && // if development, it wont add to cache
      !cachedAnnouncementsIds.length
    ) {
      console.log("First time adding in cache!");
      cachedAnnouncementsIds.push(...fetchedAnnouncements.map((a) => a.id));
      return;
    }

    const newAnnouncements = fetchedAnnouncements.filter(
      (a) => !cachedAnnouncementsIds.includes(a.id)
    );

    console.log(newAnnouncements);

    console.log(`Fetched ${newAnnouncements.length} new announcements!`);

    for (const newAnnouncement of newAnnouncements) {
      const embed = createAnnouncementEmbed(newAnnouncement);
      await sendToDiscord(embed);
      cachedAnnouncementsIds.push(newAnnouncement.id); // add in cache after processing
    }
  } catch (error) {
    // some error occured, while fetching or parsing the html or anything
    // we'll send logs on discord

    console.log(error);

    if (error instanceof Error) {
      const embed = createErrorEmbed(error);
      await sendToDiscord(embed, true);
    }
  }
};
