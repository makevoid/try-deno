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
    let { blockNum } = params
    console.log("blockNum:", blockNum)
    blockNum = intToHex(blockNum)
    console.log("blockNum:", blockNum, "(hex)")
    const block = await getBlock({ blockNum })
    return JSON.stringify(block)
  }),
  get("/blocks", () => redirect("/", 302)),
  get("/error", () => [500, "this is a sample error"]),
  get("/info", () => [
    200,
    contentType("json"),
    JSON.stringify({ app: "dinatra eth blocks app", version: "0.7.0" }),
  ]),
)

console.log("app started")
const resp = await getBlockNum()
console.log("block number:", resp)
