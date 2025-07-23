import puppeteer from "puppeteer";
// import puppeteer from "puppeteer-extra";
// import StealthPlugin from "puppeteer-extra-plugin-stealth";

// puppeteer.use(StealthPlugin());
(async () => {
  const url = process.env.SMART_DATA_TRADING_URL + "/login";
  const browser = await puppeteer.launch({
    headless: false, // must be false to handle Cloudflare challenges properly,
    devtools: true,
    // args: ["--no-sandbox", "--disable-setuid-sandbox"],
    // args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // const userAgent = process.env.USER_AGENT;
  // await page.setUserAgent(userAgent);

  await page.goto(url, { waitUntil: "networkidle2" });

  const cookies = await browser.cookies();

  const cfClearance = cookies.find((cookie) => cookie.name === "cf_clearance");
  if (cfClearance) {
    console.log("✅ cf_clearance cookie found:");
    console.log(cfClearance);
  } else {
    console.log(
      "❌ cf_clearance cookie not found. Cloudflare challenge may not have completed."
    );
  }

  // Log user agent
  const currentUA = await page.evaluate(() => navigator.userAgent);
  console.log("\n🧾 User Agent:\n", currentUA);

  // await browser.close();
})();
