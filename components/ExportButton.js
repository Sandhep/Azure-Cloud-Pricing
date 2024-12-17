import * as XLSX from 'xlsx'
import { Download } from 'lucide-react'

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
      className="flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-300 ease-in-out"
    >
      <Download className="w-5 h-5 mr-2" />
      Export to Excel
    </button>
  )
}

