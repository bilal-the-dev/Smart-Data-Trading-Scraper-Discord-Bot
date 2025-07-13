# 📈 Smart Data Trading Announcement Scraper Bot

This bot scrapes **announcements** from [Smart Data Trading](https://portal.smartdatatrading.com), detects new alerts in real-time, and sends them to a Discord channel using a webhook embed.

![Sample](./sample.PNG)

---

## 🔧 Setup

### 1. Clone the Repository

```bash
git clone https://github.com/bilal-the-dev/Smart-Data-Trading-Scraper-Discord-Bot scraperBot
cd scraperBot
```

````

### 2. Install Dependencies

```bash
npm install
```

---

## 📁 .env Configuration

Create a `.env` file in the root directory with the following values:

```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxx/your-webhook-id
SMART_DATA_TRADING_URL=https://portal.smartdatatrading.com
SMART_DATA_REMEMBER_COOKIE=remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiIxxxxx
```

### 🔑 Details:

- **`DISCORD_WEBHOOK_URL`**
  The webhook URL where the bot will send new announcements as Discord embeds.

- **`SMART_DATA_TRADING_URL`**
  The base URL to scrape announcements from (usually doesn't need to change).

- **`SMART_DATA_REMEMBER_COOKIE`**
  This is a long-lived cookie required to access announcement data.
  👉 You can retrieve it from your browser via **Inspect > Application > Cookies > portal.smartdatatrading.com**
  The cookie is valid for up to **1 year**.

---

## ▶️ Run the Bot

```bash
npm run start
```


## 🧠 Features

- Sends **new announcements only**, with embed-style formatting
- Detects changes in real-time and caches previously seen alerts
- Includes:

  - Announcement type and color
  - Author name and avatar
  - Timestamp (`<t:...:f>` format)
  - Clean alert titles

---



## 🛠 Built With

- TypeScript
- Native `fetch` API
- Discord Webhooks
- HTML scraping + parsing

---


````
