const rpcCall = async (ethRpcHost, { method, params }) => {
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

export {
  rpcCall
}
