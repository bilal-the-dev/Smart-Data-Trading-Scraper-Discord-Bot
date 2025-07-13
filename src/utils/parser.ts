import * as cheerio from "cheerio";
import sanitizeHtml from "sanitize-html";

import { Announcement, AnnouncementResponse } from "../typings/types.js";

export const parseHtmlToJson = (html: string): AnnouncementResponse => {
  const $ = cheerio.load(html);

  const body = $("#app").attr("data-page");

  if (!body) throw new Error("Could not fetch alerts, please check logs");

  return JSON.parse(body);
};

export const createAnnouncementEmbed = (a: Announcement) => {
  // Convert to Unix timestamp (in seconds, not milliseconds)
  console.log(new Date(a.created_at));

  const unixTimestamp = Math.floor(new Date(a.created_at).getTime() / 1000);

  const cleanContent = sanitizeHtml(a.content, {
    allowedTags: [],
    allowedAttributes: {},
  });
  return {
    title: a.type.label,
    description: `${cleanContent}\n\n<t:${unixTimestamp}:f>`, // shows e.g. "July 11, 2025 at 11:32 PM"
    color: parseInt(a.type.label_color.replace("#", ""), 16),
    author: {
      name: `${a.user.first_name} ${a.user.last_name}`,
      icon_url: a.user.profile_photo_url,
    },
  };
};
export const createErrorEmbed = (error: Error) => {
  return {
    title: "⚠️ Scraper Error",
    description: `\`\`\`${error.message}\`\`\``,
    color: 0xff0000,
  };
};
