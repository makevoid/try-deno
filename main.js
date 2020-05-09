import { app, get, post, redirect, contentType } from "https://denopkg.com/syumai/dinatra@0.12.0/mod.ts"
import { getBlockNum, getBlock } from './lib.js'
import { throwError } from './errors.js'
import { intToHex } from './utils.js'

app(
  get("/", async () => {
    // return block number
    const resp = await getBlockNum()
    console.log("block number:", resp)
    return `block number: ${resp}`
  }),
  get("/blocks/:blockNum", async ({ params }) => {
    console.log("blockNum:", params.blockNum)
    let { blockNum } = params
    blockNum = intToHex(blockNum)
    console.log("blockNum:", blockNum)
    const resp = await getBlock({ blockNum })
    console.log("block:", resp)
    return `block: ${JSON.stringify(resp)}`
  }),
  get("/error", () => [500, "this is a sample error"]),
  get("/redirect", () => redirect("/", 302)), // sample redirect
  get("/info", () => [
    200,
    contentType("json"),
    JSON.stringify({ app: "dinatra", version: "0.0.1" }),
  ]),
)

console.log("app started")
const resp = await getBlockNum()
console.log("block number:", resp)
