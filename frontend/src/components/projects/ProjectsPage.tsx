import { useState, useEffect } from 'react';
import { Project } from '../../types';
import { projects } from '../../data/mockData';
import { ProjectCard } from './ProjectCard';

export function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  
  // Get all unique tags from projects
  const allTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).sort();
  
  // Filter projects based on search term and selected tags
  useEffect(() => {
    const filtered = projects.filter(project => {
      // Filter by search term
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.team.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by selected tags
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => project.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
    
    setFilteredProjects(filtered);
  }, [searchTerm, selectedTags]);
  
  // Toggle tag selection
  function handleTagToggle(tag: string) {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Projects</h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-500">
          Discover innovative projects created by our community of developers and designers.
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
              placeholder="Search projects by title, description, or team"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-3">Filter by tags</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedTags.includes(tag)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              } transition-colors`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
