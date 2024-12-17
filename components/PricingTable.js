import { useState, useEffect } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

export default function PricingTable({ data, columns, selectedRows, onRowSelect, compareMode }) {
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
      item[column]?.toString().toLowerCase().includes(filterValue.toLowerCase())
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

  const displayData = compareMode ? sortedAndFilteredData.filter(item => selectedRows.includes(item.id)) : sortedAndFilteredData

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            {!compareMode && (
              <th className="px-4 py-3 text-left">
                <span className="font-semibold text-gray-700 dark:text-gray-200">Select</span>
              </th>
            )}
            {columns.map(column => (
              <th key={column} className="px-4 py-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700 dark:text-gray-200 capitalize">{column}</span>
                  <button
                    onClick={() => handleSort(column)}
                    className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    {sortColumn === column ? (
                      sortDirection === 'asc' ? (
                        <ArrowUp className="w-4 h-4 text-blue-500" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-blue-500" />
                      )
                    ) : (
                      <ArrowUpDown className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
                <input
                  type="text"
                  placeholder={`Filter ${column}`}
                  className="mt-1 w-full px-2 py-1 text-sm border rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
                  onChange={(e) => handleColumnFilterChange(column, e.target.value)}
                  disabled={column === 'retailPrice'}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayData.map((item, index) => (
            <tr key={`${item.id}-${index}`} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300`}>
              {!compareMode && (
                <td className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)}
                    onChange={() => onRowSelect(item.id)}
                    className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                  />
                </td>
              )}
              {columns.map(column => (
                <td key={column} className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">
                  {column === 'retailPrice' 
                    ? `$${Number(item[column]).toFixed(4)} per ${item.unitOfMeasure}`
                    : item[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

