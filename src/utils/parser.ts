import * as cheerio from "cheerio";
import sanitizeHtml from "sanitize-html";

import { Announcement, AnnouncementResponse, Embed } from "../typings/types.js";

export const parseHtmlToJson = (html: string): AnnouncementResponse => {
  const $ = cheerio.load(html);

  const body = $("#app").attr("data-page");

  if (!body) throw new Error("Could not fetch alerts, please check logs");

  return JSON.parse(body);
};

export const createAnnouncementEmbed = (a: Announcement): Embed => {
  // Convert to Unix timestamp (in seconds, not milliseconds)

  const unixTimestamp = Math.floor(new Date(a.created_at).getTime() / 1000);
  const cleanContent = sanitizeHtml(a.content, {
    allowedTags: [],
    allowedAttributes: {},
  });

  const imageURL = cheerio.load(a.content)("img").attr("src");

  const embedData: Embed = {
    description: `${cleanContent}\n\n<t:${unixTimestamp}:f>`, // shows e.g. "July 11, 2025 at 11:32 PM"
  };

  if (a.type) {
    embedData.title = a.type.label;
    embedData.color = parseInt(a.type.label_color.replace("#", ""), 16);
  }

  if (imageURL) embedData.image = { url: imageURL };

  return embedData;
};
export const createErrorEmbed = (error: Error): Embed => {
  return {
    title: "⚠️ Scraper Error",
    description: `\`\`\`${error.message}\`\`\``,
    color: 0xff0000,
  };
};
