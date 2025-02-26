import https from "node:https";

const url = "https://chron-waker.onrender.com";

export default async function(req: Request): Promise<Response> {
   try {
        https
            .get(url, (response) => {
                let data = "";
                response.on("data", (chunk) => {
                    data += chunk;
                });
                response.on("end", () => {
                    console.log("Response data:", data);
                });
            })
            .on("error", (err) => {
                console.log("Error:", err.message);
            });

        return Response.json({ success: "@@ Waking up main chron..." });
    } catch (err: any) {
        return Response.json({ error: err.message });
    }
}
