import CurlImpersonate from "node-curl-impersonate";

async function scrape(params) {
  const headers = { "user-agent": process.env.USER_AGENT };
  //   const res = await fetch(process.env.SMART_DATA_TRADING_URL + "/alerts", {
  //     redirect: "manual",
  //     headers: { "user-agent": process.env.USER_AGENT },
  //   });
  //   console.log(await res.text());
  //   console.log(res);

  const curlImpersonate = new CurlImpersonate(
    process.env.SMART_DATA_TRADING_URL + "/alerts",
    {
      method: "GET",
      headers: {},
      followRedirects: false,
    }
  );

  const curlResponse = await curlImpersonate.makeRequest();

  // extract the response data
  const response = curlResponse.response;
  const responseStatusCode = curlResponse.statusCode;
  console.log(curlResponse);
  console.log(responseStatusCode);
}

scrape();
