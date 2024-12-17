import DarkModeToggle from './DarkModeToggle'

export default function Navbar({ darkMode, onDarkModeToggle }) {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Azure Cloud Cost Explorer
          </h1>
          <DarkModeToggle initialDarkMode={darkMode} onToggle={onDarkModeToggle} />
        </div>
      </div>
    </nav>
  )
}

