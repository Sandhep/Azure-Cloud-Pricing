import * as XLSX from 'xlsx'

export default function ExportButton({ data }) {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Azure Pricing')
    XLSX.writeFile(workbook, 'azure_pricing.xlsx')
  }

  return (
    <button
      onClick={exportToExcel}
      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
    >
      Export to Excel
    </button>
  )
}

