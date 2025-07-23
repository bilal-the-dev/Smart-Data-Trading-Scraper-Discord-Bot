async function fetch(params) {
  const res = await fetch(process.env.SMART_DATA_TRADING_URL + "/alerts");
  console.log(res);
  console.log(await res.text());
}

fetch();
