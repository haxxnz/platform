import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Event, Attendee } from '../../types';
import { events } from '../../data/mockData';

export function EventAdmin() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'attendees'>('details');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const eventId = parseInt(id);
    const foundEvent = events.find(event => event.id === eventId);
    
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      // Event not found, redirect to events page
      setIsLoading(false);
    }
    
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Event not found.</p>
            </div>
          </div>
        </div>
        <Link
          to="/events"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Event Administration: {event.title}
        </h1>
        <div className="flex space-x-3">
          <Link
            to={`/events/${id}`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Event Page
          </Link>
          <Link
            to={`/events/edit/${id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit Event
          </Link>
        </div>
      </div>

      {/* Event Quick Stats */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Event Overview</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{event.date} {event.time ? `• ${event.time}` : ''}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{event.location}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Type</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {event.type ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                ) : (
                  <span className="text-gray-400">Not specified</span>
                )}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Capacity</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {event.capacity ? (
                  <span>
                    {event.attendees?.length || 0} / {event.capacity} 
                    <span className="text-gray-500"> ({Math.round(((event.attendees?.length || 0) / event.capacity) * 100)}% full)</span>
                  </span>
                ) : (
                  <span className="text-gray-400">Unlimited</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`${
              activeTab === 'details'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Event Details
          </button>
          <button
            onClick={() => setActiveTab('attendees')}
            className={`${
              activeTab === 'attendees'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Attendees {event.attendees?.length ? `(${event.attendees.length})` : ''}
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'details' ? (
        <EventDetailsSection event={event} setEvent={setEvent} />
      ) : (
        <AttendeesSection event={event} setEvent={setEvent} />
      )}
    </div>
  );
}

// Event Details Section Component
function EventDetailsSection({ event, setEvent }: { event: Event; setEvent: React.Dispatch<React.SetStateAction<Event | null>> }) {
  return (
    <div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Event Details</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="prose max-w-none">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-64 object-cover rounded-lg mb-6"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Event+Image';
              }}
            />
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Attendees Section Component
function AttendeesSection({ event, setEvent }: { event: Event; setEvent: React.Dispatch<React.SetStateAction<Event | null>> }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddingAttendee, setIsAddingAttendee] = useState(false);
  const [editingAttendee, setEditingAttendee] = useState<Attendee | null>(null);
  
  // Filter attendees based on search term and status
  const filteredAttendees = event.attendees?.filter(attendee => {
    const matchesSearch = 
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || attendee.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  const handleAddAttendee = (newAttendee: Omit<Attendee, 'id'>) => {
    if (!event.attendees) return;
    
    // Generate a new ID (in a real app, this would be handled by the backend)
    const newId = Math.max(0, ...event.attendees.map(a => a.id)) + 1;
    
    const attendeeToAdd: Attendee = {
      id: newId,
      ...newAttendee
    };
    
    // Update the event with the new attendee
    const updatedEvent = {
      ...event,
      attendees: [...event.attendees, attendeeToAdd]
    };
    
    setEvent(updatedEvent);
    setIsAddingAttendee(false);
  };

  const handleUpdateAttendee = (updatedAttendee: Attendee) => {
    if (!event.attendees) return;
    
    // Update the attendee in the list
    const updatedAttendees = event.attendees.map(attendee => 
      attendee.id === updatedAttendee.id ? updatedAttendee : attendee
    );
    
    // Update the event with the updated attendees list
    const updatedEvent = {
      ...event,
      attendees: updatedAttendees
    };
    
    setEvent(updatedEvent);
    setEditingAttendee(null);
  };

  const handleRemoveAttendee = (attendeeId: number) => {
    if (!event.attendees) return;
    
    if (!window.confirm('Are you sure you want to remove this attendee?')) {
      return;
    }
    
    // Remove the attendee from the list
    const updatedAttendees = event.attendees.filter(attendee => attendee.id !== attendeeId);
    
    // Update the event with the updated attendees list
    const updatedEvent = {
      ...event,
      attendees: updatedAttendees
    };
    
    setEvent(updatedEvent);
  };

  const handleStatusChange = (attendeeId: number, newStatus: Attendee['status']) => {
    if (!event.attendees) return;
    
    // Update the attendee's status
    const updatedAttendees = event.attendees.map(attendee => 
      attendee.id === attendeeId ? { ...attendee, status: newStatus } : attendee
    );
    
    // Update the event with the updated attendees list
    const updatedEvent = {
      ...event,
      attendees: updatedAttendees
    };
    
    setEvent(updatedEvent);
  };

  return (
    <div>
      {/* Filters and Actions */}
      <div className="bg-white shadow sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              {/* Search */}
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search attendees..."
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-64 pr-10 sm:text-sm border-gray-300 rounded-md"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="all">All Statuses</option>
                <option value="registered">Registered</option>
                <option value="confirmed">Confirmed</option>
                <option value="attended">Attended</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            {/* Add Attendee Button */}
            <button
              type="button"
              onClick={() => setIsAddingAttendee(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Attendee
            </button>
          </div>
        </div>
      </div>

      {/* Attendees Table */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendee
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration Date
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAttendees.length > 0 ? (
                    filteredAttendees.map((attendee) => (
                      <tr key={attendee.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img 
                                className="h-10 w-10 rounded-full" 
                                src={attendee.avatar || 'https://via.placeholder.com/40?text=User'} 
                                alt="" 
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/40?text=User';
                                }}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {attendee.name}
                              </div>
                              {attendee.notes && (
                                <div className="text-sm text-gray-500">
                                  Note: {attendee.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{attendee.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={attendee.status}
                            onChange={(e) => handleStatusChange(attendee.id, e.target.value as Attendee['status'])}
                            className="block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          >
                            <option value="registered">Registered</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="attended">Attended</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {attendee.registrationDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => setEditingAttendee(attendee)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleRemoveAttendee(attendee.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {event.attendees?.length ? 'No attendees match your filters.' : 'No attendees for this event yet.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Attendee Modal */}
      {(isAddingAttendee || editingAttendee) && (
        <AttendeeFormModal
          attendee={editingAttendee}
          onSave={editingAttendee 
            ? (updatedAttendee: Attendee | Omit<Attendee, 'id'>) => {
                // Type assertion since we know this will be a full Attendee with ID
                handleUpdateAttendee(updatedAttendee as Attendee);
              }
            : handleAddAttendee
          }
          onCancel={() => {
            setIsAddingAttendee(false);
            setEditingAttendee(null);
          }}
        />
      )}
    </div>
  );
}

// Attendee Form Modal Component
function AttendeeFormModal({ 
  attendee, 
  onSave, 
  onCancel 
}: { 
  attendee: Attendee | null;
  onSave: (attendee: Attendee | Omit<Attendee, 'id'>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Omit<Attendee, 'id'>>({
    name: attendee?.name || '',
    email: attendee?.email || '',
    status: attendee?.status || 'registered',
    registrationDate: attendee?.registrationDate || new Date().toISOString().split('T')[0],
    notes: attendee?.notes || '',
    avatar: attendee?.avatar || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (attendee) {
      // If editing, preserve the ID
      onSave({
        id: attendee.id,
        ...formData
      });
    } else {
      // If adding new
      onSave(formData);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {attendee ? 'Edit Attendee' : 'Add New Attendee'}
                  </h3>
                  <div className="mt-4 space-y-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    {/* Status */}
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status *
                      </label>
                      <select
                        id="status"
                        name="status"
                        required
                        value={formData.status}
                        onChange={handleChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="registered">Registered</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="attended">Attended</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    
                    {/* Registration Date */}
                    <div>
                      <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700">
                        Registration Date *
                      </label>
                      <input
                        type="date"
                        name="registrationDate"
                        id="registrationDate"
                        required
                        value={formData.registrationDate}
                        onChange={handleChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    {/* Avatar URL */}
                    <div>
                      <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                        Avatar URL
                      </label>
                      <input
                        type="text"
                        name="avatar"
                        id="avatar"
                        value={formData.avatar || ''}
                        onChange={handleChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {formData.avatar && (
                        <div className="mt-2 flex justify-center">
                          <img
                            src={formData.avatar}
                            alt="Avatar preview"
                            className="h-20 w-20 rounded-full"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/80?text=User';
                            }}
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Notes */}
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                        Notes
                      </label>
                      <textarea
                        name="notes"
                        id="notes"
                        rows={3}
                        value={formData.notes || ''}
                        onChange={handleChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {attendee ? 'Update' : 'Add'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
