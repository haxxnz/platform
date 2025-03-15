import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

// Define TypeScript interfaces
interface Project {
  id: number;
  title: string;
  description: string;
  team: string;
  tags: string[];
  image: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
  image: string;
  registrationUrl: string;
}

// Mock data for projects
const projects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Health Monitor',
    description: 'A wearable device that uses machine learning to predict health issues before they occur.',
    team: 'HealthTech Innovators',
    tags: ['AI/ML', 'Health', 'IoT'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 2,
    title: 'Community Resource Sharing Platform',
    description: 'A platform connecting communities to share resources and reduce waste.',
    team: 'Sustainable Solutions',
    tags: ['Social Impact', 'Sustainability', 'Web App'],
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 3,
    title: 'Decentralized Education Credentials',
    description: 'Blockchain-based system for verifying educational credentials.',
    team: 'BlockEd',
    tags: ['Blockchain', 'Education', 'Security'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 4,
    title: 'Accessibility Navigation App',
    description: 'Maps and navigation optimized for people with mobility challenges.',
    team: 'Access for All',
    tags: ['Accessibility', 'Maps', 'Mobile'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
  },
];

// Mock data for events
const events: Event[] = [
  {
    id: 1,
    title: 'Climate Tech Hackathon',
    description: 'A weekend-long event focused on building solutions to address climate change challenges.',
    date: '2025-04-15T09:00:00',
    location: 'Auckland Innovation Hub',
    type: 'Hackathon',
    image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=400',
    registrationUrl: '/events/climate-tech-hackathon',
  },
  {
    id: 2,
    title: 'AI for Good Workshop',
    description: 'Learn how to leverage artificial intelligence for social impact projects.',
    date: '2025-04-22T18:30:00',
    location: 'Online',
    type: 'Workshop',
    image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&q=80&w=400',
    registrationUrl: '/events/ai-for-good-workshop',
  },
  {
    id: 3,
    title: 'Health Innovation Summit',
    description: 'Connect with healthcare professionals and technologists to solve healthcare challenges.',
    date: '2025-05-10T10:00:00',
    location: 'Wellington Medical Center',
    type: 'Summit',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400',
    registrationUrl: '/events/health-innovation-summit',
  },
  {
    id: 4,
    title: 'Blockchain Developers Meetup',
    description: 'Monthly gathering of blockchain enthusiasts and developers sharing knowledge and projects.',
    date: '2025-04-05T19:00:00',
    location: 'Christchurch Tech Hub',
    type: 'Meetup',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
    registrationUrl: '/events/blockchain-developers-meetup',
  },
];

function Navbar() {
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
            <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">Home</Link>
            <Link to="/projects" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">Projects</Link>
            <Link to="/events" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">Events</Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">About</Link>
            <div className="ml-2 flex items-center space-x-2">
              <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500">Log In</button>
              <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500">Sign Up</button>
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
            <button className="w-full px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500">Log In</button>
            <button className="w-full px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Build. Collaborate. Innovate.</h1>
        <p>Join the next generation of hackers creating solutions for a better tomorrow</p>
        <div className="hero-buttons">
          <button className="btn btn-primary btn-large">Join Upcoming Hackathon</button>
          <button className="btn btn-outline btn-large">Browse Projects</button>
        </div>
      </div>
      <div className="hero-stats">
        <div className="stat-item">
          <span className="stat-number">1,200+</span>
          <span className="stat-label">Hackers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">350+</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">24</span>
          <span className="stat-label">Hackathons</span>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={project.image} alt={project.title} />
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-team">By {project.team}</div>
        <div className="project-tags">
          {project.tags.map((tag: string, index: number) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        <button className="btn btn-secondary">View Project</button>
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section className="projects-section">
      <div className="section-header">
        <h2>Featured Projects</h2>
        <Link to="/projects" className="view-all">View All Projects</Link>
      </div>
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NZ', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="event-card">
      <div className="event-image">
        <img src={event.image} alt={event.title} />
        <div className="event-type">{event.type}</div>
      </div>
      <div className="event-content">
        <h3>{event.title}</h3>
        <div className="event-details">
          <div className="event-date">
            <svg xmlns="http://www.w3.org/2000/svg" className="event-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {formatDate(event.date)}
          </div>
          <div className="event-location">
            <svg xmlns="http://www.w3.org/2000/svg" className="event-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {event.location}
          </div>
        </div>
        <p>{event.description}</p>
        <Link to={event.registrationUrl} className="btn btn-secondary">Register Now</Link>
      </div>
    </div>
  );
}

function EventsSection() {
  // Get upcoming events (limit to 3)
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <section className="events-section">
      <div className="section-header">
        <h2>Upcoming Events</h2>
        <Link to="/events" className="view-all">View All Events</Link>
      </div>
      <div className="events-grid">
        {upcomingEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Ready to hack for change?</h2>
        <p>Join our community of innovators and problem-solvers building the future.</p>
        <button className="btn btn-primary btn-large">Register for Next Hackathon</button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">haxx</h3>
          <p>Building a community of hackers creating positive change through technology.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Getting Started</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Code of Conduct</a></li>
            <li><a href="#">Sponsor a Hackathon</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">GitHub</a>
            <a href="#" className="social-link">Discord</a>
            <a href="#" className="social-link">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} haxx. All rights reserved.</p>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <EventsSection />
      <ProjectsSection />
      <CallToAction />
    </div>
  );
}

function EventsPage() {
  return (
    <div className="events-page">
      <section className="page-header">
        <h1>Events</h1>
        <p>Join our community events, hackathons, workshops, and meetups</p>
      </section>
      <div className="events-filter">
        <div className="filter-group">
          <label>Event Type</label>
          <select className="filter-select">
            <option value="all">All Types</option>
            <option value="hackathon">Hackathon</option>
            <option value="workshop">Workshop</option>
            <option value="summit">Summit</option>
            <option value="meetup">Meetup</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Location</label>
          <select className="filter-select">
            <option value="all">All Locations</option>
            <option value="auckland">Auckland</option>
            <option value="wellington">Wellington</option>
            <option value="christchurch">Christchurch</option>
            <option value="online">Online</option>
          </select>
        </div>
      </div>
      <div className="events-grid events-page-grid">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App
