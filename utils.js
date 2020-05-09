const intToHex = (int) => {
  let hex = parseInt(int).toString(16)
  hex = `0x${hex}`
  return hex
}

export {
  intToHex
}
