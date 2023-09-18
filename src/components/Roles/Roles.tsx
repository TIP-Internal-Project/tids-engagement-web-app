import TIDSRosterCSVPath from '../../assets/files/TIDS_Roster.csv'

async function getUserDetails() {
  try {
    const response = await fetch(TIDSRosterCSVPath)
    const csvData = await response.text()

    const lines = csvData.split('\n')
    const userDetails = lines.slice(1).filter((line) => {
      const values = line.split(',')
      const email = values[8]
      return email === localStorage.getItem('email')
    })
    return userDetails[0]
  } catch (error) {
    console.error('Error fetching CSV file:', error)
  }
  return ''
}

const getUserRole = (jobProfile: string) => {
  return jobProfile == 'General Administration Analyst' ||
    jobProfile.includes('Leader') ||
    jobProfile.includes('Manager')
    ? 'Admin'
    : 'Teammember'
}

export const setUserRole = async () => {
  const userDetails = await getUserDetails()
  const details = userDetails.split(',')
  const jobProfile = details[2]
  const role = getUserRole(jobProfile)
  sessionStorage.setItem('userRole', role)
}
