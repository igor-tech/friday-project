export const redactorDataTime = (dataTime: string) => {
  return new Intl.DateTimeFormat('ru').format(Date.parse(dataTime))
}
