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
  if (!eventTitle) {
    return ''
  }

  // Split the title into words and take the first letter of each word
  const words = eventTitle.split(' ')
  const initials = words
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()

  // Get the current year in YYYY format
  const year = new Date().getFullYear()

  // Generate a unique identifier, e.g., a short random string or number
  const uniqueId = generateUniqueId()

  // Concatenate the initials, the year, and the unique identifier to form the modalUrl
  const modalUrl = `http://localhost:3000/events/${initials}${year}${uniqueId}`

  return modalUrl
}
