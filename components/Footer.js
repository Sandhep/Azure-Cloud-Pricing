import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md mt-8">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Powered by Azure Pricing API
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Sandhep/Azure-Cloud-Pricing.git"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-300"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub repository</span>
            </a>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Azure Cloud Cost Explorer
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

