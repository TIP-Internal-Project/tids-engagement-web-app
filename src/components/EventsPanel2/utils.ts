export const setTimeFormat = (aDateString: string): string => {
  const aDate = new Date(aDateString)
  const timeString = aDate.toLocaleTimeString().slice(0, -6)
  const newFormat = aDate.getHours() >= 12 ? 'PM' : 'AM'
  return `${timeString} ${newFormat}`
}
