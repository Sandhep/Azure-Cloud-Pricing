'use client'

import { useState, useEffect } from 'react'
import PricingTable from '../components/PricingTable'
import Filters from '../components/Filters'
import ExportButton from '../components/ExportButton'
import SearchBar from '../components/SearchBar'
import Navbar from '../components/Navbar'
import Footer from '@/components/Footer'

const columns = [
  'productName',
  'skuName',
  'serviceName',
  'armRegionName',
  'retailPrice',
  'armSkuName',
  'type'
]

// Dummy data to use as fallback
const dummyData = [
  {
    id: '1',
    productName: "Virtual Machines D Series Windows",
    skuName: "D14 Spot",
    serviceName: "Virtual Machines",
    armRegionName: "southindia",
    retailPrice: 0.37674,
    unitOfMeasure: "1 Hour",
    armSkuName: "Standard_D14",
    type: "Consumption"
  },
  {
    id: '2',
    productName: "Azure Database for MySQL Single Server General Purpose - Compute Gen5",
    skuName: "vCore",
    serviceName: "Azure Database for MySQL",
    armRegionName: "uksouth",
    retailPrice: 0.1016,
    unitOfMeasure: "1 Hour",
    armSkuName: "AzureDB_MySQL_General_Purpose_Compute_Gen5",
    type: "Consumption"
  },
  {
    id: '3',
    productName: "Blob Storage",
    skuName: "Archive GRS",
    serviceName: "Storage",
    armRegionName: "westus2",
    retailPrice: 0.0,
    unitOfMeasure: "1 GB",
    armSkuName: "",
    type: "Consumption"
  }
]

export default function Home() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedColumns, setSelectedColumns] = useState(columns)
  const [filters, setFilters] = useState({
    location: '',
    serviceFamily: '',
    type: '',
    unitOfMeasure: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [error, setError] = useState(null)
  const [selectedRows, setSelectedRows] = useState([])
  const [compareMode, setCompareMode] = useState(false)

  useEffect(() => {
    fetchData()
    const isDarkMode = localStorage.getItem('darkMode') === 'true' ||
      (!('darkMode' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDarkMode(isDarkMode)
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/pricing')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      if (result.Items && Array.isArray(result.Items)) {
        const dataWithIds = result.Items.map((item, index) => ({ ...item, id: `${index}` }))
        setData(dataWithIds)
        setFilteredData(dataWithIds)
      } else {
        throw new Error('Invalid data structure received from API')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Failed to fetch pricing data. Using dummy data instead.')
      setData(dummyData)
      setFilteredData(dummyData)
    }
  }

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

    if (newFilters.location) {
      filtered = filtered.filter(item => item.location === newFilters.location)
    }

    if (newFilters.serviceFamily) {
      filtered = filtered.filter(item => item.serviceFamily === newFilters.serviceFamily)
    }

    if (newFilters.type) {
      filtered = filtered.filter(item => item.type === newFilters.type)
    }

    if (newFilters.unitOfMeasure) {
      filtered = filtered.filter(item => item.unitOfMeasure === newFilters.unitOfMeasure)
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
      location: '',
      serviceFamily: '',
      type: '',
      unitOfMeasure: ''
    })
    setSearchTerm('')
    setFilteredData(data)
  }

  const handleDarkModeToggle = (isDarkMode) => {
    setDarkMode(isDarkMode)
  }

  const handleRowSelect = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
  }

  const handleCompare = () => {
    setCompareMode(true)
  }

  const handleClearCompare = () => {
    setCompareMode(false)
    setSelectedRows([])
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar darkMode={darkMode} onDarkModeToggle={handleDarkModeToggle} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
            <p className="font-bold">Warning</p>
            <p>{error}</p>
          </div>
        )}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6 transition-all duration-300 ease-in-out">
            <Filters
              filters={filters}
              onFilterChange={handleFilterChange}
              columns={selectedColumns}
              onColumnChange={handleColumnChange}
              data={data}
            />
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-full sm:w-2/3">
                <SearchBar onSearch={handleSearch} />
              </div>
              <div className="flex gap-2 w-full sm:w-1/3 justify-end">
                <ExportButton data={filteredData} />
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {compareMode ? 'Comparing Selected Items' : 'Azure Pricing Data'}
              </h2>
              <div className="space-x-2">
                {!compareMode && (
                  <button
                    onClick={handleCompare}
                    disabled={selectedRows.length < 2}
                    className={`px-4 py-2 rounded-md transition-colors duration-300 ease-in-out ${
                      selectedRows.length < 2
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    Compare Selected ({selectedRows.length})
                  </button>
                )}
                {compareMode && (
                  <button
                    onClick={handleClearCompare}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
                  >
                    Clear Comparison
                  </button>
                )}
              </div>
            </div>
            <PricingTable
              data={filteredData}
              columns={selectedColumns}
              selectedRows={selectedRows}
              onRowSelect={handleRowSelect}
              compareMode={compareMode}
            />
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

