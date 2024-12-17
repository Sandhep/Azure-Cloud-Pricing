'use client'

import { useState, useEffect } from 'react'
import './globals.css'

const metadata = {
  title: 'Azure Cloud Pricing',
  description: 'Compare Azure cloud pricing details',
}

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true' ||
      (!('darkMode' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
    
    setDarkMode(isDarkMode)
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [])

  return (
    <html lang="en" className={darkMode ? 'dark' : ''}>
      <body>{children}</body>
    </html>
  )
}

