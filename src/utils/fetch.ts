import { customFetchOptions } from "../typings/types.js";

const customFetch = async (options: customFetchOptions) => {
  const url = `${process.env.SMART_DATA_TRADING_URL}${options.path}`;

  const requestOptions: RequestInit = {
    method: options.method,
    headers: {
      cookie: process.env.SMART_DATA_REMEMBER_COOKIE,
    },
    redirect: "manual", // so it doesnt redirect to /login page when cookie expires rather will return 302 causing to throw error
  };

  if (options.additionalHeaders)
    requestOptions.headers = {
      ...requestOptions.headers,
      ...options.additionalHeaders,
    };

  if (options.body) requestOptions.body = JSON.stringify(options.body);

  const res = await fetch(url, requestOptions);

  const data = await res.text();

  if (res.status !== 200) {
    console.log(res);
    console.log(data);
    throw new Error(
      `Bad response from the site (${res.status}). ${res.statusText}`
    );
  }

  return data;
};

export default customFetch;
