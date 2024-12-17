import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Filters({ filters, onFilterChange, columns, onColumnChange, data }) {
  const [showColumnSelector, setShowColumnSelector] = useState(false)
  const [filterOptions, setFilterOptions] = useState({
    location: [],
    serviceFamily: [],
    type: [],
    unitOfMeasure: []
  })

  useEffect(() => {
    if (data.length > 0) {
      const options = {
        location: [...new Set(data.map(item => item.location))],
        serviceFamily: [...new Set(data.map(item => item.serviceFamily))],
        type: [...new Set(data.map(item => item.type))],
        unitOfMeasure: [...new Set(data.map(item => item.unitOfMeasure))]
      }
      setFilterOptions(options)
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    onFilterChange({ ...filters, [name]: value })
  }

  const toggleColumnSelector = () => {
    setShowColumnSelector(!showColumnSelector)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="w-full px-3 py-2 text-gray-700 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          <option value="">Select Location</option>
          {filterOptions.location.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <select
          name="serviceFamily"
          value={filters.serviceFamily}
          onChange={handleChange}
          className="w-full px-3 py-2 text-gray-700 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          <option value="">Select Service Family</option>
          {filterOptions.serviceFamily.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="w-full px-3 py-2 text-gray-700 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          <option value="">Select Type</option>
          {filterOptions.type.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <select
          name="unitOfMeasure"
          value={filters.unitOfMeasure}
          onChange={handleChange}
          className="w-full px-3 py-2 text-gray-700 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          <option value="">Select Unit of Measure</option>
          {filterOptions.unitOfMeasure.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div>
        <button
          onClick={toggleColumnSelector}
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          <span>Select Columns</span>
          {showColumnSelector ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
        {showColumnSelector && (
          <ColumnSelector columns={columns} onColumnChange={onColumnChange} />
        )}
      </div>
    </div>
  )
}

function ColumnSelector({ columns, onColumnChange }) {
  const allColumns = [
    'productName', 'skuName', 'serviceName', 'armRegionName', 'location',
    'retailPrice', 'unitPrice', 'unitOfMeasure', 'type', 'armSkuName'
  ]

  const handleColumnToggle = (column) => {
    if (columns.includes(column)) {
      onColumnChange(columns.filter(col => col !== column))
    } else {
      onColumnChange([...columns, column])
    }
  }

  return (
    <div className="mt-2 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
      <h3 className="font-bold mb-2 text-gray-700 dark:text-gray-200">Select Columns:</h3>
      <div className="grid grid-cols-2 gap-2">
        {allColumns.map(column => (
          <button
            key={column}
            onClick={() => handleColumnToggle(column)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
              columns.includes(column)
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {column}
          </button>
        ))}
      </div>
    </div>
  )
}

