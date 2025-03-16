import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './components/home/HomePage';
import { ProjectsPage } from './components/projects/ProjectsPage';
import { ProjectPage } from './components/projects/ProjectPage';
import { EventsPage } from './components/events/EventsPage';
import { EventPage } from './components/events/EventPage';
import { AuthPage } from './components/auth/AuthPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:id" element={<EventPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectPage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

// Navigation component
function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Hack for Change</Link>
        <div className="space-x-4">
          <Link to="/projects" className="hover:text-indigo-200">Projects</Link>
          <Link to="/events" className="hover:text-indigo-200">Events</Link>
          <Link to="/auth" className="hover:text-indigo-200">Login</Link>
        </div>
      </div>
    </nav>
  );
}

// Footer component
function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Hack for Change</h3>
            <p className="text-gray-400">Connecting developers with social impact projects.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700 text-gray-400 text-sm">
          <p> 2023 Hack for Change. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default App;
