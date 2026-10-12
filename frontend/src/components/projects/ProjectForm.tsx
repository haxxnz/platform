import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Project, Contributor } from '../../types';
import { projects, getProjectById } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';

interface ProjectFormData {
  title: string;
  description: string;
  team: string;
  tags: string[];
  image: string;
  contributors: Contributor[];
}

export function ProjectForm() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    team: '',
    tags: [],
    image: '',
    contributors: []
  });
  
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load project data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const projectId = parseInt(id);
      const project = getProjectById(projectId);
      
      if (project) {
        setFormData({
          title: project.title,
          description: project.description,
          team: project.team,
          tags: [...project.tags],
          image: project.image,
          contributors: [...project.contributors]
        });
      } else {
        // Project not found, redirect to projects page
        navigate('/projects');
      }
    } else if (user) {
      // Initialize with current user as first contributor in create mode
      setFormData(prev => ({
        ...prev,
        contributors: [
          {
            id: Date.now(), // Temporary ID
            name: user.name || 'Anonymous',
            role: 'Project Lead',
            avatar: user.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg',
            github: ''
          }
        ]
      }));
    }
  }, [id, isEditMode, navigate, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput.trim());
    }
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
    setTagInput('');
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddContributor = () => {
    const newContributor: Contributor = {
      id: Date.now(), // Temporary ID
      name: '',
      role: '',
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      github: ''
    };
    
    setFormData(prev => ({
      ...prev,
      contributors: [...prev.contributors, newContributor]
    }));
  };

  const handleContributorChange = (index: number, field: keyof Contributor, value: string) => {
    setFormData(prev => {
      const updatedContributors = [...prev.contributors];
      updatedContributors[index] = {
        ...updatedContributors[index],
        [field]: value
      };
      return {
        ...prev,
        contributors: updatedContributors
      };
    });
  };

  const removeContributor = (index: number) => {
    setFormData(prev => {
      const updatedContributors = [...prev.contributors];
      updatedContributors.splice(index, 1);
      return {
        ...prev,
        contributors: updatedContributors
      };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.team.trim()) {
      newErrors.team = 'Team name is required';
    }
    
    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }
    
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    }
    
    if (formData.contributors.length === 0) {
      newErrors.contributors = 'At least one contributor is required';
    } else {
      // Check if all contributors have name and role
      const invalidContributors = formData.contributors.some(
        contributor => !contributor.name.trim() || !contributor.role.trim()
      );
      
      if (invalidContributors) {
        newErrors.contributors = 'All contributors must have a name and role';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate saving to our mock data
      if (isEditMode && id) {
        // Update existing project
        const projectId = parseInt(id);
        const projectIndex = projects.findIndex(p => p.id === projectId);
        
        if (projectIndex !== -1) {
          projects[projectIndex] = {
            ...projects[projectIndex],
            ...formData
          };
        }
      } else {
        // Create new project
        const newProject: Project = {
          id: Math.max(0, ...projects.map(p => p.id)) + 1,
          ...formData
        };
        
        projects.unshift(newProject); // Add to beginning of array
      }
      
      // Redirect to projects page after successful submission
      navigate('/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      setErrors(prev => ({
        ...prev,
        form: 'Failed to save project. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {isEditMode ? 'Edit Project' : 'Create New Project'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Project Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.title ? 'border-red-500' : ''
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.description ? 'border-red-500' : ''
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
        
        {/* Team */}
        <div>
          <label htmlFor="team" className="block text-sm font-medium text-gray-700">
            Team Name *
          </label>
          <input
            type="text"
            id="team"
            name="team"
            value={formData.team}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.team ? 'border-red-500' : ''
            }`}
          />
          {errors.team && (
            <p className="mt-1 text-sm text-red-600">{errors.team}</p>
          )}
        </div>
        
        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags * (Press Enter to add)
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                errors.tags ? 'border-red-500' : ''
              }`}
              placeholder="Add a tag and press Enter"
            />
            <button
              type="button"
              onClick={() => addTag(tagInput.trim())}
              className="ml-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </div>
          {errors.tags && (
            <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
          )}
          
          {formData.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1.5 inline-flex text-indigo-400 hover:text-indigo-600 focus:outline-none"
                  >
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image URL *
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.image ? 'border-red-500' : ''
            }`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
          )}
          
          {formData.image && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Preview:</p>
              <img
                src={formData.image}
                alt="Project preview"
                className="h-40 w-full object-cover rounded-md"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Invalid+Image+URL';
                }}
              />
            </div>
          )}
        </div>
        
        {/* Contributors */}
        <div>
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Contributors *
            </label>
            <button
              type="button"
              onClick={handleAddContributor}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Contributor
            </button>
          </div>
          
          {errors.contributors && (
            <p className="mt-1 text-sm text-red-600">{errors.contributors}</p>
          )}
          
          <div className="mt-2 space-y-4">
            {formData.contributors.map((contributor, index) => (
              <div key={contributor.id} className="p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium text-gray-900">Contributor #{index + 1}</h4>
                  {formData.contributors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContributor(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
                
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={contributor.name}
                      onChange={(e) => handleContributorChange(index, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Role *
                    </label>
                    <input
                      type="text"
                      value={contributor.role}
                      onChange={(e) => handleContributorChange(index, 'role', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Avatar URL
                    </label>
                    <input
                      type="text"
                      value={contributor.avatar}
                      onChange={(e) => handleContributorChange(index, 'avatar', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      GitHub Username
                    </label>
                    <input
                      type="text"
                      value={contributor.github || ''}
                      onChange={(e) => handleContributorChange(index, 'github', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Form-level error */}
        {errors.form && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{errors.form}</h3>
              </div>
            </div>
          </div>
        )}
        
        {/* Submit buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
}
