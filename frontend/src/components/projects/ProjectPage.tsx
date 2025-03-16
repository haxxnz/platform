import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Project } from '../../types';
import { getProjectById, projects } from '../../data/mockData';
import { ProjectCard } from './ProjectCard';

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '0', 10);
  const project = getProjectById(projectId);
  
  // State for related projects
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  
  // Find related projects based on tags
  useEffect(() => {
    if (project) {
      const related = projects
        .filter(p => 
          p.id !== project.id && 
          p.tags.some(tag => project.tags.includes(tag))
        )
        .slice(0, 3); // Limit to 3 related projects
      
      setRelatedProjects(related);
    }
  }, [project]);
  
  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-8">The project you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/projects" 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          Back to Projects
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb navigation */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link to="/projects" className="hover:text-indigo-600 transition-colors">Projects</Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-900 font-medium truncate max-w-xs">
            {project.title}
          </li>
        </ol>
      </nav>
      
      {/* Project header */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 mb-8">
        <div className="h-64 sm:h-80 md:h-96 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
              <div className="text-sm text-gray-600 mb-4">By {project.team}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="border-t border-gray-200 my-6 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About this project</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">{project.description}</p>
            
            {/* Extended description - this would come from the API in a real app */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              This innovative project aims to solve real-world problems through technology. 
              Our team has worked tirelessly to create a solution that is both effective and user-friendly.
              The technology stack includes the latest frameworks and tools to ensure optimal performance and scalability.
            </p>
            
            {/* Contributors section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contributors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.contributors.map(contributor => (
                  <div key={contributor.id} className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
                    <img 
                      src={contributor.avatar} 
                      alt={contributor.name} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{contributor.name}</div>
                      <div className="text-sm text-gray-600">{contributor.role}</div>
                      {contributor.github && (
                        <a 
                          href={`https://github.com/${contributor.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors mt-1 inline-block"
                        >
                          @{contributor.github}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Project details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Key Features</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Feature one with detailed explanation</li>
                  <li>Another important feature of the project</li>
                  <li>Third key capability that makes this project unique</li>
                  <li>Additional functionality that users will appreciate</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Technical Details</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Frontend: React, TypeScript, Tailwind CSS</li>
                  <li>Backend: Node.js, Express, MongoDB</li>
                  <li>Deployment: Docker, Kubernetes, AWS</li>
                  <li>Testing: Jest, Cypress</li>
                </ul>
              </div>
            </div>
            
            {/* Call to action buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a 
                href="#" 
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                View Demo
              </a>
              <a 
                href="#" 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                GitHub Repository
              </a>
              <a 
                href="#" 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                Contact Team
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((relatedProject) => (
              <ProjectCard key={relatedProject.id} project={relatedProject} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
