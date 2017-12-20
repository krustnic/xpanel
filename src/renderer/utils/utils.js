export const invokeUntil = (ivokingFunction, checkFunction, interval, timpout, currentTimestamp) => {
  if (checkFunction()) return
  currentTimestamp = currentTimestamp || (new Date()).getTime()
  console.log(1)
}
