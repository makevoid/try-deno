# try-deno

Trying out Deno's Dinatra (using JS)

This is a sample API that exposes an ethereum blockchain API (you can use it to read blocks information).


### Dependencies

- A Geth (go-ethereum) full node, exposing local rpc to localhost

The app queries a Geth / Ethereum node via its JSON RPC API.


### run

    deno run --allow-net main.js

then visit http://localhost:8080/


### run with Docker

    docker-compose up

then visit http://localhost/
