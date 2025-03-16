import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14"><div className='flex gap-2'>
          <Link to="/" className="flex items-center py-3">
            <span className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">haxx</span>
          </Link>
          
          <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Search projects, events, and more..."
                aria-label="Search"
              />
            </div>
          </div></div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/projects" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">Projects</Link>
            <Link to="/events" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">Events</Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">Contact</Link>
            <div className="ml-2 flex items-center space-x-2">
              <Link to="/auth" className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500">Log In</Link>
              <Link to="/auth" className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500">Sign Up</Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="p-1 text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, hidden by default */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Home</Link>
          <Link to="/projects" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Projects</Link>
          <Link to="/events" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Events</Link>
          <Link to="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">About</Link>
        </div>
        <div className="px-3 py-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="Search..."
              aria-label="Search"
            />
          </div>
        </div>
        <div className="pt-2 pb-3 border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <Link to="/auth" className="block w-full px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500 text-center">Log In</Link>
            <Link to="/auth" className="block w-full px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500 text-center">Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
