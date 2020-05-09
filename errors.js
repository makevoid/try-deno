// TODO: needs more errors :)

// generic throw syntactic sugar
const throwError = (err) => {
  console.error(`Error: `)
  console.error(err)
  throw new Error(error || "RPCErrors_StandardError")
}

export {
  throwError
}
