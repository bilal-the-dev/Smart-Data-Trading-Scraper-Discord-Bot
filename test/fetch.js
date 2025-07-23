async function scrape(params) {
  const res = await fetch(process.env.SMART_DATA_TRADING_URL + "/alerts", {
    redirect: "manual",
  });
  console.log(await res.text());
  console.log(res);
}

scrape();
