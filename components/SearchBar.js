import { Search } from 'lucide-react'

export default function SearchBar({ onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value)
  }

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    </div>
  )
}

