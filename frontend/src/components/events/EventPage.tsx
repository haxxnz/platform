import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventById, events } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';
import { RegistrationModal } from '../auth/RegistrationModal';

export function EventPage() {
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id || '0', 10);
  const event = getEventById(eventId);
  const { user, isAuthenticated } = useAuth();
  
  // State for registration modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  
  // If event not found, show error message
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Event Not Found</h1>
        <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <Link to="/events" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          Back to Events
        </Link>
      </div>
    );
  }

  // Get related events (excluding current event)
  const relatedEvents = events
    .filter(e => e.id !== event.id)
    .slice(0, 3);

  // Define event tags based on event type and other attributes
  const eventTags = [
    event.type || 'Event',
    event.location.includes('Virtual') ? 'Virtual' : 'In-Person',
    event.date.includes('2023') ? '2023' : '2024',
    event.title.toLowerCase().includes('hackathon') ? 'Hackathon' : 
    event.title.toLowerCase().includes('workshop') ? 'Workshop' : 
    event.title.toLowerCase().includes('summit') ? 'Summit' : 'Meetup'
  ];
  
  // Handle registration button click
  const handleRegisterClick = () => {
    if (isAuthenticated) {
      // If user is logged in, register them directly
      setIsRegistered(true);
    } else {
      // If user is not logged in, show registration modal
      setIsModalOpen(true);
    }
  };
  
  // Handle successful registration after authentication
  const handleRegistrationCompleted = () => {
    setIsRegistered(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Event Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="relative h-64 md:h-96 bg-gray-200">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{event.date}</span>
                </div>
                {event.time && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{event.time}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
                {event.type && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                      {event.type}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Event Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {eventTags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">About This Event</h2>
                <p className="text-gray-700 mb-6">{event.description}</p>
                
                {/* Expanded description with sections */}
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">What You'll Learn</h3>
                    <p className="text-gray-700">
                      Join us for an immersive experience where you'll gain hands-on knowledge and connect with industry experts. 
                      This event is designed to provide practical skills and insights that you can immediately apply to your projects.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Who Should Attend</h3>
                    <p className="text-gray-700">
                      This event is perfect for developers, designers, product managers, and anyone interested in technology and innovation. 
                      Whether you're a beginner or an experienced professional, you'll find value in the discussions and networking opportunities.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">What to Bring</h3>
                    <ul className="list-disc pl-5 text-gray-700">
                      <li>Laptop and charger</li>
                      <li>Notebook and pen</li>
                      <li>Business cards for networking</li>
                      <li>Your questions and ideas</li>
                    </ul>
                  </div>
                </div>
                
                {/* Registration Button */}
                <div className="mt-8">
                  {isRegistered ? (
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-green-800">Registration Confirmed</h3>
                          <div className="mt-2 text-sm text-green-700">
                            <p>You're all set! We've sent the details to {user?.email || 'your email'}.</p>
                          </div>
                          <div className="mt-4">
                            <div className="-mx-2 -my-1.5 flex">
                              <button
                                type="button"
                                className="bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              >
                                Add to Calendar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={handleRegisterClick}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Register for this Event
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Event Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase">Date & Time</h4>
                    <p className="mt-1 text-sm text-gray-900">{event.date}{event.time ? `, ${event.time}` : ''}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase">Location</h4>
                    <p className="mt-1 text-sm text-gray-900">{event.location}</p>
                    {!event.location.includes('Virtual') && (
                      <div className="mt-2">
                        <div className="h-40 bg-gray-200 rounded-md overflow-hidden">
                          <iframe 
                            title="Event Location Map"
                            className="w-full h-full"
                            frameBorder="0"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.911527006177!2d174.7764644!3d-36.8506658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d47fb5a9ce6fb%3A0x500ef6143a29917!2sAuckland%20CBD%2C%20Auckland!5e0!3m2!1sen!2snz!4v1647834598777!5m2!1sen!2snz"
                            loading="lazy"
                          ></iframe>
                        </div>
                        <a 
                          href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Get Directions
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase">Organizer</h4>
                    <p className="mt-1 text-sm text-gray-900">haxx Platform</p>
                    <a 
                      href="mailto:events@haxx.dev"
                      className="mt-1 text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      events@haxx.dev
                    </a>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase">Share Event</h4>
                    <div className="mt-2 flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Twitter</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Facebook</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">LinkedIn</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Other Events You Might Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedEvents.map(relatedEvent => (
              <div key={relatedEvent.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={relatedEvent.image} 
                    alt={relatedEvent.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{relatedEvent.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{relatedEvent.date}</p>
                  <p className="text-gray-600 text-sm mb-3">{relatedEvent.location}</p>
                  <Link 
                    to={`/events/${relatedEvent.id}`} 
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventTitle={event.title}
        onCompleted={handleRegistrationCompleted}
      />
    </div>
  );
}

export default EventPage;
