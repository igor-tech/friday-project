export const redactorDataTime = (dataTime: string) => {
  return dataTime
    .slice(0, -14)
    .replace(/(\d+).(\d+).(\d+)/, '$3-$2-$1')
    .replace(/-/g, '.')
}
