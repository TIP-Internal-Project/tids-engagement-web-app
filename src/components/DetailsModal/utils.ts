export const formatDate = (eventDate: string) => {
  const newEventDate = new Date(eventDate)
  const year = newEventDate.getFullYear()
  const month = addZero(newEventDate.getMonth() + 1)
  const date = addZero(newEventDate.getDate())
  const hour = addZero(newEventDate.getHours())
  const minute = addZero(newEventDate.getMinutes())
  const formattedDate = year + '-' + month + '-' + date + ' ' + hour + ':' + minute
  return formattedDate
}

export const addZero = (number: number) => {
  return number < 10 ? '0' + number.toString() : number
}

// Function to generate a unique identifier (e.g., a random string or number)
export const generateUniqueId = () => {
  // This is a simple example; adjust according to your needs for uniqueness
  return Math.random().toString(36).substring(2, 8)
}

export const generateModalUrl = (eventTitle: string) => {
  if (!eventTitle) return ''

  // Split the title into words, filter out non-alphanumeric characters, and get the first letter of each word
  const initials = eventTitle
    .split(' ')
    .map((word) => (word.charAt(0).match(/[a-zA-Z]/) ? word.charAt(0) : '')) // Ignore non-letters
    .join('')
    .toUpperCase()

  // Get the current year
  const year = new Date().getFullYear()

  // Assume you have a function to generate a unique identifier
  const uniqueId = generateUniqueId()

  // Build the URL by combining the current URL, initials, year, and unique identifier
  const modalUrl = `${window.location.href}/${initials}${year}${uniqueId}`

  return modalUrl
}
