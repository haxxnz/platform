import { Link } from 'react-router-dom';
import { projects, events } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';
import { Dashboard } from '../dashboard/Dashboard';

export function HomePage() {
  const { debugLogin, isAuthenticated, user } = useAuth();
  
  // If user is authenticated, show the dashboard
  if (isAuthenticated) {
    return (
      <div>
        {/* Debug button - positioned absolutely in the top left corner */}
        <button 
          onClick={debugLogin} 
          className="absolute top-4 left-4 z-50 px-2 py-1 text-xs font-mono bg-black text-green-400 rounded opacity-30 hover:opacity-100 transition-opacity"
          aria-label="Debug login"
        >
          HAXX
        </button>
        
        {/* User status indicator - only visible when authenticated */}
        <div className="absolute top-4 right-4 z-50 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Logged in as {user?.name}
        </div>
        
        <Dashboard />
      </div>
    );
  }
  
  // Get featured projects (first 3)
  const featuredProjects = projects.slice(0, 3);
  
  // Get upcoming events (first 2)
  const upcomingEvents = events.slice(0, 2);
  
  return (
    <div>
      {/* Debug button - positioned absolutely in the top left corner */}
      <button 
        onClick={debugLogin} 
        className="absolute top-4 left-4 z-50 px-2 py-1 text-xs font-mono bg-black text-green-400 rounded opacity-30 hover:opacity-100 transition-opacity"
        aria-label="Debug login"
      >
        HAXX
      </button>
      
      {/* Hero section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Build, collaborate, and innovate together
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-indigo-100">
                Join our community of developers, designers, and creators to build amazing projects and make a difference.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="px-6 py-3 bg-white text-indigo-600 rounded-md font-medium hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                >
                  Explore Projects
                </Link>
                <Link
                  to="/auth"
                  className="px-6 py-3 border border-white text-white rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                >
                  Join Now
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" 
                alt="Collaboration" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join Our Platform?</h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-500">
              We provide everything you need to build amazing projects and connect with talented individuals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connect with Peers</h3>
              <p className="text-gray-600">
                Find like-minded individuals who share your passion for technology and innovation.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Build Innovative Projects</h3>
              <p className="text-gray-600">
                Turn your ideas into reality with our collaborative platform and resources.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Grow Your Career</h3>
              <p className="text-gray-600">
                Showcase your skills, build your portfolio, and connect with potential employers.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured projects section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
            <Link 
              to="/projects" 
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              View all projects →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 transition-all hover:shadow-md">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/projects/${project.id}`} 
                    className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Upcoming events section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <Link 
              to="/events" 
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              View all events →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 transition-all hover:shadow-md">
                <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-5 md:w-2/3">
                  <div className="flex items-center mb-2">
                    <div className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm font-medium">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="ml-2 text-sm text-gray-500">
                      {event.location}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  <Link 
                    to={`/events/${event.id}`} 
                    className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to join our community?</h2>
          <p className="text-xl text-indigo-200 mb-8 max-w-3xl mx-auto">
            Sign up today and start collaborating with talented individuals from around the world.
          </p>
          <Link
            to="/auth"
            className="px-6 py-3 bg-white text-indigo-600 rounded-md font-medium hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
