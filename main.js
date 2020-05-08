import {
  app,
  get,
  post,
  redirect,
  contentType,
} from "https://denopkg.com/syumai/dinatra@0.12.0/mod.ts"

const ethRpcHost = "https://main-rpc.linkpool.io"
const msg = {
  method: "eth_blockNumber",
  id: 1,
  params: [],
  jsonrpc: "2.0",
}

let res = await fetch(ethRpcHost, {
    method: 'POST',
    body: JSON.stringify(msg),
    keepalive: true,
  })

// res = await res.json()
console.log("JSON:", res)
Deno.exit()

app(
  get("/", () => "hello"),
  get("/hello", () => "hello"),
  get("/hello2", async () => "hello"),
  get("/hello/:id", ({ params }) => params.id),
  get("/error", () => [500, "an error has occured"]),
  get("/foo", () => redirect("/hello", 302)),
  get("/info", () => [
    200,
    contentType("json"),
    JSON.stringify({ app: "dinatra", version: "0.0.1" }),
  ]),
)
