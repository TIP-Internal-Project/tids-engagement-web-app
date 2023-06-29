import React, { useState, useEffect } from 'react'
import TIDSRosterCSVPath from '../../assets/files/TIDS_Roster.csv'

const Roles = () => {
    const [CSVAdmin, setCSVAdmin] = useState<string[]>([])
    const [isAdmin, setIsAdmin] = useState(false)
  
    useEffect(() => {
      const readCSVFile = async () => {
        try {
          const response = await fetch(TIDSRosterCSVPath)
          const csvData = await response.text()
  
          const lines = csvData.split('\n')
          const filteredsetCSVAdmin = lines
            .slice(1)
            .filter(line => {
              const values = line.split(',')
              const role = values[2].trim()
              return role === 'General Administration Analyst' || role === 'Service Desk Team Leader'
            })
  
            setCSVAdmin(filteredsetCSVAdmin)
        } catch (error) {
          console.error('Error fetching CSV file:', error)
        }
      }
  
      readCSVFile()
    }, [])
  
    useEffect(() => {
      const userEmail = sessionStorage.getItem('email')
      const isAdminUser = CSVAdmin.some(line => {
        const values = line.split(',')
        const email = values[8].trim()
        return email === userEmail
      })
      setIsAdmin(isAdminUser)
    }, [CSVAdmin])
  
    return (
      <div>
        
        
  
        <h3>
          {sessionStorage.getItem('givenName')} {sessionStorage.getItem('familyName')}
          {isAdmin && ' Admin'}
        </h3>
      </div>
    )
  }
  

export default Roles
