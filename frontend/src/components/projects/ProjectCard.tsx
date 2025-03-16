import { Link } from 'react-router-dom';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 transition-all hover:shadow-md">
      <div className="project-image h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="project-content p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{project.description}</p>
        <div className="project-team text-sm text-gray-500 mb-2">By {project.team}</div>
        <div className="project-contributors text-sm text-gray-500 mb-3">
          <span>{project.contributors.length} contributors</span>
        </div>
        <div className="project-tags flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag: string, index: number) => (
            <span 
              key={index} 
              className="tag px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link 
          to={`/projects/${project.id}`} 
          className="btn btn-secondary inline-block px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          View Project
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
