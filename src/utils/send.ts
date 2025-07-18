import { Embed } from "../typings/types.js";

export const sendToDiscord = async (
  embed: Embed,
  isError?: Boolean
): Promise<void> => {
  const webhookArr = isError
    ? [process.env.DISCORD_ERROR_WEBHOOK_URL]
    : process.env.DISCORD_WEBHOOK_URLS.split(",");
  for (const webhookURL of webhookArr) {
    try {
      const url = webhookURL.replace("api", "api/v10");
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ embeds: [embed] }),
      });

      if (!res.ok) {
        console.error(res);
        console.error(await res.json());
      }
    } catch (error) {
      console.error(error);
    }
  }
};
