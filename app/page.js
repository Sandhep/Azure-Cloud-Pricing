'use client'

import { useState, useEffect } from 'react'
import PricingTable from '../components/PricingTable'
import Filters from '../components/Filters'
import ExportButton from '../components/ExportButton'
import SearchBar from '../components/SearchBar.js'

const dummyData = [
  {
    id: 1,
    Name: 'Basic A0',
    'API Name': 'Basic_A0',
    'Instance Memory': '0.75 GB',
    vCPUs: 1,
    'Instance Storage': '20 GB',
    'Linux On Demand cost': '$0.018',
    'Linux Savings Plan': '$0.015',
    'Linux Reserved cost': '$0.013',
    'Linux Spot cost': '$0.0054',
    'Windows On Demand cost': '$0.02',
    'Windows Savings Plan': '$0.017',
    'Windows Reserved cost': '$0.015',
    'Windows Spot cost': '$0.006'
  },
  {
    id: 2,
    Name: 'Standard B1s',
    'API Name': 'Standard_B1s',
    'Instance Memory': '1 GB',
    vCPUs: 1,
    'Instance Storage': '4 GB',
    'Linux On Demand cost': '$0.0124',
    'Linux Savings Plan': '$0.0105',
    'Linux Reserved cost': '$0.0093',
    'Linux Spot cost': '$0.0037',
    'Windows On Demand cost': '$0.0214',
    'Windows Savings Plan': '$0.0182',
    'Windows Reserved cost': '$0.0161',
    'Windows Spot cost': '$0.0064'
  },
  {
    id: 3,
    Name: 'Standard D2s v3',
    'API Name': 'Standard_D2s_v3',
    'Instance Memory': '8 GB',
    vCPUs: 2,
    'Instance Storage': '16 GB',
    'Linux On Demand cost': '$0.096',
    'Linux Savings Plan': '$0.0816',
    'Linux Reserved cost': '$0.0720',
    'Linux Spot cost': '$0.0288',
    'Windows On Demand cost': '$0.192',
    'Windows Savings Plan': '$0.1632',
    'Windows Reserved cost': '$0.1440',
    'Windows Spot cost': '$0.0576'
  },
  // Add more dummy data here if needed
]

export default function Home() {
  const [data, setData] = useState(dummyData)
  const [filteredData, setFilteredData] = useState(dummyData)
  const [selectedColumns, setSelectedColumns] = useState([
    'Name', 'API Name', 'Instance Memory', 'vCPUs', 'Instance Storage',
    'Linux On Demand cost', 'Linux Savings Plan', 'Linux Reserved cost', 'Linux Spot cost',
    'Windows On Demand cost', 'Windows Savings Plan', 'Windows Reserved cost', 'Windows Spot cost'
  ])
  const [filters, setFilters] = useState({
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
    committedUseDiscounts: ''
  })

  const [searchTerm, setSearchTerm] = useState('')

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    applyFilters(newFilters)
  }

  const handleColumnChange = (columns) => {
    setSelectedColumns(columns)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    applyFilters(filters, term)
  }

  const applyFilters = (newFilters, term = searchTerm) => {
    let filtered = data

    if (newFilters.region) {
      filtered = filtered.filter(item => item.Name.includes(newFilters.region))
    }

    if (newFilters.pricingUnit) {
      filtered = filtered.filter(item => item['Instance Memory'].includes(newFilters.pricingUnit))
    }

    if (newFilters.cost) {
      filtered = filtered.filter(item => item['Linux On Demand cost'].includes(newFilters.cost))
    }

    if (newFilters.committedUseDiscounts) {
      filtered = filtered.filter(item => item['Linux Savings Plan'].includes(newFilters.committedUseDiscounts))
    }

    if (term) {
      filtered = filtered.filter(item =>
        Object.values(item).some(val =>
          val.toString().toLowerCase().includes(term.toLowerCase())
        )
      )
    }

    setFilteredData(filtered)
  }

  const clearFilters = () => {
    setFilters({
      region: '',
      pricingUnit: '',
      cost: '',
      committedUseDiscounts: ''
    })
    setSearchTerm('')
    setFilteredData(data)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Azure Cloud Pricing</h1>
      <div className="mb-4">
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          columns={selectedColumns}
          onColumnChange={handleColumnChange}
        />
        <SearchBar onSearch={handleSearch} />
        <ExportButton data={filteredData} />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>
      <PricingTable
        data={filteredData}
        columns={selectedColumns}
      />
    </div>
  )
}

