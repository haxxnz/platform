import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../../types';
import { events } from '../../data/mockData';

export function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  
  // Filter events based on search term
  useEffect(() => {
    const filtered = events.filter(event => {
      return searchTerm === '' || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    setFilteredEvents(filtered);
  }, [searchTerm]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-500">
          Join our community events, workshops, and hackathons to learn, connect, and build together.
        </p>
      </div>
      
      <div className="mb-8">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search events by title, description, or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 transition-all hover:shadow-md flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 lg:w-1/4 h-48 md:h-auto overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6 md:w-2/3 lg:w-3/4">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h2>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                      {event.time && ` • ${event.time}`}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.type === 'Workshop' 
                        ? 'bg-blue-100 text-blue-800' 
                        : event.type === 'Hackathon'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{event.description}</p>
                
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to={`/events/${event.id}`} 
                    className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    View Details
                  </Link>
                  <a
                    href="#"
                    className="inline-block px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventsPage;
