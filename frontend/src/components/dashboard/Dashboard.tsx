import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { projects, events } from '../../data/mockData';

export function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'events'>('projects');
  
  // Mock user projects - in a real app, this would come from an API
  const userProjects = projects.slice(0, 3); // For demo purposes, show first 3 projects as user's
  
  // Split events into upcoming and past based on date
  const currentDate = new Date();
  const upcomingEvents = events.filter(event => new Date(event.date) >= currentDate);
  const pastEvents = events.filter(event => new Date(event.date) < currentDate);

  // Helper function to determine project status (since it's not in our interface)
  function getProjectStatus(projectId: number): { label: string; className: string } {
    // Mock statuses based on project ID for demo purposes
    const statuses = [
      { label: 'In Progress', className: 'bg-yellow-100 text-yellow-800' },
      { label: 'Completed', className: 'bg-green-100 text-green-800' },
      { label: 'Planning', className: 'bg-gray-100 text-gray-800' }
    ];
    
    return statuses[projectId % 3];
  }

  // Helper function to get estimated attendees (since it's not in our interface)
  function getEstimatedAttendees(eventId: number): number {
    // Mock attendees based on event ID for demo purposes
    return 10 + (eventId * 5);
  }

  // Helper function to determine if event is virtual (since it's not in our interface)
  function isVirtualEvent(eventId: number): boolean {
    // Mock virtual status based on event ID for demo purposes
    return eventId % 2 === 0;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
            <p className="mt-1 text-lg text-gray-500">Here's what's happening with your projects and events</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link
              to="/projects/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Project
            </Link>
            <Link
              to="/events/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Event
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Projects</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{userProjects.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Events</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{upcomingEvents.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <svg className="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Events Attended</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">12</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`${
              activeTab === 'projects'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            My Projects
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`${
              activeTab === 'events'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Events
          </button>
        </nav>
      </div>

      {/* Projects tab content */}
      {activeTab === 'projects' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Projects</h2>
            <Link
              to="/projects"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all projects
            </Link>
          </div>
          
          {userProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {userProjects.map(project => {
                const projectStatus = getProjectStatus(project.id);
                
                return (
                  <div key={project.id} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="h-40 bg-gray-200 overflow-hidden">
                      <img 
                        src={project.image || 'https://via.placeholder.com/400x200'} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="px-4 py-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-900 truncate">{project.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${projectStatus.className}`}>
                          {projectStatus.label}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{project.description}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex -space-x-2">
                          {project.contributors.slice(0, 3).map(contributor => (
                            <img 
                              key={contributor.id}
                              src={contributor.avatar} 
                              alt={contributor.name} 
                              className="w-6 h-6 rounded-full border border-white"
                            />
                          ))}
                          {project.contributors.length > 3 && (
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-xs text-gray-500 border border-white">
                              +{project.contributors.length - 3}
                            </div>
                          )}
                        </div>
                        <Link
                          to={`/projects/${project.id}`}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">No projects yet</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Get started by creating your first project.</p>
                </div>
                <div className="mt-5">
                  <Link
                    to="/projects/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create a project
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Events tab content */}
      {activeTab === 'events' && (
        <div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
              <Link
                to="/events"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View all events
              </Link>
            </div>
            
            {upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 bg-indigo-100 rounded-md flex items-center justify-center">
                            <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              <span>
                                {new Date(event.date).toLocaleDateString('en-US', { 
                                  weekday: 'long',
                                  month: 'long', 
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Link
                            to={`/events/${event.id}`}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {event.location}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                            {getEstimatedAttendees(event.id)} attendees
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          {isVirtualEvent(event.id) && (
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              Virtual
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">No upcoming events</h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Check back later or create your own event.</p>
                  </div>
                  <div className="mt-5">
                    <Link
                      to="/events/new"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create an event
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Past Events</h2>
            </div>
            
            {pastEvents.length > 0 ? (
              <div className="space-y-4">
                {pastEvents.map(event => (
                  <div key={event.id} className="bg-white overflow-hidden shadow rounded-lg opacity-75">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
                            <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-700">{event.title}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              <span>
                                {new Date(event.date).toLocaleDateString('en-US', { 
                                  weekday: 'long',
                                  month: 'long', 
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Link
                            to={`/events/${event.id}`}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">No past events</h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>You haven't attended any events yet.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
