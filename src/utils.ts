export const formatString = (text: string, args: string[]) => {
  let res = text
  for (const arg of args) {
    res = res.replace(/{}/, arg)
  }
  return res
}
