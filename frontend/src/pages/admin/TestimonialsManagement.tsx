import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Star, CheckCircle, XCircle, Trash2 } from 'lucide-react';

interface Testimonial {
  _id: string;
  customerName: string;
  rating: number;
  reviewText: string;
  isApproved: boolean;
  createdAt: string;
}

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await api.get('/testimonials/admin');
      setTestimonials(response.data);
    } catch (error) {
      console.error('Failed to load testimonials', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleToggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      // Optimitic local update
      setTestimonials(testimonials.map(t => 
        t._id === id ? { ...t, isApproved: !currentStatus } : t
      ));
      
      await api.put(`/testimonials/${id}`, { isApproved: !currentStatus });
    } catch {
      alert('Failed to update testimonial status');
      fetchTestimonials(); // Revert on failure
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial completely?')) {
      try {
        await api.delete(`/testimonials/${id}`);
        fetchTestimonials();
      } catch {
        alert('Failed to delete testimonial');
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
      />
    ));
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reviews & Testimonials</h2>
        <p className="text-sm text-gray-500 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-medium border border-blue-100">
          Only approved reviews show on the website
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial._id} 
            className={`bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col transition-all ${
              testimonial.isApproved ? 'border-green-200 ring-1 ring-green-100' : 'border-gray-200 opacity-80'
            }`}
          >
            <div className={`px-5 py-3 border-b flex justify-between items-center ${
              testimonial.isApproved ? 'bg-green-50/50' : 'bg-gray-50'
            }`}>
              <div className="flex gap-1">
                {renderStars(testimonial.rating)}
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {new Date(testimonial.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-gray-900 mb-2 truncate" title={testimonial.customerName}>
                {testimonial.customerName}
              </h3>
              <p className="text-sm text-gray-600 mb-6 flex-1 italic line-clamp-4 leading-relaxed bg-gray-50/50 p-3 rounded-lg">
                "{testimonial.reviewText}"
              </p>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                <button 
                  onClick={() => handleToggleApproval(testimonial._id, testimonial.isApproved)}
                  className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-md transition-colors ${
                    testimonial.isApproved 
                      ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' 
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  {testimonial.isApproved ? (
                    <><XCircle size={16} /> Revoke</>
                  ) : (
                    <><CheckCircle size={16} /> Approve</>
                  )}
                </button>
                <button 
                  onClick={() => handleDelete(testimonial._id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete Testimonial"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-xl border border-gray-100 border-dashed">
            No testimonials have been submitted yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsManagement;
