get block number via curl (and jq):

    read res <<< $(curl -s -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' -H "Content-Type: application/json" "https://main-rpc.linkpool.io" | jq -r .result) && echo $(($res))
