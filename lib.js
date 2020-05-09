// web3 like lib, just starting with two rpc calls, one with and one without parameters: blockByNumber() and blockNumber()

import { rpcCall } from './json-rpc.js'
import { ethRpcHost } from './config.js'

const blockNumber = async (host) => {
  let resp = await rpcCall(host, {
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

const blockByNumber = async (host, { blockNum }) => {
  let resp = await rpcCall(host, {
    method: "eth_getBlockByNumber",
    params: [blockNum, false],
  })
  try {
    resp = await resp.json()
  } catch(err) {
    throwError(err, "RPCErrors_GetBlock")
  }
  resp = resp.result
  console.log("got block ", blockNum, " - hash:", resp.hash)
  return resp
}

// web3 data handlers to be used in the webapp

const ethRpc = ethRpcHost

const getBlockNum = async () => {
  const blockNum = blockNumber(ethRpc)
  return blockNum
}

const getBlock = async ({ blockNum }) => {
  const block = blockByNumber(ethRpc, { blockNum })
  return block
}

export {
  getBlockNum,
  getBlock,
}
