import CurlImpersonate from "node-curl-impersonate";

async function scrape(params) {
  const requestOptions = {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9,fr;q=0.8",
      "cache-control": "no-cache",
      cookie: process.env.SMART_DATA_REMEMBER_COOKIE,
      origin: process.env.SMART_DATA_TRADING_URL,
      pragma: "no-cache",
      priority: "u=0, i",
      "sec-ch-ua":
        '"Not)A;Brand";v="8", "Chromium";v="138", "Microsoft Edge";v="138"',
      "sec-ch-ua-arch": '"x86"',
      "sec-ch-ua-bitness": '"64"',
      "sec-ch-ua-full-version": '"138.0.3351.83"',
      "sec-ch-ua-full-version-list":
        '"Not)A;Brand";v="8.0.0.0", "Chromium";v="138.0.7204.101", "Microsoft Edge";v="138.0.3351.83"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-model": '""',
      "sec-ch-ua-platform": '"Windows"',
      "sec-ch-ua-platform-version": '"10.0.0"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "user-agent": "PostmanRuntime/7.45.0",
    },
    redirect: "manual", // so it doesnt redirect to /login page when cookie expires rather will return 302 causing to throw error
  };

  const url = process.env.SMART_DATA_TRADING_URL + "/alerts";
  const curlImpersonate = new CurlImpersonate(url, {
    method: "GET",
    impersonate: "chrome-116",
    headers: requestOptions.headers,
    followRedirects: false,
  });

  const curlResponse = await curlImpersonate.makeRequest();

  // extract the response data
  const response = curlResponse.response;
  const responseStatusCode = curlResponse.statusCode;
  console.log(curlResponse);
  console.log(responseStatusCode);
}

scrape();
