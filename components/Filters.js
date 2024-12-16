import { useState } from 'react'

export default function Filters({ filters, onFilterChange, columns, onColumnChange }) {
  const [showColumnSelector, setShowColumnSelector] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    onFilterChange({ ...filters, [name]: value })
  }

  const toggleColumnSelector = () => {
    setShowColumnSelector(!showColumnSelector)
  }

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        name="region"
        value={filters.region}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Select Region</option>
        {filters.availableRegions.map(region => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>
      <select
        name="pricingUnit"
        value={filters.pricingUnit}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Select Pricing Unit</option>
        <option value="Instance">Instance</option>
        <option value="vCPU">vCPU</option>
        <option value="ACU">ACU</option>
        <option value="Memory">Memory</option>
      </select>
      <select
        name="cost"
        value={filters.cost}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Select Cost</option>
        <option value="Per Second">Per Second</option>
        <option value="Per Minute">Per Minute</option>
        <option value="Hourly">Hourly</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Annually">Annually</option>
      </select>
      <select
        name="committedUseDiscounts"
        value={filters.committedUseDiscounts}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Select Committed Use Discounts</option>
        <option value="1-Year reservation">1-Year reservation</option>
        <option value="3-Year reservation">3-Year reservation</option>
        <option value="1-Year savings plan">1-Year savings plan</option>
        <option value="3-Year savings plan">3-Year savings plan</option>
        <option value="1-Year subscription">1-Year subscription</option>
        <option value="3-Year subscription">3-Year subscription</option>
        <option value="1-Year savings plan (Hybrid benefit)">1-Year savings plan (Hybrid benefit)</option>
        <option value="3-Year savings plan (Hybrid benefit)">3-Year savings plan (Hybrid benefit)</option>
      </select>
      <button
        onClick={toggleColumnSelector}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Select Columns
      </button>
      {showColumnSelector && (
        <ColumnSelector columns={columns} onColumnChange={onColumnChange} />
      )}
    </div>
  )
}

function ColumnSelector({ columns, onColumnChange }) {
  const allColumns = [
    'Name', 'API Name', 'Instance Memory', 'vCPUs', 'Instance Storage',
    'Linux On Demand cost', 'Linux Savings Plan', 'Linux Reserved cost', 'Linux Spot cost',
    'Windows On Demand cost', 'Windows Savings Plan', 'Windows Reserved cost', 'Windows Spot cost'
  ]

  const handleColumnToggle = (column) => {
    if (columns.includes(column)) {
      onColumnChange(columns.filter(col => col !== column))
    } else {
      onColumnChange([...columns, column])
    }
  }

  return (
    <div className="absolute z-10 bg-white border p-4 rounded shadow-lg">
      <h3 className="font-bold mb-2">Select Columns:</h3>
      <div className="grid grid-cols-2 gap-2">
        {allColumns.map(column => (
          <button
            key={column}
            onClick={() => handleColumnToggle(column)}
            className={`px-2 py-1 rounded ${
              columns.includes(column) ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {column}
          </button>
        ))}
      </div>
    </div>
  )
}

const dummyData = {
  filters: {
    region: '',
    availableRegions: [
      'US East (N. Virginia)',
      'US West (Oregon)',
      'EU (Frankfurt)',
      'Asia Pacific (Tokyo)',
      'South America (São Paulo)',
      'Canada (Central)',
      'Australia (Sydney)',
      'India (Mumbai)',
    ],
    pricingUnit: '',
    cost: '',
    committedUseDiscounts: '',
  },
  // ... other filter properties ...
}

