import {
  app,
  get,
  post,
  redirect,
  contentType,
} from "https://denopkg.com/syumai/dinatra@0.12.0/mod.ts"


// // get block number via curl (and jq):
// read res <<< $(curl -s -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' -H "Content-Type: application/json" "https://main-rpc.linkpool.io" | jq -r .result) && echo $(($res))

const ethRpcHost = "https://main-rpc.linkpool.io"

const rpcCall = async ({method, params}) => {
  const msg = {
    // method: "eth_blockNumber",
    method: method,
    id: 1,
    // params: [],
    params: params || [],
    jsonrpc: "2.0",
  }

  let resp = await fetch(ethRpcHost, {
      method: 'POST',
      body: JSON.stringify(msg),
      keepalive: true, // ;)
      headers: {
       'Content-Type': 'application/json',
      },
    })

  return resp
}

const getBlockNum = async () => {
  let resp = await rpcCall({ method: "eth_blockNumber" })

  try {
    resp = await resp.json()
  } catch(err) {
    console.error(`Error: `)
  }
  // console.log("JSON:", resp)
  resp = resp.result
  console.log("result:", resp, "(hex)")
  resp = parseInt(resp, 16)
  return resp
}

const resp = await getBlockNum()
console.log("block number:", resp)
// Deno.exit()

app(
  get("/", async () => {
    const resp = await getBlockNum()
    console.log("block number:", resp)
    return `block number: ${resp}`
  }),
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
