import { useState } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

export default function PricingTable({ data, columns }) {
  const [columnFilters, setColumnFilters] = useState({})
  const [sortColumn, setSortColumn] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')

  const handleColumnFilterChange = (column, value) => {
    setColumnFilters(prev => ({ ...prev, [column]: value }))
  }

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const filteredData = data.filter(item =>
    Object.entries(columnFilters).every(([column, filterValue]) =>
      item[column].toString().toLowerCase().includes(filterValue.toLowerCase())
    )
  )

  const sortedAndFilteredData = filteredData.sort((a, b) => {
    if (!sortColumn) return 0
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column} className="px-4 py-2">
                <div className="flex items-center justify-between">
                  <span>{column}</span>
                  <button
                    onClick={() => handleSort(column)}
                    className="ml-2 p-1 rounded hover:bg-gray-200"
                  >
                    {sortColumn === column ? (
                      sortDirection === 'asc' ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      )
                    ) : (
                      <ArrowUpDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <input
                  type="text"
                  placeholder={`Filter ${column}`}
                  className="mt-1 w-full px-2 py-1 text-sm border rounded"
                  onChange={(e) => handleColumnFilterChange(column, e.target.value)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredData.map(item => (
            <tr key={item.id}>
              {columns.map(column => (
                <td key={column} className="border px-4 py-2">{item[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

