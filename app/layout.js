import './globals.css'

export const metadata = {
  title: 'Azure Cloud Pricing',
  description: 'Compare Azure cloud pricing details',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

