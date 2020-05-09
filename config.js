const { env } = Deno

let ethRpcHostDefault = null
try {
  ethRpcHostDefault = env.get("RPC_HOST")
} catch (err) {
  // null
}
const ethRpcHost = ethRpcHostDefault || "https://main-rpc.linkpool.io"

export {
  ethRpcHost
}
