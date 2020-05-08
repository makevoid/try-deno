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

const rpcCall = async ({ method, params }) => {
  const msg = {
    method: method,
    id: 1,
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

const intToHex = (int) => {
  let hex = parseInt(int).toString(16)
  hex = `0x${hex}`
  return hex
}

const throwError = (err) => {
  console.error(`Error: `)
  console.error(err)
  throw new Error(error || "RPCErrors_StandardError")
}

const getBlockNum = async () => {
  let resp = await rpcCall({
    method: "eth_blockNumber",
    params: [],
  })
  try {
    resp = await resp.json()
  } catch(err) {
    throwError(err, "RPCErrors_BlockNumber")
  }
  resp = resp.result
  console.log("result:", resp, "(hex)")
  resp = parseInt(resp, 16)
  return resp
}

const getBlock = async ({ blockNum }) => {
  let resp = await rpcCall({
    method: "eth_getBlockByNumber",
    params: [blockNum, false],
  })
  try {
    resp = await resp.json()
  } catch(err) {
    throwError(err, "RPCErrors_GetBlock")
  }
  console.log("resp:", resp)
  resp = resp.result
  console.log("result:", resp)
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
  get("/block/:blockNum", async ({ params }) => {
    console.log("blockNum:", params.blockNum)
    let { blockNum } = params
    blockNum = intToHex(blockNum)
    console.log("blockNum:", blockNum)
    const resp = await getBlock({ blockNum })
    console.log("block:", resp)
    return `block: ${JSON.stringify(resp)}`
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
