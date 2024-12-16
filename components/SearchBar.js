export default function SearchBar({ onSearch }) {
    const handleChange = (e) => {
      onSearch(e.target.value)
    }
  
    return (
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 border rounded"
      />
    )
  }
  
  