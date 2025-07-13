export const sendToDiscord = async (embed: any): Promise<void> => {
  try {
    const url = process.env.DISCORD_WEBHOOK_URL.replace("api", "api/v10");
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!res.ok) {
      console.error(res);
    }
  } catch (error) {
    console.error(error);
  }
};
