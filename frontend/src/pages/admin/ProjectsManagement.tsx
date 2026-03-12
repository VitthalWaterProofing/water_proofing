import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Plus, Edit2, Trash2, Image as ImageIcon, MapPin } from 'lucide-react';

interface ServiceType {
  _id: string;
  title: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  location: string;
  images: string[];
  serviceType: ServiceType | null;
  completionDate: string;
  isFeatured: boolean;
}

const ProjectsManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    serviceType: '',
    completionDate: new Date().toISOString().split('T')[0],
    isFeatured: false,
    images: [] as string[]
  });
  
  // To keep it simple, we'll only allow uploading one main image in the admin panel for now, 
  // although the model supports an array.
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, servicesRes] = await Promise.all([
        api.get('/projects'),
        api.get('/services')
      ]);
      setProjects(projectsRes.data);
      setServices(servicesRes.data);
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      location: '',
      serviceType: services.length > 0 ? services[0]._id : '',
      completionDate: new Date().toISOString().split('T')[0],
      isFeatured: false,
      images: []
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      location: project.location,
      serviceType: project.serviceType ? project.serviceType._id : '',
      completionDate: project.completionDate ? new Date(project.completionDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      isFeatured: project.isFeatured || false,
      images: project.images || []
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchData();
      } catch {
        alert('Failed to delete project');
      }
    }
  };

  const handleImageUpload = async (): Promise<string | null> => {
    if (!imageFile) return formData.images[0] || null;
    
    const uploadData = new FormData();
    uploadData.append('image', imageFile);
    
    try {
      setUploadingImage(true);
      const response = await api.post('/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data.imageUrl;
    } catch (error) {
      console.error('Image upload failed', error);
      alert('Failed to upload image. Please try again.');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrls = [...formData.images];
    
    // If a new file is selected, upload it and set it as the primary image
    if (imageFile) {
      const uploadedUrl = await handleImageUpload();
      if (!uploadedUrl) return; 
      imageUrls = [uploadedUrl]; // Replace existing image for simplicity in this MVP
    }

    const payload = { 
      ...formData, 
      images: imageUrls,
      // Ensure completion date is a proper date object
      completionDate: new Date(formData.completionDate).toISOString() 
    };

    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, payload);
      } else {
        await api.post('/projects', payload);
      }
      setIsModalOpen(false);
      fetchData();
    } catch {
      alert('Failed to save project.');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Projects Portfolio</h2>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="h-48 bg-gray-100 relative group">
              {project.images && project.images.length > 0 ? (
                <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <ImageIcon size={32} className="mb-2" />
                  <span className="text-sm">No images</span>
                </div>
              )}
              {project.isFeatured && (
                <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md text-xs font-bold uppercase shadow-sm">
                  Featured
                </div>
              )}
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{project.title}</h3>
              <div className="flex items-center text-xs text-gray-500 mb-3 gap-1">
                <MapPin size={12} />
                {project.location}
              </div>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                {project.description}
              </p>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                <button 
                  onClick={() => openEditModal(project)}
                  className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(project._id)}
                  className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-100 border-dashed">
            No projects have been added yet. Show off your work by clicking 'Add New Project'.
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                &times;
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="projectForm" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                    <input 
                      type="text" required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location / City</label>
                    <input 
                      type="text" required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
                    <input 
                      type="date" required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={formData.completionDate}
                      onChange={e => setFormData({...formData, completionDate: e.target.value})}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Related Service Type</label>
                    <select 
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={formData.serviceType}
                      onChange={e => setFormData({...formData, serviceType: e.target.value})}
                    >
                      <option value="" disabled>Select a service</option>
                      {services.map(s => (
                        <option key={s._id} value={s._id}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                  <textarea 
                    required rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Main Image</label>
                  {formData.images.length > 0 && !imageFile && (
                    <div className="mb-2 w-32 h-32 relative rounded border overflow-hidden">
                      <img src={formData.images[0]} className="w-full h-full object-cover" alt="Preview" />
                    </div>
                  )}
                  <input 
                    type="file" accept="image/*"
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <div className="flex items-center gap-2 mt-4 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <input 
                    type="checkbox" id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={e => setFormData({...formData, isFeatured: e.target.checked})}
                    className="w-4 h-4 text-yellow-600 rounded focus:ring-yellow-500"
                  />
                  <label htmlFor="isFeatured" className="text-sm font-medium text-yellow-900">Feature this project prominently on the portfolio</label>
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end gap-3">
              <button 
                type="button" onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit" form="projectForm" disabled={uploadingImage}
                className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 flex items-center"
              >
                {uploadingImage ? 'Uploading Image...' : (editingProject ? 'Save Changes' : 'Publish Project')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManagement;
