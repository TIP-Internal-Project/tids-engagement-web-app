import React from 'react'

interface TableProps {
  columns: string[]
  data: DataItem[]
}

interface DataItem {
  id: string // Assuming each data item has a unique ID
  [key: string]: string | number | boolean
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={`${row.id}-${column}`}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
