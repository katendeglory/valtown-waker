import https from "node:https";

const url1 = "https://chron-waker.onrender.com";
const url2 = "https://voxdeitv-411l.onrender.com";

function httpsGet(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

export default async function (req: Request): Promise<Response> {
  try {
    // Run both requests in parallel
    const [data1, data2] = await Promise.all([httpsGet(url1), httpsGet(url2)]);

    console.log("Response from url1:", data1);
    console.log("Response from url2:", data2);

    return Response.json({ success: "@@ Waking up both services..." });
  } catch (err: any) {
    return Response.json({ error: err.message });
  }
}
