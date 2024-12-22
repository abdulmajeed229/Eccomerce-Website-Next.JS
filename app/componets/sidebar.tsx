import Link from 'next/link'
import { Home, User, Settings, HelpCircle } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="flex flex-col h-full w-64 bg-gray-100 border-r">
      <div className="p-5">
        <h2 className="text-2xl font-bold">GetForbe</h2>
      </div>
      <nav className="flex-1">
        <Link href="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
          <Home className="mr-3" size={20} />
          Home
        </Link>
        <Link href="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
          <User className="mr-3" size={20} />
          Profile
        </Link>
        <Link href="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
          <Settings className="mr-3" size={20} />
          Settings
        </Link>
        <Link href="/help" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
          <HelpCircle className="mr-3" size={20} />
          Help
        </Link>
      </nav>
    </div>
  )
}

