import { customFetchOptions } from "../typings/types.js";
import CurlImpersonate from "node-curl-impersonate";

const customFetch = async (options: customFetchOptions) => {
  const url = `${process.env.SMART_DATA_TRADING_URL}${options.path}`;

  const requestOptions = {
    method: options.method,
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
      "user-agent": process.env.USER_AGENT,
    },
    // redirect: "manual", // so it doesnt redirect to /login page when cookie expires rather will return 302 causing to throw error
  };

  if (options.additionalHeaders)
    requestOptions.headers = {
      ...requestOptions.headers,
      ...options.additionalHeaders,
    };

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

  // if the server responded with a 4xx or 5xx error
  if (
    responseStatusCode &&
    ["4", "5"].includes(responseStatusCode.toString()[0])
  ) {
    console.log(response);
    throw new Error(`Bad response from the site (${responseStatusCode}).`);
  }

  return response;

  // if (options.body) requestOptions.body = JSON.stringify(options.body);

  // const res = await fetch(url, requestOptions);

  // const data = await res.text();

  // if (res.status !== 200) {
  //   console.log(res);
  //   console.log(data);
  //   throw new Error(
  //     `Bad response from the site (${res.status}). ${res.statusText}`
  //   );
  // }

  // return data;
};

export default customFetch;
